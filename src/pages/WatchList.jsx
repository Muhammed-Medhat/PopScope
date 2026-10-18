import { useWatchList } from "../contexts/WatchListContext";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Rating,
  Typography,
} from "@mui/material";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import MovieOutlinedIcon from "@mui/icons-material/MovieOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";

const NO_POSTER =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="500" height="750">
      <rect width="500" height="750" fill="#2a2a2a"/>
      <text x="50%" y="50%" font-size="28" fill="#888"
        text-anchor="middle" dy=".3em">
        No Poster
      </text>
    </svg>
  `);

export default function WatchList() {
  const { watches, dispatch } = useWatchList();
  const navigate = useNavigate();

  const removeMovie = (movieId) => {
    dispatch({
      type: "removed",
      payload: movieId,
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#141414",
        color: "#fff",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        {/* عنوان الصفحة */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
            mb: 5,
            flexWrap: "wrap",
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ color: "#fff" }}>
              My Watchlist
            </Typography>

            <Typography variant="body1" sx={{ color: "#aaa", mt: 1 }}>
              Movies you saved to watch later
            </Typography>
          </Box>

          <Typography
            variant="body1"
            sx={{
              color: "#e50914",
              fontWeight: "bold",
              backgroundColor: "rgba(229, 9, 20, 0.12)",
              px: 2,
              py: 1,
              borderRadius: 2,
            }}
          >
            {watches.length} {watches.length === 1 ? "Movie" : "Movies"}
          </Typography>
        </Box>

        {watches.length === 0 ? (
          <Box
            sx={{
              minHeight: "45vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              border: "1px dashed #444",
              borderRadius: 3,
              px: 3,
            }}
          >
            <BookmarkIcon
              sx={{
                fontSize: 80,
                color: "#777",
                mb: 2,
              }}
            />

            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Your watchlist is empty
            </Typography>

            <Typography variant="body1" sx={{ color: "#aaa", mb: 3 }}>
              Start adding movies that you want to watch later.
            </Typography>

            <Button
              variant="contained"
              color="error"
              startIcon={<MovieOutlinedIcon />}
              onClick={() => navigate("/")}
            >
              Browse Movies
            </Button>
          </Box>
        ) : (
          <Grid container spacing={3}>
            {watches.map((movie) => {
              const releaseYear = movie.release_date
                ? movie.release_date.split("-")[0]
                : "Unknown";

              const posterUrl = movie.poster_path
                ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                : NO_POSTER;

              return (
                <Grid
                  key={movie.id}
                  size={{
                    xs: 12,
                    sm: 6,
                    md: 4,
                    lg: 3,
                  }}
                >
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#1e1e1e",
                      color: "#fff",
                      borderRadius: 3,
                      overflow: "hidden",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-6px)",
                        boxShadow: "0 12px 30px rgba(0,0,0,0.45)",
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={posterUrl}
                      alt={movie.title}
                      sx={{
                        height: 360,
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/movie/${movie.id}`)}
                    />

                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        noWrap
                        title={movie.title}
                        sx={{ color: "#fff" }}
                      >
                        {movie.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: "#999", mt: 0.5 }}
                      >
                        {releaseYear}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mt: 1.5,
                        }}
                      >
                        <Rating
                          value={(movie.vote_average || 0) / 2}
                          precision={0.1}
                          max={5}
                          readOnly
                          size="small"
                          sx={{
                            "& .MuiRating-iconFilled": {
                              color: "#FFD700",
                            },
                            "& .MuiRating-iconEmpty": {
                              color: "#fff",
                            },
                          }}
                        />

                        <Typography variant="body2" sx={{ color: "#ddd" }}>
                          {movie.vote_average
                            ? movie.vote_average.toFixed(1)
                            : "N/A"}
                        </Typography>
                      </Box>

                      <Typography
                        variant="body2"
                        sx={{
                          color: "#bbb",
                          mt: 2,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          lineHeight: 1.6,
                        }}
                      >
                        {movie.overview || "No overview available."}
                      </Typography>
                    </CardContent>

                    <CardActions
                      sx={{
                        px: 2,
                        pb: 2,
                        pt: 0,
                        justifyContent: "space-between",
                      }}
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        startIcon={<MovieOutlinedIcon />}
                        onClick={() => navigate(`/movie/${movie.id}`)}
                      >
                        Details
                      </Button>

                      <IconButton
                        color="error"
                        aria-label={`Remove ${movie.title}`}
                        onClick={() => removeMovie(movie.id)}
                        sx={{
                          border: "1px solid rgba(244, 67, 54, 0.5)",
                          "&:hover": {
                            backgroundColor: "rgba(244, 67, 54, 0.12)",
                          },
                        }}
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
