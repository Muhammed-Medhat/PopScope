import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import SearchBar from "./search/SearchBar";

export default function Navbar() {
  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background:
          "linear-gradient(180deg, rgba(13,13,13,0.95) 0%, rgba(13,13,13,0.85) 100%)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
        borderRadius: "0px 0px 20px 20px",
      }}
    >
      <Toolbar
        sx={{
          columnGap: 2,
          rowGap: 1,
          py: { xs: 1.25, sm: 1.25 },
          px: { xs: 2, sm: 3, md: 4 },
          minHeight: { xs: "auto", sm: 64 },
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Box
          component={Link}
          to="/"
          sx={{
            order: 1,
            mr: "auto",
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            transition: "transform 0.25s ease",
            "&:hover": { transform: "scale(1.03)" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 34,
              height: 34,
              borderRadius: 2,
              background: "linear-gradient(135deg, #e50914 0%, #8b0000 100%)",
              boxShadow: "0 4px 16px rgba(229,9,20,0.5)",
            }}
          >
            <MovieFilterIcon sx={{ fontSize: 20, color: "#fff" }} />
          </Box>
          <Typography
            variant="h6"
            noWrap
            sx={{
              fontWeight: 900,
              fontSize: { xs: "1.15rem", sm: "1.4rem" },
              letterSpacing: 0.5,
              background: "linear-gradient(180deg, #ffffff 0%, #cfcfcf 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            PopScope
          </Typography>
        </Box>

        {/* Search */}
        <Box
          sx={{
            order: { xs: 3, sm: 2 },
            width: { xs: "100%", sm: "auto" },
            flex: { sm: "0 1 auto" },
          }}
        >
          <SearchBar />
        </Box>

        {/* Watchlist Button */}
        <Button
          component={Link}
          to="/watchlist"
          startIcon={<BookmarkBorderIcon />}
          sx={{
            order: { xs: 2, sm: 3 },
            color: "#fff",
            textTransform: "none",
            fontSize: "0.95rem",
            fontWeight: 600,
            px: 2,
            py: 0.8,
            borderRadius: "999px",
            border: "1px solid rgba(255,255,255,0.15)",
            backgroundColor: "rgba(255,255,255,0.03)",
            transition: "all 0.25s ease",
            "&:hover": {
              backgroundColor: "rgba(229,9,20,0.15)",
              borderColor: "rgba(229,9,20,0.5)",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 16px rgba(229,9,20,0.3)",
            },
          }}
        >
          Watchlist
        </Button>
      </Toolbar>
    </AppBar>
  );
}
