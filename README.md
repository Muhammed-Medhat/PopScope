# 🍿 PopScope

A responsive movie discovery web app built with React. Browse trending movies, search with live suggestions, explore full movie details with cast and trailers, and keep a personal watchlist that persists between visits.

**🔗 Live Demo:** [popscope.vercel.app](https://popscope.vercel.app/)

## ✨ Features

- 🎞️ **Hero showcase**: an auto-playing Swiper coverflow carousel of trending movies, with a dynamic backdrop and overview that follow the active slide
- 📈 **Trending This Week** grid with hover overlays showing title, year, and rating
- 📄 **Pagination** synced with the URL (`?page=2`), so pages can be shared and bookmarked
- 🔍 **Live search** with autocomplete: debounced requests, request cancellation with `AbortController`, loading indicator, and an error state with a Retry button
- 🎬 **Movie details**: poster, rating, runtime, genres, overview, top cast, and an embedded official YouTube trailer
- ⭐ **Watchlist**: add and remove movies, with data saved in `localStorage` so it survives page refreshes
- 💀 **Skeleton loaders** while data is loading
- ⚠️ **Error handling** with friendly messages and retry buttons across pages
- 🚫 Custom **404 page**
- 📱 **Fully responsive**

## 🛠️ Built With

- [React 19](https://react.dev/)
- [React Router 7](https://reactrouter.com/) (`react-router-dom`)
- [Material UI 9](https://mui.com/)
- [Swiper 14](https://swiperjs.com/)
- [Axios](https://axios-http.com/)
- [TMDB API](https://developer.themoviedb.org/docs)
- Create React App (`react-scripts`)
- Context API + `useReducer` for watchlist state management

## 🚀 Getting Started

1. Clone the repo

```bash
   git clone https://github.com/Muhammed-Medhat/PopScope.git
   cd PopScope
```

2. Install dependencies

```bash
   npm install
```

3. Get a free API key from [TMDB](https://www.themoviedb.org/settings/api) and create a `.env` file in the project root:

```
   REACT_APP_TMDB_API_KEY=your_api_key_here
```

4. Start the app

```bash
   npm start
```

## 📁 Project Structure

The project is organized by feature: each page has its own folder of focused, reusable components, shared constants live next to the feature that uses them, and all network calls go through a single centralized service layer.

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── SearchBar.jsx
│   ├── Footer.jsx
│   ├── ScrollToTop.jsx
│   │
│   ├── home/
│   │   ├── constants.js              # IMG_BASE, placeholder image
│   │   ├── HomeHero.jsx              # Hero section (backdrop + info)
│   │   ├── HomeHeroSkeleton.jsx      # Loading state for hero
│   │   ├── HeroSwiper.jsx            # Coverflow carousel
│   │   ├── TrendingSection.jsx       # Grid + pagination
│   │   ├── MovieCard.jsx             # Reusable movie card
│   │   ├── MovieCardSkeleton.jsx     # Loading state for card
│   │   ├── SectionHeader.jsx         # Section title with accent bar
│   │   └── HomeErrorState.jsx        # Error UI with retry
│   │
│   ├── movie-details/
│   │   ├── constants.js              # Color palette, placeholders
│   │   ├── DetailSectionHeader.jsx   # Reusable section header
│   │   ├── MoviePosterSection.jsx    # Poster + CTA buttons
│   │   ├── MovieInfoPanel.jsx        # Title, meta bar, overview
│   │   ├── CastCard.jsx              # Reusable cast card
│   │   ├── CastSection.jsx           # Horizontal cast scroller
│   │   └── TrailerSection.jsx        # Embedded YouTube trailer
│   │
│   └── watchlist/
│       ├── constants.js              # Placeholder image
│       ├── WatchlistHeader.jsx       # Title + counter
│       ├── EmptyWatchlist.jsx        # Reusable empty state
│       └── WatchlistCard.jsx         # Reusable watchlist card
│
├── contexts/
│   └── WatchListContext.jsx          # Provider + hook
│
├── reducers/
│   └── watchListReducer.js           # add / remove actions
│
├── services/
│   ├── axiosInstance.js              # Configured axios client
│   └── modules/
│       └── tmdb.service.js           # All TMDB endpoints
│
├── pages/
│   ├── Home.jsx                      # Orchestration + state
│   ├── MovieDetails.jsx              # Orchestration + state
│   ├── WatchList.jsx                 # Orchestration + state
│   └── NotFound.jsx                  # Custom 404
│
├── App.js
├── index.js
```

## 🧱 Architecture Highlights

- **Feature-based structure**: every page owns its components, constants, and skeletons under `components/<feature>/`, making each feature self-contained and easy to locate.
- **Centralized API layer**: every network call goes through `services/modules/tmdb.service.js`, which groups endpoints by concern (trending, details, videos, search). Swapping or mocking the API in the future touches one file only.
- **Reusable UI pieces**: components like `MovieCard`, `WatchlistCard`, `EmptyWatchlist`, `DetailSectionHeader`, and `SectionHeader` are shared across pages, keeping the visual language consistent and reducing duplication.
- **Predictable page files**: each page (`Home`, `MovieDetails`, `WatchList`) is now a thin orchestration layer — state, effects, and layout only. Rendering is delegated to focused components.
- **Isolated constants**: colors, placeholder images, and shared literals live in per-feature `constants.js` files, so a theme tweak happens in one place per feature.

## 📝 Refactor Notes

The project recently went through a structural refactor that **did not change any behavior, API calls, state, or hooks logic**:

- Reorganized all TMDB endpoints into `services/modules/tmdb.service.js`
- Split the previously large page files (`Home`, `MovieDetails`, `WatchList`) into focused, reusable components
- Extracted per-feature `constants.js` files
- Kept axios configuration, request/response contracts, and every UI behavior identical

If you're comparing against an earlier version of this repo, expect to see file moves and component splits — but the app should behave exactly the same.

## 📸 Screenshots

### Home

![Home page](screenshots/moviesLarge.png)

### Movie Details

![Movie details](screenshots/movieDetails.png)

### Mobile Responsive

<img src="screenshots/moviesmobile.png" alt="Mobile" width="300" />

## 📄 Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB.
