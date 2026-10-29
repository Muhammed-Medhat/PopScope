import { Box, Stack, Typography } from "@mui/material";
import { TEXT_PRIMARY, TEXT_SECONDARY } from "./constants";

export default function DetailSectionHeader({ title, count, countLabel }) {
  return (
    <Stack direction="row" spacing={2} sx={{ mb: 3, alignItems: "center" }}>
      <Box
        sx={{
          width: 4,
          height: 28,
          borderRadius: 1,
          background: "linear-gradient(180deg, #e50914 0%, #8b0000 100%)",
          boxShadow: "0 0 16px rgba(229,9,20,0.6)",
        }}
      />
      <Typography
        variant="h5"
        fontWeight="900"
        sx={{
          fontSize: { xs: "1.25rem", md: "1.5rem" },
          color: TEXT_PRIMARY,
        }}
      >
        {title}
      </Typography>
      {count > 0 && (
        <>
          <Box sx={{ flex: 1 }} />
          <Typography
            variant="caption"
            sx={{
              color: TEXT_SECONDARY,
              fontWeight: 700,
              letterSpacing: 1.5,
              fontSize: 11,
            }}
          >
            {count} {countLabel}
          </Typography>
        </>
      )}
    </Stack>
  );
}
