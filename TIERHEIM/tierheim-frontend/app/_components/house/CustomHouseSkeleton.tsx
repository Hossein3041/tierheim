"use client";

import React from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { useUIConfig } from "@/util/useUIConfig";
import HouseHeaderSkeleton from "@/components/house/HouseHeaderSkeleton";
import RoomOverviewSkeleton from "@/components/room/RoomOverviewSkeleton";

export default function CustomHouseSkeleton() {
  const {
    isMobile,
    isTabletVertical,
    isTabletHorizontal,
    isTablet,
    isDesktop,
  } = useUIConfig();

  const count = isMobile
    ? 3
    : isTabletVertical
      ? 2
      : isTabletHorizontal
        ? 3
        : 4;

  const roomStyles: SxProps<Theme> = isMobile
    ? {
        mt: 2,
        pb: 3,
        display: "flex",
        flexWrap: "nowrap",
        overflowX: "auto",
        columnGap: 3,
        scrollSnapType: "x mandatory",
        "& > div": {
          scrollSnapAlign: "start",
          flex: "0 0 85%",
          maxWidth: "85%",
          flexShrink: 0,
        },
      }
    : isTabletVertical
      ? {
          mt: 2,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "stretch",
          gap: 4,
          "& > div": {
            flex: "0 0 47.1%",
            maxWidth: "47.1%",
            flexShrink: 0,
          },
        }
      : isTabletHorizontal
        ? {
            mt: 2,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "stretch",
            gap: 4,
            "& > div": {
              flex: "0 0 31.04121%",
              maxWidth: "31.04121%",
              flexShrink: 0,
            },
          }
        : {
            pt: "20px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "stretch",
            alignContent: "stretch",
            gap: 4,
            "& > div": {
              flex: "0 0 360px",
              maxWidth: 360,
              flexShrink: 0,
            },
          };

  return (
    <Box sx={{ width: "100%", px: isMobile ? 1 : 3, boxSizing: "border-box" }}>
      <HouseHeaderSkeleton />
      <Box sx={[roomStyles]}>
        {Array.from({ length: count }).map((_, i) => (
          <RoomOverviewSkeleton key={i} />
        ))}
      </Box>
    </Box>
  );
}
