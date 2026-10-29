import { Box, Skeleton } from "@mui/material";

export default function MovieCardSkeleton() {
  return (
    <Box
      sx={{
        position: "relative",
        aspectRatio: "2 / 3",
        borderRadius: "14px",
        overflow: "hidden",
        backgroundColor: "#1a1a1a",
        boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
      }}
    >
      <Skeleton
        variant="rectangular"
        animation="wave"
        width="100%"
        height="100%"
        sx={{ bgcolor: "#262626" }}
      />
      <Skeleton
        variant="rounded"
        animation="wave"
        width={44}
        height={22}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          bgcolor: "#333",
          borderRadius: "8px",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          p: 1.75,
          background:
            "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
        }}
      >
        <Skeleton
          variant="text"
          animation="wave"
          width="80%"
          height={20}
          sx={{ bgcolor: "#3a3a3a" }}
        />
        <Skeleton
          variant="text"
          animation="wave"
          width="35%"
          height={16}
          sx={{ bgcolor: "#3a3a3a" }}
        />
      </Box>
    </Box>
  );
}
