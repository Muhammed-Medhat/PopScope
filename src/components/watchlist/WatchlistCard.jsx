import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IMG_BASE, NO_POSTER } from "./constants";

export default function WatchlistCard({ movie, onRemove }) {
  const navigate = useNavigate();

  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "Unknown";

  const posterUrl = movie.poster_path
    ? `${IMG_BASE}/w342${movie.poster_path}`
    : NO_POSTER;

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#1a1a1a",
        color: "#fff",
        borderRadius: "18px",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.06)",
        transition:
          "transform 0.35s cubic-bezier(0.2,0.8,0.2,1), box-shadow 0.35s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow:
            "0 24px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(229,9,20,0.4)",
          "& .watchlist-poster": { transform: "scale(1.08)" },
          "& .poster-overlay": { opacity: 1 },
        },
      }}
    >
      {/* Poster */}
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <CardMedia
          className="watchlist-poster"
          component="img"
          image={posterUrl}
          alt={movie.title}
          sx={{
            height: 360,
            objectFit: "cover",
            cursor: "pointer",
            transition: "transform 0.6s cubic-bezier(0.2,0.8,0.2,1)",
          }}
          onClick={() => navigate(`/movie/${movie.id}`)}
        />

        {/* Gradient overlay */}
        <Box
          className="poster-overlay"
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 45%)",
            opacity: { xs: 0.9, md: 0.6 },
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        />

        {/* Rating badge */}
        <Box
          sx={{
            position: "absolute",
            top: 12,
            right: 12,
            px: 1.2,
            py: 0.4,
            borderRadius: "999px",
            backgroundColor: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.15)",
            display: "flex",
            alignItems: "center",
            gap: 0.4,
            fontSize: 12,
            fontWeight: 800,
            color: "#f5c518",
            lineHeight: 1,
          }}
        >
          <StarIcon sx={{ fontSize: 13 }} />
          {movie.vote_average?.toFixed(1) || "N/A"}
        </Box>
      </Box>

      {/* Content */}
      <CardContent
        sx={{
          flexGrow: 1,
          p: 2.25,
          "&:last-child": { pb: 2.25 },
        }}
      >
        <Typography
          variant="h6"
          fontWeight={800}
          noWrap
          title={movie.title}
          sx={{
            color: "#fff",
            fontSize: "1.05rem",
            mb: 0.5,
            lineHeight: 1.3,
          }}
        >
          {movie.title}
        </Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{ alignItems: "center", mb: 1.5 }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#9a9a9a", fontWeight: 600 }}
          >
            {releaseYear}
          </Typography>
          <Box
            sx={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              backgroundColor: "#555",
            }}
          />
          <Rating
            value={(movie.vote_average || 0) / 2}
            precision={0.1}
            max={5}
            readOnly
            size="small"
            sx={{
              "& .MuiRating-iconFilled": { color: "#FFD700" },
              "& .MuiRating-iconEmpty": {
                color: "rgba(255,255,255,0.25)",
              },
            }}
          />
        </Stack>

        <Typography
          variant="body2"
          sx={{
            color: "#9a9a9a",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            lineHeight: 1.65,
            fontSize: "0.85rem",
          }}
        >
          {movie.overview || "No overview available."}
        </Typography>
      </CardContent>

      {/* Actions */}
      <CardActions
        sx={{
          px: 2.25,
          pb: 2.25,
          pt: 0,
          justifyContent: "space-between",
        }}
      >
        <Button
          size="small"
          variant="contained"
          color="error"
          endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
          onClick={() => navigate(`/movie/${movie.id}`)}
          sx={{
            borderRadius: "999px",
            textTransform: "none",
            fontWeight: 700,
            px: 2.25,
            py: 0.7,
            fontSize: "0.82rem",
            boxShadow: "0 4px 12px rgba(229,9,20,0.3)",
            transition: "all 0.25s ease",
            "&:hover": {
              boxShadow: "0 6px 20px rgba(229,9,20,0.5)",
              transform: "translateY(-1px)",
            },
          }}
        >
          Details
        </Button>

        <IconButton
          color="error"
          aria-label={`Remove ${movie.title}`}
          onClick={() => onRemove(movie.id)}
          sx={{
            border: "1px solid rgba(244,67,54,0.35)",
            backgroundColor: "rgba(244,67,54,0.05)",
            transition: "all 0.25s ease",
            "&:hover": {
              backgroundColor: "rgba(244,67,54,0.15)",
              borderColor: "rgba(244,67,54,0.7)",
              transform: "scale(1.08)",
            },
          }}
        >
          <DeleteOutlinedIcon fontSize="small" />
        </IconButton>
      </CardActions>
    </Card>
  );
}
