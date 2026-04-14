import * as React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { useUIConfig } from "@/util/useUIConfig";
import { ROOMPETMODALTEXTS } from "@/constants/texts/Texts";

interface RoomPetPlaceholderProps {
  borderRadiusTop?: boolean;
  bgWhite: boolean;
  borderRadiusBottom?: boolean;
}

export const RoomPetPlaceholder: React.FC<RoomPetPlaceholderProps> = ({
  borderRadiusTop = false,
  bgWhite = false,
  borderRadiusBottom = false,
}) => {
  const theme = useTheme();
  const backgroundWhite = theme.palette.petmodal.roomPetDetailsBackgroundWhite;
  const backgroundGrey = theme.palette.petmodal.roomPetDetailsBackgroundGrey;

  const borderStyles = () => ({
    borderTopLeftRadius: borderRadiusTop ? "25px" : 0,
    borderTopRightRadius: borderRadiusTop ? "25px" : 0,
    borderBottomLeftRadius: borderRadiusBottom ? "25px" : 0,
    borderBottomRightRadius: borderRadiusBottom ? "25px" : 0,
  });

  const {
    isMobile,
    isTablet,
    isDesktop,
    isMobileLayout,
    isTabletLayout,
    isDesktopLayout,
    inputHeight,
    inputSpecialHeight,
    labelFontSize,
    inputFontSize,
    buttonFontSize,
  } = useUIConfig();

  return (
    <Box
      sx={{
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pt: 1,
        pb: 1,
        mt: borderRadiusTop ? 2 : 0,
        mx: isMobile ? -2 : 0,
        backgroundColor: bgWhite ? backgroundWhite : backgroundGrey,
        ...borderStyles(),
        boxShadow: theme.shadows[1],
        opacity: 0.6,
      }}
    >
      <Typography variant="subtitle2" sx={{ color: theme.palette.grey[500] }}>
        {ROOMPETMODALTEXTS.roomPetPlaceholderText}
      </Typography>
    </Box>
  );
};

export default RoomPetPlaceholder;
