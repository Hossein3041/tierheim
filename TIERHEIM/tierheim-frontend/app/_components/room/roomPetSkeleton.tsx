"use client";

import React from "react";
import { Box, Divider, Skeleton, useTheme } from "@mui/material";
import { useUIConfig } from "@/util/useUIConfig";

interface RoomPetSkeletonProps {
  withHeader?: boolean;
}

export default function RoomPetSkeleton({
  withHeader = true,
}: RoomPetSkeletonProps) {
  const theme = useTheme();
  const { isMobile } = useUIConfig();

  const backgroundWhite = theme.palette.petmodal.roomPetDetailsBackgroundWhite;
  const rowHeight = isMobile ? 60 : 72;

  return (
    <React.Fragment>
      <Box
        sx={{
          minHeight: rowHeight,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          pt: 1,
          pb: 1,
          mx: isMobile ? -2 : 0,
          backgroundColor: backgroundWhite,
          borderTopLeftRadius: withHeader ? 0 : "25px",
          borderTopRightRadius: withHeader ? 0 : "25px",
          borderBottomLeftRadius: "25px",
          borderBottomRightRadius: "25px",
          boxShadow: theme.shadows[1],
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1.5,
            ml: 2,
            minWidth: 0,
            width: 200,
          }}
        >
          <Skeleton
            variant="circular"
            animation="wave"
            width={50}
            height={50}
          />
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Skeleton variant="text" animation="wave" sx={{ width: "70%" }} />
            <Skeleton variant="text" animation="wave" sx={{ width: "95%" }} />
          </Box>
        </Box>

        <Divider
          orientation="vertical"
          flexItem
          sx={{
            mx: 1,
            my: 1.9,
            bgcolor: theme.palette.petmodal.dialogVerticalDivLineColor,
            height: "2.5rem",
          }}
        />

        {!isMobile && (
          <>
            <Box
              sx={{
                width: 160,
                px: 2,
                flexShrink: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Skeleton variant="text" animation="wave" sx={{ width: "80%" }} />
              <Skeleton
                variant="text"
                animation="wave"
                sx={{ width: "100%", mt: 0.5 }}
              />
            </Box>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                mx: 1,
                my: 1.9,
                bgcolor: theme.palette.petmodal.dialogVerticalDivLineColor,
                height: "2.5rem",
              }}
            />
          </>
        )}

        <Box sx={{ mr: isMobile ? 2 : 3 }}>
          <Skeleton
            variant="rounded"
            animation="wave"
            width={isMobile ? 85 : 120}
            height={isMobile ? 37 : 40}
            sx={{ borderRadius: "25px" }}
          />
        </Box>
      </Box>
    </React.Fragment>
  );
}
