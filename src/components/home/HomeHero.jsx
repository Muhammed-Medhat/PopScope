import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { keyframes } from "@mui/material/styles";
import StarIcon from "@mui/icons-material/Star";
import InfoIcon from "@mui/icons-material/Info";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { IMG_BASE } from "./constants";
import HomeHeroSkeleton from "./HomeHeroSkeleton";
import HeroSwiper from "./HeroSwiper";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

export default function HomeHero({
  loading,
  activeMovie,
  sliderMovies,
  hasSlid,
  page,
  onSlideChange,
}) {
  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "88vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        pt: { xs: 10, md: 8 },
        pb: { xs: 6, md: 4 },
        mb: { xs: 4, md: 6 },
      }}
    >
      {loading ? (
        <HomeHeroSkeleton />
      ) : (
        <>
          {/* Backdrop */}
          {activeMovie?.backdrop_path && (
            <Box
              key={activeMovie.id}
              component="img"
              src={`${IMG_BASE}/w1280${activeMovie.backdrop_path}`}
              srcSet={`${IMG_BASE}/w780${activeMovie.backdrop_path} 780w, ${IMG_BASE}/w1280${activeMovie.backdrop_path} 1280w`}
              sizes="100vw"
              alt=""
              fetchPriority="high"
              decoding="async"
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                pointerEvents: "none",
                zIndex: 0,
                transform: "scale(1.05)",
                filter: "brightness(0.75)",
                animation: hasSlid ? `${fadeIn} 0.9s ease-in-out` : "none",
              }}
            />
          )}

          {/* Gradient overlay */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              background: `
                linear-gradient(to bottom, rgba(13,13,13,0.55) 0%, rgba(13,13,13,0.15) 35%, rgba(13,13,13,0.95) 100%),
                linear-gradient(to right, rgba(13,13,13,0.85) 0%, transparent 55%)
              `,
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                gap: { xs: 5, md: 6 },
              }}
            >
              {/* Left content */}
              <Box sx={{ flex: 1.15, width: "100%" }}>
                {activeMovie && (
                  <Box
                    key={activeMovie.id}
                    sx={{ animation: `${slideUp} 0.6s ease-out` }}
                  >
                    {/* Tag row */}
                    <Stack
                      direction="row"
                      spacing={1.5}
                      sx={{ mb: 2, alignItems: "center" }}
                    >
                      <Chip
                        icon={
                          <WhatshotIcon
                            style={{ color: "#e50914", fontSize: 18 }}
                          />
                        }
                        label="TRENDING"
                        size="small"
                        sx={{
                          backgroundColor: "rgba(229,9,20,0.15)",
                          color: "#ff6b6b",
                          border: "1px solid rgba(229,9,20,0.4)",
                          fontWeight: 700,
                          letterSpacing: 1,
                          fontSize: 11,
                        }}
                      />
                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ borderColor: "rgba(255,255,255,0.2)" }}
                      />
                      <Typography
                        variant="caption"
                        sx={{
                          color: "#bdbdbd",
                          letterSpacing: 1,
                          fontWeight: 600,
                        }}
                      >
                        {activeMovie.release_date?.split("-")[0] || "—"}
                      </Typography>
                    </Stack>

                    {/* Title */}
                    <Typography
                      variant="h2"
                      fontWeight="900"
                      gutterBottom
                      sx={{
                        fontSize: { xs: "2rem", md: "3.4rem" },
                        lineHeight: 1.05,
                        letterSpacing: "-0.02em",
                        textShadow: "0 4px 24px rgba(0,0,0,0.9)",
                        background:
                          "linear-gradient(180deg, #ffffff 0%, #cfcfcf 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        mb: 2,
                      }}
                    >
                      {activeMovie.title}
                    </Typography>

                    {/* Rating + Info chips */}
                    <Stack
                      direction="row"
                      spacing={1.5}
                      sx={{
                        mb: 2.5,
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 1,
                      }}
                    >
                      <Chip
                        icon={<StarIcon style={{ color: "#FFD700" }} />}
                        label={`${activeMovie.vote_average?.toFixed(1)} / 10`}
                        sx={{
                          backgroundColor: "rgba(255,255,255,0.08)",
                          color: "#fff",
                          border: "1px solid rgba(255,255,255,0.15)",
                          fontWeight: 700,
                          backdropFilter: "blur(8px)",
                        }}
                      />
                      <Chip
                        label="HD"
                        size="small"
                        sx={{
                          backgroundColor: "rgba(255,255,255,0.08)",
                          color: "#ddd",
                          border: "1px solid rgba(255,255,255,0.15)",
                          fontWeight: 600,
                          fontSize: 11,
                        }}
                      />
                    </Stack>

                    {/* Overview */}
                    <Typography
                      variant="body1"
                      sx={{
                        color: "#c9c9c9",
                        mb: 3.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        lineHeight: 1.75,
                        maxWidth: 560,
                        textShadow: "0 2px 8px rgba(0,0,0,0.7)",
                      }}
                    >
                      {activeMovie.overview || "No description available."}
                    </Typography>

                    {/* Actions */}
                    <Stack
                      direction="row"
                      spacing={2}
                      useFlexGap
                      sx={{ flexWrap: "wrap" }}
                    >
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<PlayArrowIcon />}
                        component={Link}
                        to={`/movie/${activeMovie.id}`}
                        sx={{
                          borderRadius: "999px",
                          textTransform: "none",
                          px: 3.5,
                          py: 1.2,
                          fontWeight: 700,
                          fontSize: "0.95rem",
                          boxShadow: "0 8px 24px rgba(229,9,20,0.4)",
                          transition: "all 0.25s ease",
                          "&:hover": {
                            boxShadow: "0 12px 32px rgba(229,9,20,0.55)",
                            transform: "translateY(-1px)",
                          },
                        }}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<InfoIcon />}
                        component={Link}
                        to={`/movie/${activeMovie.id}`}
                        sx={{
                          borderRadius: "999px",
                          textTransform: "none",
                          px: 3,
                          py: 1.2,
                          fontWeight: 600,
                          fontSize: "0.95rem",
                          color: "#fff",
                          borderColor: "rgba(255,255,255,0.3)",
                          backdropFilter: "blur(8px)",
                          backgroundColor: "rgba(255,255,255,0.05)",
                          "&:hover": {
                            borderColor: "#fff",
                            backgroundColor: "rgba(255,255,255,0.12)",
                          },
                        }}
                      >
                        More Info
                      </Button>
                    </Stack>
                  </Box>
                )}
              </Box>

              {/* Right: Swiper */}
              <Box
                sx={{
                  flex: 1,
                  width: "100%",
                  maxWidth: "520px",
                  position: "relative",
                }}
              >
                <HeroSwiper
                  movies={sliderMovies}
                  page={page}
                  onSlideChange={onSlideChange}
                />
              </Box>
            </Box>
          </Container>
        </>
      )}
    </Box>
  );
}
