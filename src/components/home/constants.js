export const IMG_BASE = "https://image.tmdb.org/t/p";

export const NO_POSTER_IMG =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="185" height="278" viewBox="0 0 185 278">
      <rect width="185" height="278" fill="#2a2a2a"/>
      <text x="50%" y="50%" font-size="14" fill="#888" text-anchor="middle" dy=".3em">No Image</text>
    </svg>
  `);
