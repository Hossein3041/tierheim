"use client";

import * as React from "react";
import { Box, Divider, Skeleton, useTheme } from "@mui/material";
import { useUIConfig } from "@/util/useUIConfig";

type SkeletonProps = {
  borderRadiusTop?: boolean;
  borderRadiusBottom?: boolean;
  bgWhite?: boolean;
};

export default function PetArchivedDetailsSkeleton({
  borderRadiusTop = false,
  borderRadiusBottom = false,
  bgWhite = false,
}: SkeletonProps) {
  const theme = useTheme();
  const { isMobile, isTabletVertical } = useUIConfig();

  const backgroundWhite = theme.palette.petmodal.roomPetDetailsBackgroundWhite;
  const backgroundGrey = theme.palette.petmodal.roomPetDetailsBackgroundGrey;

  const rowBg = bgWhite ? backgroundWhite : backgroundGrey;

  const borderStyles = {
    borderTopLeftRadius: borderRadiusTop ? 0 : 0,
    borderTopRightRadius: borderRadiusTop ? 0 : 0,
    borderBottomLeftRadius: borderRadiusBottom ? "25px" : 0,
    borderBottomRightRadius: borderRadiusBottom ? "25px" : 0,
  };

  const nameColWidth = React.useMemo(() => {
    if (isMobile) return "auto";
    if (isTabletVertical) return 160;
    return 240;
  }, [isMobile, isTabletVertical]);

  return (
    <Box
      sx={{
        minHeight: 60,
        display: isMobile ? "block" : "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: isTabletVertical ? "wrap" : "nowrap",
        gap: 1,
        pt: 1,
        pb: 1,
        backgroundColor: rowBg,
        boxShadow: theme.shadows[1],
        ...borderStyles,
        ...(isMobile && { flex: "1 1 0" }),
      }}
    >
      {isMobile ? (
        <Box
          sx={{ display: "flex", alignItems: "center", width: "100%", px: 1 }}
        >
          <Box
            sx={{
              minWidth: 0,
              flex: 0.62,
              display: "flex",
              gap: 1.5,
              alignItems: "center",
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
            sx={{
              mx: 1,
              bgcolor: theme.palette.petmodal.dialogVerticalDivLineColor,
              height: "2.5rem",
            }}
          />

          <Box sx={{ textAlign: "left", minWidth: 0, flex: 0.35 }}>
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ width: "70%", mb: 0.5 }}
            />
            <Skeleton variant="text" animation="wave" sx={{ width: "95%" }} />
          </Box>

          <Divider
            orientation="vertical"
            sx={{
              mx: 2,
              bgcolor: theme.palette.petmodal.dialogVerticalDivLineColor,
              height: "2.5rem",
            }}
          />

          <Box
            sx={{
              pr: 1.5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Skeleton
              variant="rounded"
              animation="wave"
              width={85}
              height={37}
              sx={{ borderRadius: "25px" }}
            />
          </Box>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              ml: 2,
              minWidth: 0,
              width: nameColWidth,
              flexShrink: 0,
              flex: isTabletVertical ? "1.6 1 0" : "0 0 240px",
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
          <Box
            sx={{
              width: isTabletVertical ? "20%" : 160,
              flexShrink: 0,
              ...(isTabletVertical && { flex: 0.5 }),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              px: 2,
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

          <Box
            sx={{
              width: isTabletVertical ? "20%" : 140,
              flexShrink: 0,
              ...(isTabletVertical && { flex: 0.5 }),
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              px: 2,
            }}
          >
            <Skeleton variant="text" animation="wave" sx={{ width: "55%" }} />
            <Skeleton
              variant="text"
              animation="wave"
              sx={{ width: "75%", mt: 0.5 }}
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
          <Box sx={{ mr: isTabletVertical ? 2 : 3 }}>
            <Skeleton
              variant="rounded"
              animation="wave"
              width={isTabletVertical ? 110 : 120}
              height={40}
              sx={{ borderRadius: "25px" }}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
