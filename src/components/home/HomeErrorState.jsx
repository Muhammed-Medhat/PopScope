import { Box, Button, Typography } from "@mui/material";
import ErrorOutlinedIcon from "@mui/icons-material/ErrorOutlined";
import RefreshIcon from "@mui/icons-material/Refresh";

export default function HomeErrorState({ error, onRetry }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #1f1f1f 0%, #0d0d0d 70%)",
        color: "#fff",
        textAlign: "center",
        px: 2,
      }}
    >
      <Box
        sx={{
          p: 3,
          borderRadius: "50%",
          backgroundColor: "rgba(229, 9, 20, 0.1)",
          border: "1px solid rgba(229, 9, 20, 0.3)",
          mb: 3,
          display: "flex",
        }}
      >
        <ErrorOutlinedIcon sx={{ fontSize: 72, color: "#e50914" }} />
      </Box>
      <Typography variant="h4" fontWeight="800" gutterBottom>
        Oops! Something went wrong
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: "#9a9a9a", mb: 4, maxWidth: 480, lineHeight: 1.7 }}
      >
        {error}
      </Typography>
      <Button
        variant="contained"
        color="error"
        startIcon={<RefreshIcon />}
        onClick={onRetry}
        sx={{
          borderRadius: "999px",
          px: 4,
          py: 1.2,
          textTransform: "none",
          fontSize: "1rem",
          fontWeight: "bold",
          boxShadow: "0 8px 24px rgba(229,9,20,0.35)",
          "&:hover": { boxShadow: "0 12px 28px rgba(229,9,20,0.5)" },
        }}
      >
        Try Again
      </Button>
    </Box>
  );
}
