import { Box, Button, CardMedia, Stack } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  ACCENT,
  ACCENT_HOVER,
  IMG_BASE,
  NO_POSTER,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
} from "./constants";

export default function MoviePosterSection({
  movie,
  trailerKey,
  exist,
  onAdd,
}) {
  const posterSrc = movie.poster_path
    ? `${IMG_BASE}/w500${movie.poster_path}`
    : NO_POSTER;

  const scrollToTrailer = () => {
    document
      .getElementById("trailer-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Box sx={{ position: "sticky", top: 24 }}>
      {/* Poster */}
      <Box
        sx={{
          position: "relative",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: `
            0 40px 80px rgba(0,0,0,0.7),
            0 0 0 1px rgba(229,9,20,0.2),
            0 0 60px rgba(229,9,20,0.1)
          `,
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(229,9,20,0.06) 0%, transparent 40%, transparent 60%, rgba(229,9,20,0.06) 100%)",
            pointerEvents: "none",
          },
        }}
      >
        <CardMedia
          component="img"
          image={posterSrc}
          alt={movie.title}
          sx={{ display: "block", width: "100%" }}
        />
        {/* Rating badge */}
        <Box
          sx={{
            position: "absolute",
            top: 16,
            left: 16,
            px: 1.6,
            py: 0.7,
            borderRadius: "14px",
            backgroundColor: "rgba(13,13,13,0.85)",
            backdropFilter: "blur(12px)",
            border: `1px solid ${ACCENT}50`,
            display: "flex",
            alignItems: "center",
            gap: 0.6,
            fontWeight: 900,
            fontSize: 15,
            color: "#f5c518",
          }}
        >
          <StarIcon sx={{ fontSize: 17 }} />
          {movie.vote_average?.toFixed(1) || "N/A"}
        </Box>
      </Box>

      {/* Actions */}
      <Stack spacing={1.5} sx={{ mt: 2.5 }}>
        {trailerKey && (
          <Button
            variant="contained"
            fullWidth
            startIcon={<PlayArrowIcon />}
            onClick={scrollToTrailer}
            sx={{
              borderRadius: "14px",
              py: 1.4,
              textTransform: "none",
              fontWeight: 800,
              fontSize: "0.95rem",
              backgroundColor: ACCENT,
              color: "#fff",
              boxShadow: `0 12px 30px ${ACCENT}50`,
              transition: "all 0.25s ease",
              "&:hover": {
                backgroundColor: ACCENT_HOVER,
                transform: "translateY(-2px)",
                boxShadow: `0 16px 40px ${ACCENT}70`,
              },
            }}
          >
            Watch Trailer
          </Button>
        )}

        <Button
          variant="outlined"
          fullWidth
          disabled={exist}
          startIcon={exist ? <CheckCircleIcon /> : <BookmarkAddIcon />}
          onClick={onAdd}
          sx={{
            borderRadius: "14px",
            py: 1.4,
            textTransform: "none",
            fontWeight: 700,
            fontSize: "0.95rem",
            color: exist ? TEXT_SECONDARY : TEXT_PRIMARY,
            borderColor: exist
              ? "rgba(255,255,255,0.1)"
              : "rgba(255,255,255,0.25)",
            backgroundColor: "rgba(255,255,255,0.02)",
            backdropFilter: "blur(8px)",
            transition: "all 0.25s ease",
            "&:hover": {
              borderColor: exist ? "rgba(255,255,255,0.1)" : ACCENT,
              backgroundColor: exist
                ? "rgba(255,255,255,0.02)"
                : "rgba(229,9,20,0.08)",
            },
            "&.Mui-disabled": {
              color: TEXT_SECONDARY,
              borderColor: "rgba(255,255,255,0.08)",
              backgroundColor: "rgba(255,255,255,0.02)",
              opacity: 1,
            },
          }}
        >
          {exist ? "In Watchlist" : "Add to Watchlist"}
        </Button>
      </Stack>
    </Box>
  );
}
