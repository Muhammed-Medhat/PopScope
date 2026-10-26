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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { keyframes } from "@mui/material/styles";
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
const IMG_BASE = "https://image.tmdb.org/t/p";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const NO_POSTER_IMG =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="185" height="278" viewBox="0 0 185 278">
      <rect width="185" height="278" fill="#2a2a2a"/>
      <text x="50%" y="50%" font-size="14" fill="#888" text-anchor="middle" dy=".3em">No Image</text>
    </svg>
  `);

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

    axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&page=${page}`,
      )
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
            {activeMovie?.backdrop_path && (
              <Box
                key={activeMovie.id}
                component="img"
                src={`${IMG_BASE}/w1280${activeMovie.backdrop_path}`}
                srcSet={`${IMG_BASE}/w780${activeMovie.backdrop_path} 780w, ${IMG_BASE}/w1280${activeMovie.backdrop_path} 1280w`}
                sizes="100vw"
                alt=""
                fetchPriority="high"
                decoding="async"
                sx={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  pointerEvents: "none",
                  zIndex: 0,
                  animation: hasSlid ? `${fadeIn} 0.8s ease-in-out` : "none",
                }}
              />
            )}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(20,20,20,0.3) 0%, rgba(20,20,20,1) 100%)",
                pointerEvents: "none",
                zIndex: 1,
              }}
            />

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
                      key={`${page}-${sliderMovies.length}`}
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
                          setHasSlid(true);
                          setActiveMovie(sliderMovies[realIndex]);
                        }
                      }}
                      style={{ padding: "20px 0" }}
                    >
                      {sliderMovies.map((movie, index) => (
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
                              src={
                                movie.poster_path
                                  ? `${IMG_BASE}/w342${movie.poster_path}`
                                  : NO_POSTER_IMG
                              }
                              alt={movie.title}
                              width={200}
                              height={300}
                              loading={index === 0 ? "eager" : "lazy"}
                              decoding="async"
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
          sx={{ borderLeft: "4px solid #e50914", pl: 2, mb: 2 }}
        >
          Trending This Week
        </Typography>

        <Grid container spacing={2.5}>
          {loadingMovies
            ? Array.from(new Array(12)).map((_, index) => (
                <Grid key={index} size={{ xs: 6, sm: 4, md: 3, lg: 2 }}>
                  <Box
                    sx={{
                      position: "relative",
                      aspectRatio: "2 / 3",
                      borderRadius: "10px",
                      overflow: "hidden",
                      backgroundColor: "#1e1e1e",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                    }}
                  >
                    {/* جسم الكارد (البوستر) */}
                    <Skeleton
                      variant="rectangular"
                      animation="wave"
                      width="100%"
                      height="100%"
                      sx={{ bgcolor: "#262626" }}
                    />

                    {/* شكل بادج التقييم */}
                    <Skeleton
                      variant="rounded"
                      animation="wave"
                      width={44}
                      height={22}
                      sx={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        bgcolor: "#333",
                        borderRadius: "6px",
                      }}
                    />

                    {/* شكل العنوان والسنة تحت */}
                    <Box
                      sx={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        bottom: 0,
                        p: 1.75,
                        background:
                          "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 100%)",
                      }}
                    >
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="80%"
                        height={20}
                        sx={{ bgcolor: "#3a3a3a" }}
                      />
                      <Skeleton
                        variant="text"
                        animation="wave"
                        width="35%"
                        height={16}
                        sx={{ bgcolor: "#3a3a3a" }}
                      />
                    </Box>
                  </Box>
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
                      src={
                        movie.poster_path
                          ? `${IMG_BASE}/w342${movie.poster_path}`
                          : NO_POSTER_IMG
                      }
                      alt={movie.title}
                      width={342}
                      height={513}
                      loading="lazy"
                      decoding="async"
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

        {/* Pagination */}
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
            size={isMobile ? "small" : "large"}
            sx={{
              "& .MuiPagination-ul": {
                justifyContent: "center",
                gap: { xs: 0.4, sm: 0.25 },
              },
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
