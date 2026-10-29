import { Box } from "@mui/material";
import { BG_SECONDARY } from "./constants";
import DetailSectionHeader from "./DetailSectionHeader";

export default function TrailerSection({ trailerKey }) {
  return (
    <Box id="trailer-section" sx={{ mt: 8 }}>
      <DetailSectionHeader title="Official Trailer" />

      <Box
        sx={{
          position: "relative",
          paddingBottom: "56.25%",
          height: 0,
          overflow: "hidden",
          borderRadius: "24px",
          backgroundColor: BG_SECONDARY,
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: `
            0 40px 80px rgba(0,0,0,0.6),
            0 0 0 1px rgba(229,9,20,0.15),
            0 0 80px rgba(229,9,20,0.1)
          `,
        }}
      >
        <iframe
          style={{
            position: "absolute",
            top: 0,
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
  );
}
