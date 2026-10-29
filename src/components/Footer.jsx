import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Typography,
  Stack,
  Divider,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import FavoriteIcon from "@mui/icons-material/Favorite";

const footerLinks = {
  Explore: [
    { label: "Home", to: "/" },
    { label: "Trending", to: "/" },
    { label: "Watchlist", to: "/watchlist" },
  ],
  Company: [
    { label: "About", to: "#" },
    { label: "Careers", to: "#" },
    { label: "Press", to: "#" },
  ],
  Support: [
    { label: "Help Center", to: "#" },
    { label: "Contact Us", to: "#" },
    { label: "Privacy Policy", to: "#" },
  ],
};

const socials = [
  { icon: <GitHubIcon fontSize="small" />, label: "GitHub" },
  { icon: <LinkedInIcon fontSize="small" />, label: "LinkedIn" },
  { icon: <TwitterIcon fontSize="small" />, label: "Twitter" },
  { icon: <InstagramIcon fontSize="small" />, label: "Instagram" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        color: "#fff",
        pt: { xs: 5, md: 7 },
        pb: 3,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 5 }}>
          {/* Brand column */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              component={Link}
              to="/"
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                textDecoration: "none",
                mb: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #e50914 0%, #8b0000 100%)",
                  boxShadow: "0 4px 16px rgba(229,9,20,0.5)",
                }}
              >
                <MovieFilterIcon sx={{ fontSize: 20, color: "#fff" }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 900,
                  fontSize: "1.35rem",
                  letterSpacing: 0.5,
                  background:
                    "linear-gradient(180deg, #ffffff 0%, #cfcfcf 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                PopScope
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{ color: "#888", lineHeight: 1.8, maxWidth: 320 }}
            >
              Discover trending movies, save your favorites, and never miss a
              trailer again. Your cinematic companion.
            </Typography>

            {/* Socials */}
            <Stack
              direction="row"
              spacing={1}
              sx={{ mt: 3, alignItems: "center" }}
            >
              {socials.map((social) => (
                <IconButton
                  key={social.label}
                  aria-label={social.label}
                  sx={{
                    color: "#9a9a9a",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backgroundColor: "rgba(255,255,255,0.03)",
                    transition: "all 0.25s ease",
                    "&:hover": {
                      color: "#fff",
                      backgroundColor: "rgba(229,9,20,0.15)",
                      borderColor: "rgba(229,9,20,0.5)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Links columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <Grid key={title} size={{ xs: 6, sm: 4, md: "auto" }}>
              <Typography
                variant="subtitle2"
                sx={{
                  color: "#fff",
                  fontWeight: 800,
                  letterSpacing: 1,
                  fontSize: 12,
                  textTransform: "uppercase",
                  mb: 2,
                }}
              >
                {title}
              </Typography>
              <Stack spacing={1.25}>
                {links.map((link) => (
                  <MuiLink
                    key={link.label}
                    component={Link}
                    to={link.to}
                    underline="none"
                    sx={{
                      color: "#9a9a9a",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      transition: "all 0.2s ease",
                      width: "fit-content",
                      "&:hover": {
                        color: "#e50914",
                        transform: "translateX(3px)",
                      },
                    }}
                  >
                    {link.label}
                  </MuiLink>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.08)" }} />

        {/* Bottom bar */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#666", letterSpacing: 0.3 }}
          >
            © {year} PopScope. All rights reserved.
          </Typography>

          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Typography variant="caption" sx={{ color: "#666" }}>
              Made with Muhammed
            </Typography>
            <FavoriteIcon sx={{ fontSize: 14, color: "#e50914" }} />
            <Typography variant="caption" sx={{ color: "#666" }}>
              using React & MUI & TMDB
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
