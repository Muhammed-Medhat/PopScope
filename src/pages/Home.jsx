import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import HomeHero from "../components/home/HomeHero";
import TrendingSection from "../components/home/TrendingSection";
import HomeErrorState from "../components/home/HomeErrorState";
import { useTrendingMovies } from "../components/home/hooks/useTrendingMovies";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [activeMovie, setActiveMovie] = useState(null);
  const [hasSlid, setHasSlid] = useState(false);

  const { data, isLoading, isError, error, refetch } = useTrendingMovies(page);

  const movies = data?.movies ?? [];
  const totalPages = data?.totalPages ?? 1;

  // تعيين الفيلم النشط افتراضياً عند أول تحميل ناجح
  if (movies.length > 0 && !activeMovie) {
    setActiveMovie(movies[0]);
  }

  const handlePageChange = (event, value) => {
    setSearchParams({ page: value });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSlideChange = (movie) => {
    setHasSlid(true);
    setActiveMovie(movie);
  };

  const sliderMovies = movies.slice(0, 5);

  if (isError) {
    return (
      <HomeErrorState
        error={error?.message || "Failed to load movies."}
        onRetry={refetch}
      />
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#0d0d0d",
        color: "#fff",
        minHeight: "100vh",
        pb: 8,
      }}
    >
      <HomeHero
        loading={isLoading}
        activeMovie={activeMovie}
        sliderMovies={sliderMovies}
        hasSlid={hasSlid}
        page={page}
        onSlideChange={handleSlideChange}
      />

      <TrendingSection
        movies={movies}
        loading={isLoading}
        page={page}
        totalPages={totalPages}
        isMobile={isMobile}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}
