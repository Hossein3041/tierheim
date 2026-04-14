import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  useTheme,
  ChipClasses,
  Chip,
  linearProgressClasses,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CustomDropdownField } from "@/components/customDropdownField";
import { CustomButton } from "@/components/customButton";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { UnitsBySection } from "@/constants/pets/unitsBySection";
import { updatePetUnit } from "@/queries/units/UpdatePetUnit";
import { styled } from "@mui/material/styles";

const BorderLinearProgress = styled(LinearProgress, {
  shouldForwardProp: (prop) => prop !== "isFullRoom",
})<{ isFullRoom?: boolean }>(({ theme, isFullRoom }) => ({
  height: 5,
  borderRadius: 50,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: isFullRoom
      ? "#ff0044"
      : theme.palette.petmodal.dialogSwitchCheckedTrackColorBlue,
    ...theme.applyStyles("dark", {
      backgroundColor: isFullRoom
        ? "#ff0044"
        : theme.palette.petmodal.dialogSwitchCheckedTrackColorBlue,
    }),
  },
}));

interface UnitConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (unitId: string) => void;
  units: UnitsBySection[];
  isFullRoom?: boolean;
  roomName?: string;
  count?: number;
  max?: number;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  buttonFontSize: string | number;
  onOpenRoomModal?: () => void;
  pendingMove: {
    petId: number;
    fromSectionId: number;
    toSectionId: number;
  } | null;
}

export default function UnitConfirmationDialog({
  open,
  onClose,
  onConfirm,
  units,
  isMobile,
  isTablet,
  isDesktop,
  buttonFontSize,
  isFullRoom = false,
  roomName = "",
  count = 0,
  max = 0,
  onOpenRoomModal,
  pendingMove,
}: UnitConfirmationDialogProps) {
  const theme = useTheme();
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const percent = max > 0 ? Math.min(100, (count / max) * 100) : 0;

  const handleConfirm = async () => {
    if (selectedUnitId && pendingMove) {
      console.log(
        `handleConfirm: petId = ${pendingMove.petId}, selectedUnitId = ${selectedUnitId}`,
      );
      try {
        await updatePetUnit(pendingMove.petId, { unitId: selectedUnitId });
        console.log(`Update erfolgreich für petId ${pendingMove.petId}`);
        await queryClient.invalidateQueries({ queryKey: ["pet-overview"] });
        await queryClient.invalidateQueries({ queryKey: ["units-bySection"] });
        await queryClient.invalidateQueries({ queryKey: ["section-detail"] });
        await queryClient.invalidateQueries({
          queryKey: ["locations-overview"],
        });
        onConfirm(selectedUnitId);
        setSelectedUnitId(null);
      } catch (error) {
        console.error("Fehler beim Updaten der Unit: ", error);
      }
    } else {
      console.warn("handleConfirm: selectedUnitId oder pendingMove fehlt");
      console.log("selectedUnitId", selectedUnitId);
      console.log("pendingMove: ", pendingMove);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        sx: {
          width: isDesktop ? "400px" : isMobile ? "90vw" : "80vw",
          maxWidth: "100%",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: theme.palette.petmodal.dialogSwitchCheckedTrackColorBlue,
          color: theme.palette.petmodal.dialogTitleColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          py: 1,
        }}
      >
        <Typography variant="h6" component="div">
          {isFullRoom
            ? roomName
              ? `${roomName} ist voll`
              : "Raum voll"
            : units.length === 0
              ? "Keine Zwinger verfügbar"
              : "Zwinger auswählen"}
        </Typography>
        <IconButton
          onClick={() => {
            setSelectedUnitId(null);
            onClose();
          }}
          size="small"
          sx={{
            color: theme.palette.petmodal.dialogXColor,
            transition: "color 0.3s ease",
            "&:hover": { color: theme.palette.petmodal.dialogXHoverColor },
            cursor: "pointer",
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          flex: 1,
          overflowY: "auto",
          px: 3,
          py: 2,
        }}
      >
        <Stack direction="column" spacing={1} sx={{ mt: 2 }}>
          <Chip
            size="small"
            label={`${count}/${max} belegt`}
            sx={{ fontWeight: 600, alignSelf: "flex-start" }}
          />
          <BorderLinearProgress
            variant="determinate"
            value={percent}
            isFullRoom={isFullRoom}
            sx={{ width: "100%" }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ alignSelf: "flex-start" }}
          >
            {isFullRoom
              ? "Bitte wähle einen anderen Raum."
              : units.length === 0
                ? "Keine Zwinger verfügbar."
                : "Bitte wähle einen Zwinger."}
          </Typography>
          {!isFullRoom && units.length > 0 && (
            <CustomDropdownField
              id="unit-select"
              value={selectedUnitId ?? ""}
              label=""
              onChange={(event) =>
                setSelectedUnitId(String(event.target.value))
              }
              options={units.map((unit) => ({
                value: String(unit.id),
                label: unit.name,
              }))}
              helperText={
                units.length === 0 ? "Keine Units verfügbar" : undefined
              }
              sx={{ mt: 2 }}
              bRadius="9px"
            />
          )}
        </Stack>
      </DialogContent>
      <DialogActions
        sx={{
          pt: isDesktop || isTablet ? 1.5 : 2,
          pb: isDesktop || isTablet ? 1.5 : 2,
          justifyContent: "space-evenly",
          backgroundColor: theme.palette.inputfields.inputTitleFieldColor,
          alignItems: isDesktop || isTablet ? "center" : "flex-end",
        }}
      >
        {isFullRoom || units.length === 0 ? (
          <>
            <CustomButton
              onClick={() => {
                setSelectedUnitId(null);
                onClose();
                console.log("Move aborted by user");
              }}
              width={isDesktop ? "40%" : "45%"}
              backgroundColor={theme.palette.inputfields.inputTitleFieldColor}
              color={theme.palette.inputfields.inputTitleColor}
              booleanBoxShadow={true}
              sx={{ fontSize: buttonFontSize }}
            >
              Schließen
            </CustomButton>
            <CustomButton
              onClick={() => {
                onClose();
                onOpenRoomModal?.();
              }}
              width={isDesktop ? "40%" : "45%"}
              backgroundColor={theme.palette.petmodal.dialogSwitchLabelColor}
              color={theme.palette.login.loginCardOneColor}
              booleanBoxShadow={true}
              sx={{ fontSize: buttonFontSize }}
            >
              Raumdetails
            </CustomButton>
          </>
        ) : (
          <>
            <CustomButton
              onClick={() => {
                setSelectedUnitId(null);
                onClose();
                console.log("Move aborted by user");
              }}
              width={isDesktop ? "40%" : "45%"}
              backgroundColor={theme.palette.inputfields.inputTitleFieldColor}
              color={theme.palette.inputfields.inputTitleColor}
              booleanBoxShadow={true}
              sx={{ fontSize: buttonFontSize }}
            >
              Abbrechen
            </CustomButton>
            <CustomButton
              onClick={handleConfirm}
              width={isDesktop ? "40%" : "45%"}
              backgroundColor={theme.palette.petmodal.dialogSwitchLabelColor}
              color={theme.palette.login.loginCardOneColor}
              booleanBoxShadow={true}
              disabled={!selectedUnitId || isFullRoom || units.length === 0}
              sx={{ fontSize: buttonFontSize }}
            >
              Speichern
            </CustomButton>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
}
