import { Box, Container, Skeleton } from "@mui/material";

export default function HomeHeroSkeleton() {
  return (
    <Container maxWidth="lg" sx={{ zIndex: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 5,
        }}
      >
        <Box sx={{ flex: 1, width: "100%" }}>
          <Skeleton
            variant="text"
            width="70%"
            height={60}
            sx={{ bgcolor: "#2a2a2a", borderRadius: 1 }}
          />
          <Skeleton
            variant="rectangular"
            width={140}
            height={32}
            sx={{ bgcolor: "#2a2a2a", my: 2, borderRadius: 999 }}
          />
          <Skeleton
            variant="text"
            width="100%"
            height={20}
            sx={{ bgcolor: "#2a2a2a" }}
          />
          <Skeleton
            variant="text"
            width="90%"
            height={20}
            sx={{ bgcolor: "#2a2a2a" }}
          />
          <Skeleton
            variant="text"
            width="60%"
            height={20}
            sx={{ bgcolor: "#2a2a2a" }}
          />
          <Skeleton
            variant="rectangular"
            width={160}
            height={44}
            sx={{ bgcolor: "#2a2a2a", mt: 3, borderRadius: 999 }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Skeleton
            variant="rectangular"
            width={220}
            height={320}
            sx={{ bgcolor: "#2a2a2a", borderRadius: "16px" }}
          />
        </Box>
      </Box>
    </Container>
  );
}
