import { Box, Chip, Stack, Typography } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import TranslateIcon from "@mui/icons-material/Translate";
import { ACCENT, TEXT_PRIMARY, TEXT_SECONDARY } from "./constants";

function MetaItem({ icon, label, value }) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      {icon}
      <Box>
        <Typography
          variant="caption"
          sx={{
            color: TEXT_SECONDARY,
            display: "block",
            fontSize: 10,
            letterSpacing: 1,
            fontWeight: 700,
          }}
        >
          {label}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: TEXT_PRIMARY, fontWeight: 700 }}
        >
          {value}
        </Typography>
      </Box>
    </Stack>
  );
}

export default function MovieInfoPanel({ movie }) {
  return (
    <>
      {/* Genre tags */}
      {movie.genres?.length > 0 && (
        <Stack
          direction="row"
          spacing={1}
          sx={{ mb: 2, flexWrap: "wrap", gap: 0.75 }}
        >
          {movie.genres.map((genre) => (
            <Chip
              key={genre.id}
              label={genre.name}
              size="small"
              sx={{
                backgroundColor: "rgba(229,9,20,0.12)",
                color: "#ff5252",
                border: "1px solid rgba(229,9,20,0.35)",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: 0.5,
                borderRadius: "8px",
                height: 26,
              }}
            />
          ))}
        </Stack>
      )}

      {/* Title */}
      <Typography
        variant="h2"
        fontWeight="900"
        sx={{
          fontSize: { xs: "2rem", md: "3.2rem" },
          lineHeight: 1.02,
          letterSpacing: "-0.03em",
          color: TEXT_PRIMARY,
          mb: 1,
        }}
      >
        {movie.title}
      </Typography>

      {/* Tagline */}
      {movie.tagline && (
        <Typography
          variant="body1"
          sx={{
            color: ACCENT,
            fontStyle: "italic",
            fontWeight: 500,
            fontSize: { xs: "0.9rem", md: "1rem" },
            mb: 3,
            opacity: 0.95,
          }}
        >
          "{movie.tagline}"
        </Typography>
      )}

      {/* Meta Bar */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          p: 2,
          mb: 3.5,
          borderRadius: "16px",
          backgroundColor: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        {movie.release_date && (
          <MetaItem
            icon={
              <CalendarMonthIcon
                sx={{ fontSize: 18, color: ACCENT, opacity: 0.9 }}
              />
            }
            label="RELEASE"
            value={movie.release_date}
          />
        )}

        {movie.runtime > 0 && (
          <MetaItem
            icon={
              <ScheduleIcon
                sx={{ fontSize: 18, color: ACCENT, opacity: 0.9 }}
              />
            }
            label="RUNTIME"
            value={`${movie.runtime} min`}
          />
        )}

        <MetaItem
          icon={
            <LocalMoviesIcon
              sx={{ fontSize: 18, color: ACCENT, opacity: 0.9 }}
            />
          }
          label="RATING"
          value={`${movie.vote_average?.toFixed(1)} / 10`}
        />

        {movie.original_language && (
          <MetaItem
            icon={
              <TranslateIcon
                sx={{ fontSize: 18, color: ACCENT, opacity: 0.9 }}
              />
            }
            label="LANGUAGE"
            value={movie.original_language.toUpperCase()}
          />
        )}
      </Box>

      {/* Overview */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="subtitle2"
          sx={{
            color: ACCENT,
            fontWeight: 800,
            letterSpacing: 2,
            fontSize: 11,
            mb: 1.5,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box
            sx={{
              width: 20,
              height: 2,
              backgroundColor: ACCENT,
              borderRadius: 1,
              boxShadow: `0 0 8px ${ACCENT}`,
            }}
          />
          OVERVIEW
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#c9c9c9",
            lineHeight: 1.85,
            fontSize: "1rem",
          }}
        >
          {movie.overview || "No overview available for this movie."}
        </Typography>
      </Box>
    </>
  );
}
