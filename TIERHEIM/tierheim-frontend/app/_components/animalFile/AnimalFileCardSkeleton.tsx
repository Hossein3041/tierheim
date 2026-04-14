"use client";

import React from "react";
import {
  Box,
  Chip,
  Divider,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useUIConfig } from "@/util/useUIConfig";

export default function AnimalFileCardSkeleton() {
  const theme = useTheme();
  const {
    isMobile,
    isTablet,
    isTabletVertical,
    isTabletHorizontal,
    isDesktop,
  } = useUIConfig();

  const cardWidth = isMobile ? 155 : isTablet ? 210 : 300;
  const cardHeight = isMobile ? 100 : isTablet ? 145 : 160;
  const avatarSize = isMobile ? 50 : 70;

  return (
    <Paper
      elevation={1}
      sx={{
        width: cardWidth,
        height: cardHeight,
        borderRadius: "0 0 24px 24px",
        position: "relative",
        pb: 1.5,
        px: isMobile ? 0.75 : 2,
        backgroundColor: theme.palette.animalFile.tabActiveText,
        overflow: "visible",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -60,
          left: 0,
          width: "100%",
          height: 60,
          zIndex: 1,
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: isMobile ? 100 : isTablet ? 150 : 170,
            height: 52,
            backgroundColor: theme.palette.animalFile.tabBackground,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: 25,
              right: -20.6,
              width: 22,
              height: 22,
              borderRadius: "50%",
              backgroundColor: theme.palette.common.white,
              zIndex: 2,
            }}
          />
          <Box
            sx={{
              position: "absolute",
              bottom: 25,
              right: -20,
              width: 22,
              height: 11,
              backgroundColor: theme.palette.animalFile.tabBackground,
              borderBottomRightRadius: 10,
              zIndex: 1,
            }}
          />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            height: 25,
            backgroundColor: theme.palette.animalFile.tabBackground,
            borderTopRightRadius: 12,
          }}
        />
      </Box>

      <Box
        sx={{
          position: "absolute",
          top: `calc(0px - ${Math.round(avatarSize * 0.45)}px)`,
          left: 20,
          width: avatarSize,
          height: avatarSize,
          zIndex: 3,
        }}
      >
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={avatarSize}
          height={avatarSize}
          sx={{
            borderRadius: "35%",
            border: `2px solid ${theme.palette.animalFile.tabActiveText}`,
            boxShadow: 1,
            bgcolor: theme.palette.animalImage.animalImageBackgroundColor,
          }}
        />
      </Box>

      <Box
        sx={{
          mt: isMobile ? 0 : isTablet ? 3 : 4,
          ml: 2,
          pt: isMobile ? 4 : isTablet ? 6 : 7,
        }}
      >
        <Skeleton
          variant="text"
          animation="wave"
          sx={{ width: isMobile ? "70%" : "40%" }}
        />
        <Skeleton
          variant="text"
          animation="wave"
          sx={{ width: isMobile ? "55%" : "60%" }}
        />
      </Box>

      <Divider
        sx={{
          mt: isMobile ? 0.5 : isTablet ? 1.75 : 2.5,
          mb: { xs: 0.1, sm: 1.5 },
          mx: { xs: 0.1, sm: 0.5 },
        }}
      />

      {isMobile ? (
        <Box
          sx={{
            mt: 0.75,
            px: 1.5,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Skeleton
            variant="rounded"
            animation="wave"
            height={15}
            sx={{ width: "100%", borderRadius: 11 }}
          />
        </Box>
      ) : (
        <Box
          sx={{
            ml: 1,
            mt: 1.5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Skeleton variant="text" animation="wave" sx={{ width: 24 }} />
          <Skeleton
            variant="rounded"
            animation="wave"
            height={22}
            sx={{ width: 100, borderRadius: 11 }}
          />
        </Box>
      )}
    </Paper>
  );
}
