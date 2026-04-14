"use client";

import React from "react";
import { Box, Divider, Paper, Skeleton, useTheme } from "@mui/material";
import { useUIConfig } from "@/util/useUIConfig";

export default function RoomOverviewSkeleton() {
  const theme = useTheme();
  const { isMobile, isTablet, isTabletVertical, isTabletHorizontal } =
    useUIConfig();
  const imageSize = isMobile || isTablet ? 50 : 70;

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 6,
        overflow: "hidden",
        backgroundColor:
          theme.palette.animalFile?.tabBackground ??
          theme.palette.background.paper,
        width: 360,
        flex: "0 0 360px",
        maxWidth: 360,
        flexShrink: 0,
        boxShadow: theme.shadows[2],
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: isMobile ? 2 : 2.5,
          py: 1.25,
          bgcolor:
            theme.palette.inputfields?.inputTitleFieldColor ??
            theme.palette.background.default,
        }}
      >
        <Skeleton
          variant="text"
          animation="wave"
          sx={{ width: "55%", fontSize: "1rem" }}
        />
        <Skeleton
          variant="rounded"
          animation="wave"
          width={72}
          height={22}
          sx={{ borderRadius: 11 }}
        />
      </Box>

      <Box
        sx={{
          pl: isMobile ? 2 : 2.5,
          pr: isMobile ? 2 : 2.5,
          pt: 2,
          pb: 3,
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(50px, 1fr))",
          justifyItems: "center",
          rowGap: 2.5,
          columnGap: isMobile ? 1.5 : isTablet ? 1 : 3,
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            variant="circular"
            animation="wave"
            width={imageSize}
            height={imageSize}
            sx={{
              borderRadius: "35%",
            }}
          />
        ))}
      </Box>
    </Paper>
  );
}
