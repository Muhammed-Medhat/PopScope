import { Box, CardMedia, Typography } from "@mui/material";
import {
  BG_SECONDARY,
  IMG_BASE,
  NO_ACTOR_IMG,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
} from "./constants";

export default function CastCard({ actor }) {
  return (
    <Box
      sx={{
        flex: "0 0 auto",
        width: { xs: 130, md: 150 },
        scrollSnapAlign: "start",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: BG_SECONDARY,
        border: "1px solid rgba(255,255,255,0.06)",
        transition: "all 0.35s cubic-bezier(0.2,0.8,0.2,1)",
        "&:hover": {
          transform: "translateY(-6px)",
          borderColor: "rgba(229,9,20,0.5)",
          boxShadow:
            "0 20px 40px rgba(0,0,0,0.6), 0 0 20px rgba(229,9,20,0.25)",
          "& .actor-img": { transform: "scale(1.1)" },
        },
      }}
    >
      <Box sx={{ overflow: "hidden", position: "relative" }}>
        <CardMedia
          className="actor-img"
          component="img"
          image={
            actor.profile_path
              ? `${IMG_BASE}/w185${actor.profile_path}`
              : NO_ACTOR_IMG
          }
          alt={actor.name}
          sx={{
            height: 200,
            objectFit: "cover",
            transition: "transform 0.5s cubic-bezier(0.2,0.8,0.2,1)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(13,13,13,0.9) 0%, transparent 50%)",
            pointerEvents: "none",
          }}
        />
      </Box>
      <Box sx={{ p: 1.5 }}>
        <Typography
          variant="subtitle2"
          fontWeight={800}
          noWrap
          sx={{ fontSize: "0.85rem", color: TEXT_PRIMARY }}
        >
          {actor.name}
        </Typography>
        <Typography
          variant="caption"
          noWrap
          display="block"
          sx={{ color: TEXT_SECONDARY, fontSize: "0.72rem" }}
        >
          {actor.character}
        </Typography>
      </Box>
    </Box>
  );
}
