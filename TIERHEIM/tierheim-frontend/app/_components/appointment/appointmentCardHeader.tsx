"use client";

import { Box, Typography, useTheme, Skeleton } from "@mui/material";
import { useState } from "react";
import { useUIConfig } from "@/util/useUIConfig";

interface AppointmentCardHeaderProps {
  leftText: string;
  timeLabel: string;
  loading?: boolean;
  onClick?: () => void;
}

export default function AppointmentCardHeader({
  leftText,
  timeLabel,
  loading = false,
  onClick,
}: AppointmentCardHeaderProps) {
  const theme = useTheme();
  const palette = theme.palette;

  return (
    <Box
      onClick={onClick}
      sx={{
        px: 2.5,
        py: 1.75,
        boxSizing: "border-box",
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
      }}
    >
      {loading ? (
        <Skeleton variant="text" animation="wave" width={180} height={24} />
      ) : (
        <Typography variant="subtitle2">{leftText}</Typography>
      )}

      {loading ? (
        <Skeleton variant="text" animation="wave" width={52} height={20} />
      ) : (
        <Typography
          variant="body2"
          sx={{
            color: palette.appointmentcard.labelOrNotesColro,
            fontWeight: 500,
          }}
        >
          {timeLabel}
        </Typography>
      )}
    </Box>
  );
}
