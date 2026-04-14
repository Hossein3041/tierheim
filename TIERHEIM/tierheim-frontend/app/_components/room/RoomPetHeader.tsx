"use client";
import { Box, Typography, useTheme } from "@mui/material";
import { useUIConfig } from "@/util/useUIConfig";

type RoomPetHeaderProps = {
  title: string;
};

export default function RoomPetHeader({ title }: RoomPetHeaderProps) {
  const theme = useTheme();
  const palette = theme.palette;
  const loginPalette = theme.palette.login;
  const inputfieldsPalette = theme.palette.inputfields;
  const petModals = theme.palette.petmodal;

  const {
    isMobile,
    isTablet,
    isTabletVertical,
    isTabletHorizontal,
    isDesktop,
    isMobileLayout,
    isTabletLayout,
    isDesktopLayout,
    inputHeight,
    inputSpecialHeight,
    labelFontSize,
    inputFontSize,
    buttonFontSize,
    isLandscape,
  } = useUIConfig();

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
      <Typography variant="subtitle2">{title}</Typography>
      <Box
        sx={{
          display: "flex",
          height: 24,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: `inset 0 0 0 1px ${palette.navigation.boxShadow}`,
        }}
      ></Box>
    </Box>
  );
}
