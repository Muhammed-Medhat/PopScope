import { Link } from "react-router-dom";
import { Box, Card, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { IMG_BASE, NO_POSTER_IMG } from "./constants";

export default function MovieCard({ movie }) {
  return (
    <Card
      component={Link}
      to={`/movie/${movie.id}`}
      sx={{
        position: "relative",
        display: "block",
        textDecoration: "none",
        borderRadius: "14px",
        overflow: "hidden",
        aspectRatio: "2 / 3",
        backgroundColor: "#1a1a1a",
        boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
        transition:
          "transform 0.4s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.4s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow:
            "0 24px 48px rgba(0,0,0,0.7), 0 0 0 2px rgba(229,9,20,0.6)",
          "& .movie-overlay": { opacity: 1 },
          "& .movie-poster": { transform: "scale(1.06)" },
        },
      }}
    >
      <Box
        className="movie-poster"
        component="img"
        src={
          movie.poster_path
            ? `${IMG_BASE}/w342${movie.poster_path}`
            : NO_POSTER_IMG
        }
        alt={movie.title}
        width={342}
        height={513}
        loading="lazy"
        decoding="async"
        sx={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transition: "transform 0.6s cubic-bezier(0.2,0.8,0.2,1)",
        }}
      />

      {/* Rating badge */}
      <Box
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          px: 1,
          py: 0.35,
          borderRadius: "8px",
          backgroundColor: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.1)",
          fontSize: 12,
          fontWeight: 800,
          color: "#f5c518",
          display: "flex",
          alignItems: "center",
          gap: 0.4,
          lineHeight: 1,
        }}
      >
        <StarIcon sx={{ fontSize: 13 }} />
        {movie.vote_average?.toFixed(1) || "N/A"}
      </Box>

      {/* Hover overlay */}
      <Box
        className="movie-overlay"
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "flex-end",
          p: 1.75,
          opacity: { xs: 1, md: 0 },
          background:
            "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 40%, transparent 75%)",
          transition: "opacity 0.4s ease",
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography
            variant="subtitle2"
            fontWeight={800}
            sx={{
              color: "#fff",
              lineHeight: 1.3,
              mb: 0.3,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {movie.title}
          </Typography>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography
              variant="caption"
              sx={{ color: "#9a9a9a", fontWeight: 600 }}
            >
              {movie.release_date?.split("-")[0] || "—"}
            </Typography>
            <Box
              sx={{
                width: 3,
                height: 3,
                borderRadius: "50%",
                backgroundColor: "#666",
              }}
            />
            <Typography
              variant="caption"
              sx={{ color: "#e50914", fontWeight: 700 }}
            >
              ▶ Watch
            </Typography>
          </Stack>
        </Box>
      </Box>
    </Card>
  );
}
