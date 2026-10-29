export const ACCENT = "#e50914";
export const ACCENT_HOVER = "#ff1a26";
export const BG_PRIMARY = "#0d0d0d";
export const BG_SECONDARY = "#1a1a1a";
export const TEXT_PRIMARY = "#ffffff";
export const TEXT_SECONDARY = "#9a9a9a";

export const IMG_BASE = "https://image.tmdb.org/t/p";

export const NO_POSTER =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="500" height="750" viewBox="0 0 500 750">
      <rect width="500" height="750" fill="#1a1a1a"/>
      <text x="50%" y="50%" font-size="28" fill="#888" text-anchor="middle" dy=".3em">No Poster</text>
    </svg>
  `);

export const NO_ACTOR_IMG =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="185" height="278" viewBox="0 0 185 278">
      <rect width="185" height="278" fill="#1a1a1a"/>
      <text x="50%" y="50%" font-size="14" fill="#888" text-anchor="middle" dy=".3em">No Image</text>
    </svg>
  `);
