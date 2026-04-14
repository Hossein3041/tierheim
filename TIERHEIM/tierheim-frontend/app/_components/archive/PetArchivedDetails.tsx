"use client";

import * as React from "react";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { CustomButton } from "@/components/customButton";
import { useUIConfig } from "@/util/useUIConfig";
import {
  ANIMALIMAGE,
  APPOINTMENTS,
  ARCHIVETEXTS,
  PETS,
  ROOMPETMODALTEXTS,
} from "@/constants/texts/Texts";
import { AnimalImage } from "@/components/animalFile/AnimalImage";
import type { PetData } from "@/constants/pets/pets";
import PetArchivedDetailsSkeleton from "@/components/archive/PetArchivedDetailsSkeleton";
import { OpenPetPayload } from "../modals/petModals";
import { AppointmentDTO } from "@app/_queries/appointments/GetAppointments";

type Props = {
  pet?: PetData;
  loading?: boolean;
  onOpenPetModal: (pet: {
    name: string;
    breed: string;
    id: number;
    imageUrl: string;
    group: string;
  }) => void;
  borderRadiusTop?: boolean;
  borderRadiusBottom?: boolean;
  bgWhite?: boolean;
  mode?: "archive" | "selectPet";
  setPet?: (x: AppointmentDTO["referencedPet"]) => void;
};

export default function PetArchivedDetails({
  pet,
  onOpenPetModal,
  borderRadiusTop = false,
  borderRadiusBottom = false,
  bgWhite = false,
  loading = false,
  mode = "archive",
  setPet,
}: Props) {
  const theme = useTheme();

  const backgroundWhite = theme.palette.petmodal.roomPetDetailsBackgroundWhite;
  const backgroundGrey = theme.palette.petmodal.roomPetDetailsBackgroundGrey;
  const petnameColor = theme.palette.petmodal.dialogSwitchLabelColor;
  const petbreedColor = theme.palette.navigation.tabText;
  const detailsButtonColor = theme.palette.searchbar.searchicon;

  const { isMobile, isTablet, isTabletVertical, isDesktop, buttonFontSize } =
    useUIConfig();

  const borderStyles = {
    borderTopLeftRadius: borderRadiusTop ? 0 : 0,
    borderTopRightRadius: borderRadiusTop ? 0 : 0,
    borderBottomLeftRadius: borderRadiusBottom ? "25px" : 0,
    borderBottomRightRadius: borderRadiusBottom ? "25px" : 0,
  };

  const nameColWidth = React.useMemo(() => {
    if (isMobile) return "auto";
    if (isTabletVertical) return 160;
    if (isTablet) return 200;
    return 240;
  }, [isMobile, isTablet, isTabletVertical]);

  if (loading) {
    return (
      <PetArchivedDetailsSkeleton
        bgWhite={bgWhite}
        borderRadiusTop={borderRadiusTop}
        borderRadiusBottom={borderRadiusBottom}
      />
    );
  }

  const nameLabel = pet?.name || "Unbekannter Name";
  const breedLabel =
    typeof pet?.breed === "string"
      ? pet?.breed
      : pet?.breed?.name || PETS.unknown;
  const chipLabel = pet?.chipNumber || "-";

  const formatDate = (v?: string | Date | null) => {
    if (!v) return "-";
    const d = typeof v === "string" ? new Date(v) : v;
    if (isNaN(d.getTime())) return "-";
    return d.toLocaleDateString("de-DE");
  };

  const rawFoundDate =
    (pet as any)?.foundDate ?? (pet as any)?.dateFound ?? null;
  const foundDate = formatDate(rawFoundDate);

  const handleOpen = () => {
    if (!pet) return;
    onOpenPetModal({
      name: pet.name,
      breed: breedLabel,
      id: pet.id,
      imageUrl: pet.image || "",
      group: pet.locationUnit || "",
    });
  };

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
        backgroundColor: bgWhite ? backgroundWhite : backgroundGrey,
        boxShadow: theme.shadows[1],
        ...borderStyles,
        ...(isMobile && { flex: "1 1 0" }),
      }}
    >
      {isMobile ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            px: 1,
          }}
        >
          <Box
            sx={{
              minWidth: 0,
              flex: 0.5,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
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
                fontSize: "0.8rem",
              }}
            >
              {nameLabel}
            </Typography>
            <Typography
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
                fontSize: "0.7rem",
              }}
            >
              {breedLabel}
            </Typography>
          </Box>
          <Divider
            orientation="vertical"
            sx={{
              mx: 1,
              justifySelf: "center",
              bgcolor: theme.palette.petmodal.dialogVerticalDivLineColor,
              height: "2.5rem",
            }}
          />
          <Box
            sx={{
              textAlign: "left",
              minWidth: 0,
              flex: 0.35,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: petnameColor,
                fontSize: "0.8rem",
                textAlign: "left",
              }}
            >
              {ARCHIVETEXTS.date}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 0.2,
                whiteSpace: "nowrap",
                color: petbreedColor,
                fontSize: "0.7rem",
                textAlign: "left",
              }}
            >
              {foundDate}
            </Typography>
          </Box>
          <Divider
            orientation="vertical"
            sx={{
              justifySelf: "center",
              bgcolor: theme.palette.petmodal.dialogVerticalDivLineColor,
              height: "2.5rem",
              mx: 2,
            }}
          />
          <Box
            sx={{
              pr: 1.5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
          {mode === "archive" && (
            <CustomButton
              onClick={handleOpen}
              width="20%"
              height="40px"
              backgroundColor={backgroundGrey}
              color={detailsButtonColor}
              sx={{ fontSize: buttonFontSize }}
              booleanBoxShadow={false}
            >
              {ROOMPETMODALTEXTS.roomPetDetailButtonText}
            </CustomButton>
          )}
          {mode === "selectPet" && setPet && (
            <CustomButton
              width={"20%"}
              height="40px"
              sx={{ fontSize: buttonFontSize }}
              onClick={() =>
                setPet
                  ? setPet({
                      petId: pet?.id ?? -1,
                      petName: pet?.name ?? "",
                      petBreed: pet?.breed?.name || APPOINTMENTS.unknownRace,
                      petImage: pet?.image || "",
                    })
                  : null
              }
            >
              Wählen
            </CustomButton>
          )}
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
              ...(isTabletVertical && { borderLeft: "none" }),
            }}
          >
            {!isMobile && (
              <AnimalImage
                size={50}
                bRadius="100%"
                name={ANIMALIMAGE.animalImageName}
                alt={ANIMALIMAGE.animalImageName}
                imageUrl={pet?.image || ""}
                enableHover={false}
                isDesktop={isDesktop}
                petDetails={true}
                // petId={pet?.id ?? -1}
              />
            )}
            <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <Typography
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
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
              <Typography
                variant="caption"
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  maxWidth: "100%",
                  color: petbreedColor,
                  fontSize: "0.8rem",
                }}
              >
                {breedLabel}
              </Typography>
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: isTabletVertical ? "20%" : 160,
              flexShrink: 0,
              ...(isTabletVertical && { flex: 0.5 }),
            }}
          >
            <Typography variant="caption" sx={{ color: petnameColor }}>
              {ARCHIVETEXTS.chipNumber}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 0.2,
                display: "-webkit-box",
                WebkitLineClamp: 2,
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

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: isTabletVertical ? "20%" : 140,
              flexShrink: 0,
              ...(isTabletVertical && { flex: 0.5 }),
            }}
          >
            <Typography variant="caption" sx={{ color: petnameColor }}>
              Datum
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 0.2,
                whiteSpace: "nowrap",
                color: petbreedColor,
              }}
            >
              {foundDate}
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

          {mode === "archive" && (
            <CustomButton
              onClick={handleOpen}
              width={isTabletVertical ? "18%" : "20%"}
              height="40px"
              backgroundColor={backgroundGrey}
              color={detailsButtonColor}
              sx={{ mr: isTabletVertical ? 2 : 3, fontSize: buttonFontSize }}
              booleanBoxShadow={false}
            >
              {ROOMPETMODALTEXTS.roomPetDetailButtonText}
            </CustomButton>
          )}
          {mode === "selectPet" && setPet && (
            <CustomButton
              width={isTabletVertical ? "18%" : "20%"}
              height="40px"
              sx={{ mr: isTabletVertical ? 2 : 3, fontSize: buttonFontSize }}
              onClick={() =>
                setPet
                  ? setPet({
                      petId: pet?.id ?? -1,
                      petName: pet?.name ?? "",
                      petBreed: pet?.breed?.name || APPOINTMENTS.unknownRace,
                      petImage: pet?.image || "",
                    })
                  : null
              }
            >
              Wählen
            </CustomButton>
          )}
        </>
      )}
    </Box>
  );
}
