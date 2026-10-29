import { Box } from "@mui/material";
import { ACCENT } from "./constants";
import DetailSectionHeader from "./DetailSectionHeader";
import CastCard from "./CastCard";

export default function CastSection({ cast }) {
  if (!cast.length) return null;

  return (
    <Box sx={{ mt: 8 }}>
      <DetailSectionHeader
        title="Top Cast"
        count={cast.length}
        countLabel="ACTORS"
      />

      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 2,
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": { height: 6 },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "rgba(255,255,255,0.03)",
            borderRadius: 3,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "rgba(229,9,20,0.5)",
            borderRadius: 3,
            "&:hover": { backgroundColor: ACCENT },
          },
        }}
      >
        {cast.map((actor) => (
          <CastCard key={actor.id} actor={actor} />
        ))}
      </Box>
    </Box>
  );
}
