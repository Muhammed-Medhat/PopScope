import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import MovieDetails from "./pages/MovieDetails";
import WatchListProvider from "./contexts/WatchListContext";
import WatchList from "./pages/WatchList";
import ScrollToTop from "./components/ScrollToTop";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <WatchListProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </WatchListProvider>
  );
}

export default App;
