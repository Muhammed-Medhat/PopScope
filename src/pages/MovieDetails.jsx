import { useState, useEffect, useCallback } from "react";
import { useParams as useReactParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Grid,
  Typography,
  Box,
  Chip,
  CircularProgress,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import MovieIcon from "@mui/icons-material/Movie";
import RefreshIcon from "@mui/icons-material/Refresh";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import { useWatchList } from "../contexts/WatchListContext";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const NO_POSTER =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750">
      <rect width="500" height="750" fill="#2a2a2a"/>
      <text x="50%" y="50%" font-size="28" fill="#888" text-anchor="middle" dy=".3em">No Poster</text>
    </svg>
  `);

const NO_ACTOR_IMG =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="185" height="278" viewBox="0 0 185 278">
      <rect width="185" height="278" fill="#2a2a2a"/>
      <text x="50%" y="50%" font-size="14" fill="#888" text-anchor="middle" dy=".3em">No Image</text>
    </svg>
  `);

export default function MovieDetails() {
  const { id } = useReactParams();
  const { watches, dispatch } = useWatchList();

  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAdd = () => {
    dispatch({ type: "added", payload: movie });
  };

  const fetchMovieDetails = useCallback(() => {
    setLoading(true);
    setError(null);

    const fetchDetails = axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=credits`,
    );

    const fetchVideos = axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`,
    );

    Promise.all([fetchDetails, fetchVideos])
      .then(([detailsRes, videosRes]) => {
        setMovie(detailsRes.data);
        setCast(detailsRes.data.credits?.cast?.slice(0, 8) || []);

        const trailer = videosRes.data.results?.find(
          (vid) => vid.site === "YouTube" && vid.type === "Trailer",
        );
        setTrailerKey(trailer ? trailer.key : null);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching movie details:", err);
        setError(
          "Failed to load movie details. Please check your internet connection and try again.",
        );
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    fetchMovieDetails();
  }, [fetchMovieDetails]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#141414",
        }}
      >
        <CircularProgress color="error" />
      </Box>
    );
  }

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
          onClick={fetchMovieDetails}
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

  if (!movie) {
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
        }}
      >
        <Typography variant="h5">Movie not found.</Typography>
      </Box>
    );
  }

  const exist = watches.some((watche) => watche.id === movie.id);

  return (
    <Box sx={{ pb: 6, backgroundColor: "#141414" }}>
      <Box
        sx={{
          position: "relative",
          color: "#fff",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(18,18,18,1)), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} sx={{ alignItems: "center" }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <CardMedia
                component="img"
                image={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                    : NO_POSTER
                }
                alt={movie.title}
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                {movie.title}{" "}
                <Typography
                  component="span"
                  variant="h4"
                  color="text.secondary"
                >
                  ({movie.release_date?.split("-")[0]})
                </Typography>
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 2,
                  my: 2,
                }}
              >
                <Chip
                  icon={<StarIcon style={{ color: "#FFD700" }} />}
                  label={`${movie.vote_average?.toFixed(1)} / 10`}
                  color="default"
                  sx={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "#fff",
                  }}
                />
                {movie.runtime > 0 && (
                  <Typography variant="body2">{movie.runtime} min</Typography>
                )}
                {movie.genres?.map((genre) => (
                  <Chip
                    key={genre.id}
                    label={genre.name}
                    size="small"
                    variant="outlined"
                    sx={{ color: "#fff", borderColor: "rgba(255,255,255,0.3)" }}
                  />
                ))}
              </Box>

              <Typography variant="h6" fontWeight="bold" mt={3} mb={1}>
                Overview
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "#d1d1d1", lineHeight: 1.7 }}
              >
                {movie.overview || "No overview available for this movie."}
              </Typography>

              {trailerKey && (
                <Button
                  variant="contained"
                  color="error"
                  startIcon={<MovieIcon />}
                  sx={{ mt: 3 }}
                  onClick={() => {
                    document
                      .getElementById("trailer-section")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Watch Trailer
                </Button>
              )}
              <Box>
                <Button
                  variant="contained"
                  color="success"
                  disabled={exist}
                  startIcon={<MovieIcon />}
                  sx={{
                    mt: 3,
                    backgroundColor: exist ? "#555" : "#2e7d32",
                    color: "#fff",

                    "&:hover": {
                      backgroundColor: exist ? "#555" : "#1b5e20",
                    },

                    "&.Mui-disabled": {
                      backgroundColor: "#555",
                      color: "#fff",
                      opacity: 0.7,
                    },
                  }}
                  onClick={handleAdd}
                >
                  {exist ? "Already in watchlist" : "Add to watchlist"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={3}
          sx={{
            color: "#fff",
            borderLeft: "4px solid #e50914",
            pl: 2,
            marginBottom: "20px",
          }}
        >
          Top Cast
        </Typography>
        <Grid container spacing={2}>
          {cast.map((actor) => (
            <Grid key={actor.id} size={{ xs: 6, sm: 4, md: 3, lg: 1.5 }}>
              <Card
                sx={{
                  height: "100%",
                  backgroundColor: "#1e1e1e",
                  color: "#fff",
                }}
              >
                <CardMedia
                  component="img"
                  height="160"
                  image={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                      : NO_ACTOR_IMG
                  }
                  alt={actor.name}
                />
                <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                  <Typography variant="subtitle2" fontWeight="bold" noWrap>
                    {actor.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    noWrap
                    display="block"
                  >
                    {actor.character}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {trailerKey && (
          <Box id="trailer-section" sx={{ mt: 6 }}>
            <Typography
              sx={{
                color: "#fff",
                borderLeft: "4px solid #e50914",
                pl: 2,
                marginBottom: "20px",
              }}
              variant="h5"
              fontWeight="bold"
            >
              Official Trailer
            </Typography>

            <Box
              sx={{
                position: "relative",
                paddingBottom: "56.25%",
                height: 0,
                overflow: "hidden",
                borderRadius: 2,
                boxShadow: 3,
              }}
            >
              <iframe
                style={{
                  position: "absolute",
                  top: 5,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
                src={`https://www.youtube.com/embed/${trailerKey}`}
                title="Movie Trailer"
                allowFullScreen
              />
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
