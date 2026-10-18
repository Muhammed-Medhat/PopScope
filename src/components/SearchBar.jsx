import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Autocomplete,
  TextField,
  Box,
  Typography,
  CircularProgress,
  InputAdornment,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export default function SearchBar() {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);
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

    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
        { signal },
      )
      .then((res) => {
        setOptions(res.data.results || []);
        setLoading(false);
      })
      .catch((err) => {
        // نتحقق أولاً أن الخطأ ليس بسبب cancellation
        if (!axios.isCancel(err)) {
          console.error("Error fetching search suggestions:", err);
          setError(true);
          setLoading(false);
        }
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
  }, [inputValue, fetchSearchResults]);

  const handleRetry = (e) => {
    e.stopPropagation();
    fetchSearchResults(inputValue);
  };

  return (
    <Autocomplete
      id="movie-search-autocomplete"
      sx={{ width: { xs: "100%", sm: 350, md: 450 } }}
      filterOptions={(x) => x}
      getOptionKey={(option) => option.id}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.title || ""}
      options={options}
      loading={loading}
      // 3. التحكم في النص المعروض داخل المنسدلة عند وجود خطأ
      noOptionsText={
        error ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 1.5,
              gap: 1,
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
              <Typography variant="body2">
                Failed to fetch search results
              </Typography>
            </Box>
            <Button
              size="small"
              variant="outlined"
              color="error"
              startIcon={<RefreshIcon />}
              onClick={handleRetry}
              sx={{ textTransform: "none", mt: 0.5 }}
            >
              Retry
            </Button>
          </Box>
        ) : (
          "No movies found"
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
            backgroundColor: "#1f1f1f",
            color: "#fff",
            borderRadius: 2,
            mt: 1,
            boxShadow: "0 8px 16px rgba(0,0,0,0.6)",
            "& .MuiAutocomplete-listbox": {
              backgroundColor: "#1f1f1f",
            },
            "& .MuiAutocomplete-noOptions": {
              color: "#fff",
            },
            "& .MuiAutocomplete-loading": {
              color: "#fff",
            },
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
              gap: 2,
              p: 1.5,
              borderBottom: "1px solid rgba(255,255,255,0.05)",
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.1) !important",
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
                width: 40,
                height: 60,
                objectFit: "cover",
                borderRadius: 1,
              }}
            />
            <Box sx={{ overflow: "hidden" }}>
              <Typography variant="body1" fontWeight="bold" noWrap>
                {option.title}
              </Typography>
              <Typography variant="caption" sx={{ color: "#aaa" }}>
                {option.release_date
                  ? option.release_date.split("-")[0]
                  : "N/A"}{" "}
                | ⭐ {option.vote_average?.toFixed(1) || "0"}
              </Typography>
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
            backgroundColor: "#2a2a2a",
            borderRadius: 2,
            "& .MuiOutlinedInput-root": {
              color: "#fff",
              "& fieldset": { borderColor: "transparent" },
              "&:hover fieldset": { borderColor: "#e50914" },
              "&.Mui-focused fieldset": { borderColor: "#e50914" },
            },
          }}
          slotProps={{
            ...params.slotProps,
            input: {
              ...params.slotProps?.input,
              startAdornment: (
                <>
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#aaa" }} />
                  </InputAdornment>
                  {params.slotProps?.input?.startAdornment}
                </>
              ),
              endAdornment: (
                <>
                  {loading ? (
                    <CircularProgress color="error" size={20} />
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
