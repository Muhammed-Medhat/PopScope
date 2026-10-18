import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";

export default function Navbar() {
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#141414" }}>
      <Toolbar
        sx={{
          flexWrap: "wrap",
          columnGap: 2,
          rowGap: 1,
          py: { xs: 1, sm: 0 },
        }}
      >
        <Typography
          variant="h6"
          noWrap
          component={Link}
          to="/"
          sx={{
            order: 1,
            mr: "auto",
            fontWeight: "bold",
            color: "#e50914",
            textDecoration: "none",
            fontSize: { xs: "1.25rem", sm: "1.5rem" },
            letterSpacing: 1,
          }}
        >
          PopScope
        </Typography>

        <Box
          sx={{
            order: { xs: 3, sm: 2 },
            width: { xs: "100%", sm: "auto" },
          }}
        >
          <SearchBar />
        </Box>

        <Button
          component={Link}
          to="/watchlist"
          sx={{
            order: { xs: 2, sm: 3 },
            color: "white",
            textTransform: "none",
            fontSize: "1rem",
          }}
        >
          Watchlist
        </Button>
      </Toolbar>
    </AppBar>
  );
}
