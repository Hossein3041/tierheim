import * as React from "react";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { CustomButton } from "@/components/customButton";
import { useUIConfig } from "@/util/useUIConfig";
import AppTheme from "@/styles/appTheme";
import {
  ANIMALIMAGE,
  PETMODALTEXTS,
  PETS,
  ROOMPETMODALTEXTS,
} from "@/constants/texts/Texts";
import { PetData } from "@/constants/pets/pets";
import { AnimalImage } from "@/components/animalFile/AnimalImage";

interface RoomPetDetailsProps {
  borderRadiusTop?: boolean;
  bgWhite: boolean;
  borderRadiusBottom?: boolean;
  onOpenPetModal: (pet: {
    name: string;
    breed: string;
    id: number;
    imageUrl: string;
    group: string;
  }) => void;
  pet: PetData;
}

export const RoomPetDetails: React.FC<RoomPetDetailsProps> = ({
  borderRadiusTop = false,
  bgWhite = false,
  borderRadiusBottom = false,
  onOpenPetModal,
  pet,
}) => {
  const theme = useTheme();
  const inputfieldsPalette = theme.palette.inputfields;
  const backgroundWhite = theme.palette.petmodal.roomPetDetailsBackgroundWhite;
  const backgroundGrey = theme.palette.petmodal.roomPetDetailsBackgroundGrey;
  const petnameColor = theme.palette.petmodal.dialogSwitchLabelColor;
  const petbreedColor = theme.palette.navigation.tabText;
  const detailsButtonColor = theme.palette.searchbar.searchicon;

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

  const borderStyles = () => {
    return {
      borderTopLeftRadius: borderRadiusTop ? "25px" : 0,
      borderTopRightRadius: borderRadiusTop ? "25px" : 0,
      borderBottomLeftRadius: borderRadiusBottom ? "25px" : 0,
      borderBottomRightRadius: borderRadiusBottom ? "25px" : 0,
    };
  };

  const nameLabel = pet.name || "Unbekannter Name";
  const breedLabel = pet.breed?.name || "Unbekannte Rasse";
  const chipLabel = pet.chipNumber || "-";
  const CHIP_MAX_CHARS = 18;

  const handleOpenPetModal = (pet: {
    id: number;
    name: string;
    image: string | null;
    breed?: { name: string } | string;
    locationUnit?: string | null;
  }) => {
    onOpenPetModal({
      name: pet.name,
      breed:
        typeof pet.breed === "string"
          ? pet.breed
          : pet.breed?.name || PETS.unknown,
      id: pet.id,
      imageUrl: pet.image || "",
      group: pet.locationUnit || "",
    });
  };

  return (
    <Box
      sx={{
        height: "auto",
        minHeight: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        pt: 1,
        pb: 1,
        mt: borderRadiusTop ? 2 : 0,
        mx: isMobile ? -2 : 0,
        backgroundColor: bgWhite ? backgroundWhite : backgroundGrey,
        ...borderStyles(),
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
        <AnimalImage
          size={50}
          bRadius="100%"
          name={ANIMALIMAGE.animalImageName}
          alt={ANIMALIMAGE.animalImageName}
          imageUrl={pet.image || ""}
          enableHover={false}
          isDesktop={isDesktop}
          petDetails={true}
          // petId={pet.id ?? 0}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            noWrap
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              whiteSpace: "normal",
              wordBreak: "break-word",
              textOverflow: "ellipsis",
              lineHeight: 1.2,
              color: petnameColor,
              fontSize: "0.9rem",
            }}
          >
            {nameLabel}
          </Typography>
          <Box
            tabIndex={0}
            sx={{
              position: "relative",
              width: 140,
              overflow: "visible",
              cursor: "text",
              zIndex: 0,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "normal",
                wordBreak: "break-word",
                maxWidth: "100%",
                color: petbreedColor,
              }}
            >
              {breedLabel}
            </Typography>
            <Box
              className="breed-full"
              sx={{
                position: "absolute",
                left: 0,
                top: "-4.5px",
                zIndex: 1000,
                whiteSpace: "nowrap",
                bgcolor: bgWhite ? backgroundWhite : backgroundGrey,
                boxShadow: 0,
                pointerEvents: "none",
                display: "block",
                opacity: 0,
                transform: `translateY(0)`,
                transition:
                  "opacity 1s ease, transform 0.3s ease, box-shadow 0.3s ease",
                willChange: "opacity, transform",
              }}
            >
              <Typography variant="caption" color={petbreedColor}>
                {breedLabel}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {isMobile ? (
        <>
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
          <CustomButton
            onClick={() => handleOpenPetModal(pet)}
            width="85px"
            height="37px"
            backgroundColor={backgroundGrey}
            color={detailsButtonColor}
            sx={{
              ml: 0,
              mr: 2,
              fontSize: buttonFontSize,
            }}
            booleanBoxShadow={false}
          >
            {ROOMPETMODALTEXTS.roomPetDetailButtonText}
          </CustomButton>
        </>
      ) : (
        <>
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 160,
              flexShrink: 0,
            }}
          >
            <Typography variant="caption" sx={{ color: petnameColor }}>
              {ROOMPETMODALTEXTS.roomPetDetailChipNumberLabelText}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 0.2,
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                whiteSpace: "normal",
                wordBreak: "break-all",
                maxWidth: "100%",
                color: petbreedColor,
              }}
            >
              {chipLabel}
            </Typography>
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
          <CustomButton
            onClick={() => handleOpenPetModal(pet)}
            width="20%"
            height="40px"
            backgroundColor={backgroundGrey}
            color={detailsButtonColor}
            sx={{
              ml: 1,
              mr: 3,
              fontSize: buttonFontSize,
            }}
            booleanBoxShadow={false}
          >
            {ROOMPETMODALTEXTS.roomPetDetailButtonText}
          </CustomButton>
        </>
      )}
    </Box>
  );
};

export default RoomPetDetails;
