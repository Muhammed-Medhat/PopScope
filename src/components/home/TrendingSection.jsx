import { Container, Grid, Typography, Box, Pagination } from "@mui/material";
import SectionHeader from "./SectionHeader";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

const SKELETON_COUNT = 12;

export default function TrendingSection({
  movies,
  loading,
  page,
  totalPages,
  isMobile,
  onPageChange,
}) {
  return (
    <Container maxWidth="xl">
      <SectionHeader
        title="Trending This Week"
        rightContent={
          <Typography
            variant="caption"
            sx={{
              color: "#777",
              display: { xs: "none", sm: "block" },
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            Page {page} / {totalPages}
          </Typography>
        }
      />

      <Grid container spacing={{ xs: 1.5, sm: 2.5 }}>
        {loading
          ? Array.from(new Array(SKELETON_COUNT)).map((_, index) => (
              <Grid key={index} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
                <MovieCardSkeleton />
              </Grid>
            ))
          : movies.map((movie) => (
              <Grid key={movie.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
      </Grid>

      {/* Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 7,
          mb: 2,
        }}
      >
        <Box
          sx={{
            px: { xs: 1.5, sm: 3 },
            py: 1.5,
            borderRadius: "999px",
            backgroundColor: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(12px)",
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={onPageChange}
            color="error"
            size={isMobile ? "small" : "large"}
            sx={{
              "& .MuiPagination-ul": {
                justifyContent: "center",
                gap: { xs: 0.4, sm: 0.25 },
              },
              "& .MuiPaginationItem-root": {
                color: "#ddd",
                fontWeight: 600,
                border: "1px solid transparent",
                transition: "all 0.2s ease",
                "&:hover": {
                  backgroundColor: "rgba(229, 9, 20, 0.15)",
                  borderColor: "rgba(229, 9, 20, 0.4)",
                  color: "#fff",
                },
              },
              "& .Mui-selected": {
                backgroundColor: "#e50914 !important",
                color: "#fff",
                fontWeight: "bold",
                boxShadow: "0 4px 16px rgba(229,9,20,0.5)",
                "&:hover": { backgroundColor: "#ff1a26 !important" },
              },
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}
