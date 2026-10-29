export const NO_POSTER =
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

export const IMG_BASE = "https://image.tmdb.org/t/p";
