import { Box, Button, Typography } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";

export default function EmptyWatchlist({ onBrowse }) {
  return (
    <Box
      sx={{
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        border: "1px dashed rgba(255,255,255,0.12)",
        borderRadius: "20px",
        px: 3,
        py: 6,
        backgroundColor: "rgba(255,255,255,0.02)",
      }}
    >
      <Box
        sx={{
          p: 3,
          borderRadius: "50%",
          backgroundColor: "rgba(229,9,20,0.08)",
          border: "1px solid rgba(229,9,20,0.25)",
          mb: 3,
          display: "flex",
        }}
      >
        <BookmarkIcon sx={{ fontSize: 64, color: "#e50914", opacity: 0.9 }} />
      </Box>

      <Typography variant="h5" fontWeight="800" gutterBottom>
        Your watchlist is empty
      </Typography>

      <Typography
        variant="body1"
        sx={{ color: "#888", mb: 4, maxWidth: 400, lineHeight: 1.7 }}
      >
        Start adding movies that you want to watch later.
      </Typography>

      <Button
        variant="contained"
        color="error"
        startIcon={<MovieOutlinedIcon />}
        onClick={onBrowse}
        sx={{
          borderRadius: "999px",
          px: 3.5,
          py: 1.2,
          textTransform: "none",
          fontWeight: 700,
          fontSize: "0.95rem",
          boxShadow: "0 8px 24px rgba(229,9,20,0.4)",
          transition: "all 0.25s ease",
          "&:hover": {
            boxShadow: "0 12px 32px rgba(229,9,20,0.55)",
            transform: "translateY(-1px)",
          },
        }}
      >
        Browse Movies
      </Button>
    </Box>
  );
}
