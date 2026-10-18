import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import {
  Container,
  Grid,
  Typography,
  Card,
  Box,
  Button,
  Chip,
  Skeleton,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import InfoIcon from "@mui/icons-material/Info";
import Pagination from "@mui/material/Pagination";
import RefreshIcon from "@mui/icons-material/Refresh";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";

// Swiper React Components & Modules
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";

// Swiper CSS Styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const preloadImage = (src) => {
  return new Promise((resolve) => {
    if (!src) return resolve(false);
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
  });
};

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [error, setError] = useState(null);
  const [activeMovie, setActiveMovie] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const fetchMovies = useCallback(() => {
    setLoadingMovies(true);
    setError(null);

    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${page}`,
      )
      .then(async (res) => {
        const allMovies = res?.data?.results || [];
        setMovies(allMovies);

        const total = res?.data?.total_pages || 1;
        setTotalPages(total > 500 ? 500 : total);

        if (allMovies.length > 0) {
          const firstMovie = allMovies[0];
          setActiveMovie(firstMovie);

          const backdropUrl = firstMovie.backdrop_path
            ? `https://image.tmdb.org/t/p/w1280${firstMovie.backdrop_path}`
            : null;
          const posterUrl = firstMovie.poster_path
            ? `https://image.tmdb.org/t/p/w342${firstMovie.poster_path}`
            : null;

          await Promise.all([
            preloadImage(backdropUrl),
            preloadImage(posterUrl),
          ]);
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

  const sliderMovies = movies.slice(0, 10);

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#141414",
          color: "#fff",
          textAlign: "center",
          px: 2,
        }}
      >
        <ErrorOutlinedIcon sx={{ fontSize: 80, color: "#e50914", mb: 2 }} />
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Oops! Something went wrong
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "#aaa", mb: 3, maxWidth: 500 }}
        >
          {error}
        </Typography>
        <Button
          variant="contained"
          color="error"
          startIcon={<RefreshIcon />}
          onClick={fetchMovies}
          sx={{
            borderRadius: 2,
            px: 4,
            py: 1.2,
            textTransform: "none",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#141414",
        color: "#fff",
        minHeight: "100vh",
        pb: 6,
      }}
    >
      {/* 1. Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: "85vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
          pt: 8,
          mb: 4,
        }}
      >
        {loadingMovies ? (
          <Container maxWidth="lg" sx={{ zIndex: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: 4,
              }}
            >
              <Box sx={{ flex: 1, width: "100%" }}>
                <Skeleton
                  variant="text"
                  width="70%"
                  height={60}
                  sx={{ bgcolor: "#2a2a2a" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={120}
                  height={32}
                  sx={{ bgcolor: "#2a2a2a", my: 2, borderRadius: 1 }}
                />
                <Skeleton
                  variant="text"
                  width="100%"
                  height={20}
                  sx={{ bgcolor: "#2a2a2a" }}
                />
                <Skeleton
                  variant="text"
                  width="90%"
                  height={20}
                  sx={{ bgcolor: "#2a2a2a" }}
                />
                <Skeleton
                  variant="text"
                  width="60%"
                  height={20}
                  sx={{ bgcolor: "#2a2a2a" }}
                />
                <Skeleton
                  variant="rectangular"
                  width={140}
                  height={42}
                  sx={{ bgcolor: "#2a2a2a", mt: 3, borderRadius: 2 }}
                />
              </Box>
              <Box
                sx={{
                  flex: 1,
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Skeleton
                  variant="rectangular"
                  width={200}
                  height={300}
                  sx={{ bgcolor: "#2a2a2a", borderRadius: "12px" }}
                />
              </Box>
            </Box>
          </Container>
        ) : (
          <>
            {sliderMovies.map((movie) => {
              const isActive = activeMovie?.id === movie.id;
              return (
                <Box
                  key={movie.id}
                  sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `linear-gradient(to bottom, rgba(20,20,20,0.3) 0%, rgba(20,20,20,1) 100%), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: isActive ? 1 : 0,
                    transition: "opacity 0.8s ease-in-out",
                    pointerEvents: "none",
                    zIndex: 1,
                  }}
                />
              );
            })}

            <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <Box sx={{ flex: 1 }}>
                  {activeMovie && (
                    <Box>
                      <Typography
                        variant="h3"
                        fontWeight="bold"
                        gutterBottom
                        sx={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8)" }}
                      >
                        {activeMovie.title}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                          mb: 2,
                        }}
                      >
                        <Chip
                          icon={<StarIcon style={{ color: "#FFD700" }} />}
                          label={`${activeMovie.vote_average?.toFixed(1)} / 10`}
                          sx={{
                            backgroundColor: "rgba(0,0,0,0.6)",
                            color: "#fff",
                          }}
                        />
                        <Typography variant="body2" sx={{ opacity: 0.8 }}>
                          {activeMovie.release_date?.split("-")[0]}
                        </Typography>
                      </Box>

                      <Typography
                        variant="body1"
                        sx={{
                          color: "#e0e0e0",
                          mb: 3,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textShadow: "1px 1px 4px rgba(0,0,0,0.8)",
                        }}
                      >
                        {activeMovie.overview}
                      </Typography>

                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<InfoIcon />}
                        component={Link}
                        to={`/movie/${activeMovie.id}`}
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          px: 3,
                          py: 1,
                        }}
                      >
                        View Details
                      </Button>
                    </Box>
                  )}
                </Box>

                <Box sx={{ flex: 1, width: "100%", maxWidth: "500px" }}>
                  {sliderMovies.length > 0 && (
                    <Swiper
                      key={sliderMovies.length}
                      effect={"coverflow"}
                      grabCursor={true}
                      centeredSlides={true}
                      slidesPerView={"auto"}
                      loop={sliderMovies.length >= 6}
                      autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                      coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                      }}
                      modules={[EffectCoverflow, Autoplay]}
                      onSlideChange={(swiper) => {
                        const realIndex = swiper.realIndex;
                        if (sliderMovies[realIndex]) {
                          setActiveMovie(sliderMovies[realIndex]);
                        }
                      }}
                      style={{ padding: "20px 0" }}
                    >
                      {sliderMovies.map((movie) => (
                        <SwiperSlide
                          key={movie.id}
                          style={{
                            width: "200px",
                            height: "300px",
                            borderRadius: "12px",
                            overflow: "hidden",
                            boxShadow: "0px 10px 20px rgba(0,0,0,0.5)",
                          }}
                        >
                          <Link to={`/movie/${movie.id}`}>
                            <img
                              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                              alt={movie.title}
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />
                          </Link>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                </Box>
              </Box>
            </Container>
          </>
        )}
      </Box>

      {/* 2. Trending Grid Section */}
      <Container maxWidth="xl">
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={4}
          sx={{ borderLeft: "4px solid #e50914", pl: 2 }}
        >
          Trending This Week
        </Typography>

        <Grid container spacing={2.5}>
          {loadingMovies
            ? Array.from(new Array(12)).map((_, index) => (
                <Grid key={index} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
                  <Skeleton
                    variant="rectangular"
                    animation="wave"
                    sx={{
                      aspectRatio: "2 / 3",
                      borderRadius: "10px",
                      backgroundColor: "#1e1e1e",
                    }}
                  />
                </Grid>
              ))
            : movies.map((movie) => (
                <Grid key={movie.id} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
                  <Card
                    component={Link}
                    to={`/movie/${movie.id}`}
                    sx={{
                      position: "relative",
                      display: "block",
                      textDecoration: "none",
                      borderRadius: "10px",
                      overflow: "hidden",
                      aspectRatio: "2 / 3",
                      backgroundColor: "#1e1e1e",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                      transition: "transform 0.35s ease, box-shadow 0.35s ease",
                      "&:hover": {
                        transform: "translateY(-6px) scale(1.03)",
                        boxShadow: "0 16px 32px rgba(0,0,0,0.6)",
                        "& .movie-overlay": { opacity: 1 },
                        "& .movie-poster": { filter: "brightness(0.55)" },
                      },
                    }}
                  >
                    <Box
                      className="movie-poster"
                      component="img"
                      src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                      alt={movie.title}
                      loading="lazy"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "filter 0.35s ease",
                      }}
                    />

                    <Box
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        px: 1,
                        py: 0.3,
                        borderRadius: "6px",
                        backgroundColor: "rgba(0,0,0,0.65)",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#f5c518",
                      }}
                    >
                      ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
                    </Box>

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
                          "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 45%, transparent 75%)",
                        transition: "opacity 0.35s ease",
                      }}
                    >
                      <Box>
                        <Typography
                          variant="subtitle2"
                          fontWeight={700}
                          sx={{ color: "#fff", lineHeight: 1.25 }}
                        >
                          {movie.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#bbb" }}>
                          {movie.release_date?.split("-")[0] || "—"}
                        </Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
        </Grid>

        {/*Pagination */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 6,
            mb: 2,
          }}
        >
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="error"
            size="large"
            sx={{
              "& .MuiPaginationItem-root": {
                color: "#fff",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                "&:hover": {
                  backgroundColor: "rgba(229, 9, 20, 0.3)",
                },
              },
              "& .Mui-selected": {
                backgroundColor: "#e50914 !important",
                color: "#fff",
                fontWeight: "bold",
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  );
}
