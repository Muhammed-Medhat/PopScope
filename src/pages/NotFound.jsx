// pages/NotFound.jsx
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";

export default function NotFound() {
  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
        gap: 2,
        color: "#fff",
      }}
    >
      <MovieFilterIcon
        sx={{ fontSize: { xs: 64, sm: 80 }, color: "#e50914" }}
      />

      <Typography
        component="h1"
        sx={{
          fontSize: { xs: "5rem", sm: "8rem" },
          fontWeight: 800,
          lineHeight: 1,
          color: "#e50914",
        }}
      >
        404
      </Typography>

      <Typography
        variant="h5"
        fontWeight="bold"
        sx={{ fontSize: { xs: "1.25rem", sm: "1.5rem" } }}
      >
        Page not found
      </Typography>

      <Typography sx={{ color: "#aaa", maxWidth: 420 }}>
        The page you're looking for doesn't exist or may have been moved.
      </Typography>

      <Button
        component={Link}
        to="/"
        variant="contained"
        startIcon={<HomeIcon />}
        sx={{
          mt: 2,
          backgroundColor: "#e50914",
          textTransform: "none",
          fontSize: "1rem",
          px: 3,
          "&:hover": { backgroundColor: "#b20710" },
        }}
      >
        Back to Home
      </Button>
    </Box>
  );
}
