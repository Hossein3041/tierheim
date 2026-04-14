"use client";

import React from "react";
import { Box, Skeleton, useTheme } from "@mui/material";
import { useUIConfig } from "@/util/useUIConfig";

type Props = { className?: string };

export default function HouseHeaderSkeleton({ className }: Props) {
  const theme = useTheme();
  const { isMobile } = useUIConfig();

  return (
    <Box
      className={className}
      sx={{
        width: "100%",
        boxSizing: "border-box",
        height: "45px",
        marginLeft: "auto",
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        px: isMobile ? 2 : 4.5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 10,
        boxShadow: theme.shadows[1],
      }}
    >
      <Skeleton
        variant="text"
        animation="wave"
        sx={{
          width: "35%",
          fontSize: "1rem",
          bgcolor: "rgba(255,255,255,0.35)",
        }}
      />

      <Skeleton
        variant="rounded"
        animation="wave"
        width={100}
        height={22}
        sx={{ borderRadius: 11, bgcolor: "rgba(255,255,255,0.35)" }}
      />
    </Box>
  );
}
