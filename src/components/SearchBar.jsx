import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  CircularProgress,
  InputAdornment,
  Button,
  Stack,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import StarIcon from "@mui/icons-material/Star";
import { tmdbService } from "../services/modules/tmdb.service";

export default function SearchBar() {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const navigate = useNavigate();

  const fetchSearchResults = useCallback((query, signal) => {
    if (!query || query.trim() === "") {
      setOptions([]);
      setLoading(false);
      setError(false);
      return;
    }

    setLoading(true);
    setError(false);

    tmdbService
      .getMovieBySearch(encodeURIComponent(query), signal)
      .then((res) => {
        setOptions(res.data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        if (signal?.aborted) return;
        console.error("Error fetching search suggestions:", err);
        setOptions([]);
        setError(true);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (inputValue.trim() === "") {
      setOptions([]);
      setLoading(false);
      setError(false);
      return;
    }

    const controller = new AbortController();

    const timer = setTimeout(() => {
      fetchSearchResults(inputValue, controller.signal);
    }, 300);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [inputValue, fetchSearchResults, retryCount]);

  const handleRetry = (e) => {
    e.stopPropagation();
    setError(false);
    setRetryCount((c) => c + 1);
  };

  return (
    <Autocomplete
      id="movie-search-autocomplete"
      sx={{ width: { xs: "100%", sm: 380, md: 480 } }}
      filterOptions={(x) => x}
      getOptionKey={(option) => option.id}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.title || ""}
      options={options}
      loading={loading}
      noOptionsText={
        error ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 2,
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "#ff5252",
              }}
            >
              <ErrorOutlinedIcon fontSize="small" />
              <Typography variant="body2" fontWeight={600}>
                Failed to fetch search results
              </Typography>
            </Box>
            <Button
              size="small"
              variant="outlined"
              color="error"
              startIcon={<RefreshIcon />}
              onClick={handleRetry}
              sx={{
                textTransform: "none",
                borderRadius: "999px",
                px: 2.5,
                fontWeight: 700,
              }}
            >
              Retry
            </Button>
          </Box>
        ) : (
          <Typography
            variant="body2"
            sx={{ color: "#777", textAlign: "center", py: 1.5 }}
          >
            No movies found
          </Typography>
        )
      }
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      onChange={(event, selectedMovie) => {
        if (selectedMovie) {
          navigate(`/movie/${selectedMovie.id}`);
        }
      }}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: "#161616",
            color: "#fff",
            borderRadius: 2.5,
            mt: 1,
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.75)",
            backdropFilter: "blur(12px)",
            "& .MuiAutocomplete-listbox": {
              backgroundColor: "transparent",
              p: 0.75,
              "&::-webkit-scrollbar": { width: 6 },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(229,9,20,0.5)",
                borderRadius: 3,
              },
            },
            "& .MuiAutocomplete-noOptions": { color: "#fff" },
            "& .MuiAutocomplete-loading": { color: "#fff" },
          },
        },
      }}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;

        return (
          <Box
            component="li"
            key={option.id}
            {...optionProps}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.75,
              p: 1.25,
              mb: 0.5,
              borderRadius: 2,
              cursor: "pointer",
              transition: "background-color 0.2s ease, transform 0.2s ease",
              border: "1px solid transparent",
              "&:hover": {
                backgroundColor: "rgba(229,9,20,0.1) !important",
                borderColor: "rgba(229,9,20,0.3)",
              },
            }}
          >
            <Box
              component="img"
              src={
                option.poster_path
                  ? `https://image.tmdb.org/t/p/w92${option.poster_path}`
                  : "https://placehold.co/40x60?text=No+Img"
              }
              alt={option.title}
              sx={{
                width: 44,
                height: 64,
                objectFit: "cover",
                borderRadius: 1.25,
                flexShrink: 0,
                boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
              }}
            />
            <Box sx={{ overflow: "hidden", flex: 1, minWidth: 0 }}>
              <Typography
                variant="body2"
                fontWeight={700}
                noWrap
                sx={{ color: "#fff", mb: 0.4 }}
              >
                {option.title}
              </Typography>
              <Stack
                direction="row"
                spacing={1}
                sx={{ alignItems: "center", flexWrap: "wrap" }}
              >
                <Typography variant="caption" sx={{ color: "#9a9a9a" }}>
                  {option.release_date
                    ? option.release_date.split("-")[0]
                    : "N/A"}
                </Typography>
                <Box
                  sx={{
                    width: 3,
                    height: 3,
                    borderRadius: "50%",
                    backgroundColor: "#555",
                  }}
                />
                <Chip
                  icon={<StarIcon sx={{ fontSize: "12px !important" }} />}
                  label={option.vote_average?.toFixed(1) || "0"}
                  size="small"
                  sx={{
                    height: 20,
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#f5c518",
                    backgroundColor: "rgba(245,197,24,0.1)",
                    border: "1px solid rgba(245,197,24,0.25)",
                    "& .MuiChip-icon": { color: "#f5c518", ml: 0.5 },
                    "& .MuiChip-label": { px: 1 },
                  }}
                />
              </Stack>
            </Box>
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search movies..."
          size="small"
          variant="outlined"
          sx={{
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: "999px",
            transition: "all 0.25s ease",
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              borderRadius: "999px",
              paddingRight: "12px !important",
              "& fieldset": {
                borderColor: "rgba(255,255,255,0.1)",
                transition: "border-color 0.25s ease",
              },
              "&:hover fieldset": {
                borderColor: "rgba(255,255,255,0.25)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#e50914",
                borderWidth: 2,
              },
              "&.Mui-focused": {
                backgroundColor: "rgba(255,255,255,0.08)",
              },
            },
          }}
          slotProps={{
            ...params.slotProps,
            input: {
              ...params.slotProps?.input,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <SearchIcon
                      sx={{ color: "#9a9a9a", fontSize: 20, ml: 0.5 }}
                    />
                  </InputAdornment>
                  {params.slotProps?.input?.startAdornment}
                </>
              ),
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="error" size={18} thickness={5} />
                  ) : null}
                  {params.slotProps?.input?.endAdornment}
                </>
              ),
            },
          }}
        />
      )}
    />
  );
}
