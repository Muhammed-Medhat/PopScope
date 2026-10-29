import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { tmdbService } from "../services/modules/tmdb.service";
import HomeHero from "../components/home/HomeHero";
import TrendingSection from "../components/home/TrendingSection";
import HomeErrorState from "../components/home/HomeErrorState";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [movies, setMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [error, setError] = useState(null);
  const [activeMovie, setActiveMovie] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [hasSlid, setHasSlid] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const fetchMovies = useCallback(() => {
    setLoadingMovies(true);
    setError(null);
    setHasSlid(false);

    tmdbService
      .getTrending(page)
      .then((res) => {
        const allMovies = res?.data?.results || [];
        setMovies(allMovies);

        const total = res?.data?.total_pages || 1;
        setTotalPages(total > 500 ? 500 : total);

        if (allMovies.length > 0) {
          setActiveMovie(allMovies[0]);
        }

        setLoadingMovies(false);
      })
      .catch((err) => {
        setError(
          "Failed to load movies. Please check your internet connection and try again.",
        );
        setLoadingMovies(false);
        console.error("Error fetching movies:", err);
      });
  }, [page]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handlePageChange = (event, value) => {
    setSearchParams({ page: value });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSlideChange = (movie) => {
    setHasSlid(true);
    setActiveMovie(movie);
  };

  const sliderMovies = movies.slice(0, 5);

  if (error) {
    return <HomeErrorState error={error} onRetry={fetchMovies} />;
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
        loading={loadingMovies}
        activeMovie={activeMovie}
        sliderMovies={sliderMovies}
        hasSlid={hasSlid}
        page={page}
        onSlideChange={handleSlideChange}
      />

      <TrendingSection
        movies={movies}
        loading={loadingMovies}
        page={page}
        totalPages={totalPages}
        isMobile={isMobile}
        onPageChange={handlePageChange}
      />
    </Box>
  );
}
