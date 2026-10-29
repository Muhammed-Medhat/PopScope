import { Box, Chip, Stack, Typography } from "@mui/material";
import BookmarkIcon from "@mui/icons-material/Bookmark";

export default function WatchlistHeader({ count }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: { xs: "flex-start", sm: "center" },
        justifyContent: "space-between",
        flexDirection: { xs: "column", sm: "row" },
        gap: 2.5,
        mb: 5,
      }}
    >
      <Box>
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ mb: 1, alignItems: "center" }}
        >
          <Box
            sx={{
              width: 5,
              height: 36,
              borderRadius: 2,
              background: "linear-gradient(180deg, #e50914 0%, #8b0000 100%)",
              boxShadow: "0 0 16px rgba(229,9,20,0.5)",
            }}
          />
          <Typography
            variant="h4"
            fontWeight="900"
            sx={{
              color: "#fff",
              fontSize: { xs: "1.6rem", md: "2rem" },
              letterSpacing: "-0.01em",
            }}
          >
            My Watchlist
          </Typography>
        </Stack>

        <Typography variant="body1" sx={{ color: "#888", mt: 0.5, ml: "21px" }}>
          Movies you saved to watch later
        </Typography>
      </Box>

      <Chip
        icon={<BookmarkIcon sx={{ fontSize: "16px !important" }} />}
        label={`${count} ${count === 1 ? "Movie" : "Movies"}`}
        sx={{
          backgroundColor: "rgba(229,9,20,0.12)",
          color: "#ff5252",
          border: "1px solid rgba(229,9,20,0.35)",
          fontWeight: 800,
          fontSize: 13,
          px: 0.5,
          height: 36,
          borderRadius: "999px",
          "& .MuiChip-icon": { color: "#e50914" },
        }}
      />
    </Box>
  );
}
