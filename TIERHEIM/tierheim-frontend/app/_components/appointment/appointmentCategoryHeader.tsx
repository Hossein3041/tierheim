"use client";

import React from "react";
import {
  Box,
  BoxProps,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useUIConfig } from "@/util/useUIConfig";

interface AppointmentCategoryHeaderProps extends BoxProps {
  title: string;
  count: number;
  isLoading?: boolean;
}

export default function AppointmentCategoryHeader({
  title,
  count,
  sx,
  isLoading,
}: AppointmentCategoryHeaderProps) {
  const theme = useTheme();
  const palette = theme.palette;

  return (
    <Box
      sx={{
        display: "flex",
        boxSizing: "border-box",
        height: "45px",
        bgcolor: palette.navigation.tabActive,
        color: palette.navigation.tabActive,
        px: 2.5,
        borderRadius: 10,
        justifyContent: "space-between",
        alignItems: "center",
        ...sx,
      }}
    >
      <Typography variant={"body1"}>
        {isLoading ? (
          <Skeleton variant="text" animation="wave" sx={{ width: "200px" }} />
        ) : (
          title
        )}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: 28,
          px: 2.2,
          borderRadius: "16px",
          bgcolor:
            palette.appointmentcard.appointmentCardHeaderCountBackgroundColor,
          boxShadow: `inset 0 0 0 1px ${palette.navigation?.boxShadow}`,
        }}
      >
        <Typography
          variant="body1"
          sx={{ color: palette.navigation.tabActive, fontWeight: 600 }}
        >
          {isLoading ? (
            <Skeleton variant="text" animation="wave" sx={{ width: "10px" }} />
          ) : (
            count
          )}
        </Typography>
      </Box>
    </Box>
  );
}
