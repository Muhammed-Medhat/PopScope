import {
  useParams as useReactParams,
  Link,
  useNavigate,
} from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useWatchList } from "../contexts/WatchListContext";

import {
  ACCENT,
  ACCENT_HOVER,
  BG_PRIMARY,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
} from "../components/movie-details/constants";
import MoviePosterSection from "../components/movie-details/MoviePosterSection";
import MovieInfoPanel from "../components/movie-details/MovieInfoPanel";
import CastSection from "../components/movie-details/CastSection";
import TrailerSection from "../components/movie-details/TrailerSection";
import { useMovieDetails } from "../components/movie-details/hooks/useMovieDetails";

export default function MovieDetails() {
  const { id } = useReactParams();
  const { watches, dispatch } = useWatchList();
  const navigate = useNavigate();

  const { data, isLoading, isError, refetch } = useMovieDetails(id);

  const movie = data?.movie ?? null;
  const cast = data?.cast ?? [];
  const trailerKey = data?.trailerKey ?? null;

  const handleAdd = () => {
    dispatch({ type: "added", payload: movie });
  };

  // ================= LOADING =================
  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: BG_PRIMARY,
          gap: 3,
        }}
      >
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            size={80}
            thickness={1.5}
            sx={{ color: "rgba(229,9,20,0.15)" }}
          />
          <CircularProgress
            size={80}
            thickness={2}
            sx={{
              color: ACCENT,
              position: "absolute",
              left: 0,
              "& circle": { strokeLinecap: "round" },
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              color: ACCENT,
              fontWeight: 900,
              fontSize: 12,
              letterSpacing: 2,
            }}
          >
            LOAD
          </Box>
        </Box>
        <Typography
          variant="caption"
          sx={{
            color: TEXT_SECONDARY,
            letterSpacing: 4,
            fontWeight: 700,
            fontSize: 11,
          }}
        >
          LOADING MOVIE
        </Typography>
      </Box>
    );
  }

  // ================= ERROR =================
  if (isError) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: BG_PRIMARY,
          backgroundImage:
            "radial-gradient(circle at 50% 30%, rgba(229,9,20,0.1) 0%, transparent 60%)",
          color: TEXT_PRIMARY,
          textAlign: "center",
          px: 2,
        }}
      >
        <Box
          sx={{
            p: 3,
            borderRadius: "24px",
            backgroundColor: "rgba(229,9,20,0.1)",
            border: "1px solid rgba(229,9,20,0.3)",
            mb: 3,
            display: "flex",
          }}
        >
          <ErrorOutlinedIcon sx={{ fontSize: 64, color: ACCENT }} />
        </Box>
        <Typography variant="h4" fontWeight="800" gutterBottom>
          Oops! Something went wrong
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: TEXT_SECONDARY,
            mb: 4,
            maxWidth: 480,
            lineHeight: 1.7,
          }}
        >
          Failed to load movie details. Please check your internet connection
          and try again.
        </Typography>
        <Stack direction="row" spacing={2} sx={{ flexWrap: "wrap" }}>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={() => refetch()}
            sx={{
              borderRadius: "14px",
              px: 3.5,
              py: 1.2,
              textTransform: "none",
              fontWeight: 700,
              backgroundColor: ACCENT,
              color: "#fff",
              boxShadow: "0 8px 24px rgba(229,9,20,0.35)",
              "&:hover": {
                backgroundColor: ACCENT_HOVER,
                boxShadow: "0 12px 32px rgba(229,9,20,0.5)",
              },
            }}
          >
            Try Again
          </Button>
          <Button
            variant="outlined"
            component={Link}
            to="/"
            startIcon={<ArrowBackIcon />}
            sx={{
              borderRadius: "14px",
              px: 3,
              py: 1.2,
              textTransform: "none",
              fontWeight: 600,
              color: TEXT_PRIMARY,
              borderColor: "rgba(255,255,255,0.2)",
              "&:hover": {
                borderColor: TEXT_PRIMARY,
                backgroundColor: "rgba(255,255,255,0.04)",
              },
            }}
          >
            Back Home
          </Button>
        </Stack>
      </Box>
    );
  }

  // ================= NOT FOUND =================
  if (!movie) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: BG_PRIMARY,
          color: TEXT_PRIMARY,
          gap: 2,
        }}
      >
        <Typography variant="h4" fontWeight={800}>
          Movie not found
        </Typography>
        <Button
          component={Link}
          to="/"
          startIcon={<ArrowBackIcon />}
          sx={{ textTransform: "none", color: ACCENT, fontWeight: 700 }}
        >
          Back to Home
        </Button>
      </Box>
    );
  }

  const exist = watches.some((watche) => watche.id === movie.id);

  return (
    <Box
      sx={{
        pb: 10,
        backgroundColor: BG_PRIMARY,
        minHeight: "100vh",
        color: TEXT_PRIMARY,
        position: "relative",
        backgroundImage: `
          radial-gradient(circle at 15% 15%, rgba(229,9,20,0.08) 0%, transparent 40%),
          radial-gradient(circle at 85% 85%, rgba(229,9,20,0.05) 0%, transparent 45%)
        `,
        backgroundAttachment: "fixed",
      }}
    >
      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 } }}>
        {/* Back link */}
        <Button
          onClick={() => navigate(-1)}
          startIcon={<ArrowBackIcon />}
          size="small"
          sx={{
            color: TEXT_SECONDARY,
            textTransform: "none",
            fontWeight: 600,
            mb: 3,
            fontSize: 13,
            "&:hover": { color: ACCENT, backgroundColor: "transparent" },
          }}
        >
          Back
        </Button>

        {/* ============ MAIN SPLIT ============ */}
        <Grid container spacing={{ xs: 3, md: 5 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <MoviePosterSection
              movie={movie}
              trailerKey={trailerKey}
              exist={exist}
              onAdd={handleAdd}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 7 }}>
            <MovieInfoPanel movie={movie} />
          </Grid>
        </Grid>

        <CastSection cast={cast} />

        {trailerKey && <TrailerSection trailerKey={trailerKey} />}
      </Container>
    </Box>
  );
}
