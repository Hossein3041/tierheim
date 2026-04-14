"use client";

import React from "react";
import { Box, Skeleton, useTheme } from "@mui/material";
import { useUIConfig } from "@/util/useUIConfig";

export default function RoomPetHeaderSkeleton() {
  const theme = useTheme();
  const { isMobile } = useUIConfig();

  return (
    <Box
      sx={{
        mt: 2,
        px: 2,
        py: 1,
        mx: isMobile ? -2 : 0,
        borderTopLeftRadius: "25px",
        borderTopRightRadius: "25px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: theme.palette.petmodal.dialogTitleColor,
        bgcolor: theme.palette.petmodal.dialogSwitchCheckedTrackColorBlue,
        boxShadow: theme.shadows[1],
      }}
    >
      <Skeleton
        variant="text"
        animation="wave"
        sx={{ width: "35%", fontSize: "0.95rem" }}
      />
    </Box>
  );
}
