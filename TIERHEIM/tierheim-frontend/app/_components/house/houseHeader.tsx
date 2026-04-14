import React from "react";
import { Box, BoxProps, Typography, useTheme } from "@mui/material";
import { useUIConfig } from "@/util/useUIConfig";

interface HouseHeaderProps extends BoxProps {
  title: string;
  count: number;
  max: number;
}

export default function HouseHeader({
  title,
  count,
  max,
  sx,
  ...boxProps
}: HouseHeaderProps) {
  const theme = useTheme();
  const palette = theme.palette;
  const { isMobile } = useUIConfig();

  return (
    <Box
      id={"house-header-" + title}
      {...boxProps}
      sx={{
        display: "flex",
        width: "100%",
        boxSizing: "border-box",
        height: "45px",
        bgcolor: palette.primary.main,
        color: palette.primary.contrastText,
        px: 2.5,
        borderRadius: 10,
        justifyContent: "space-between",
        alignItems: "center",
        ...sx,
      }}
    >
      <Typography variant={isMobile ? "subtitle1" : "h6"}>{title}</Typography>

      <Box
        sx={{
          display: "flex",
          height: "28px",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: `inset 0 0 0 1px ${palette.navigation?.boxShadow}`,
        }}
      >
        <Box
          sx={{
            px: 1.5,
            backgroundColor: palette.animalFile?.bg2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: palette.navigation?.tabText, fontWeight: 500 }}
          >
            {count}
          </Typography>
        </Box>
        <Box
          sx={{
            px: 1.5,
            backgroundColor: palette.navigation?.bg2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: palette.animalFile?.tabBackground, fontWeight: 500 }}
          >
            {max}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
