import { Box, Container, Grid } from "@mui/material";
import { useWatchList } from "../contexts/WatchListContext";
import { useNavigate } from "react-router-dom";

import WatchlistHeader from "../components/watchlist/WatchlistHeader";
import EmptyWatchlist from "../components/watchlist/EmptyWatchlist";
import WatchlistCard from "../components/watchlist/WatchlistCard";

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
        backgroundColor: "#0d0d0d",
        color: "#fff",
        py: { xs: 4, md: 6 },
      }}
    >
      <Container maxWidth="lg">
        <WatchlistHeader count={watches.length} />

        {watches.length === 0 ? (
          <EmptyWatchlist onBrowse={() => navigate("/")} />
        ) : (
          <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
            {watches.map((movie) => (
              <Grid key={movie.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <WatchlistCard movie={movie} onRemove={removeMovie} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
