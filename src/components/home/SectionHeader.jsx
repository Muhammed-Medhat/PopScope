import { Box, Stack, Typography } from "@mui/material";

export default function SectionHeader({ title, rightContent }) {
  return (
    <Stack direction="row" spacing={2} sx={{ mb: 3.5, alignItems: "center" }}>
      <Box
        sx={{
          width: 5,
          height: 32,
          borderRadius: 2,
          background: "linear-gradient(180deg, #e50914 0%, #8b0000 100%)",
          boxShadow: "0 0 16px rgba(229,9,20,0.5)",
        }}
      />
      <Typography
        variant="h4"
        fontWeight="900"
        sx={{
          fontSize: { xs: "1.4rem", md: "1.85rem" },
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </Typography>
      {rightContent && (
        <>
          <Box sx={{ flex: 1 }} />
          {rightContent}
        </>
      )}
    </Stack>
  );
}
