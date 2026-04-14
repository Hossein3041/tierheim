import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  useTheme,
  Chip,
  linearProgressClasses,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useUIConfig } from "@/util/useUIConfig";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { updatePetUnit } from "@/queries/units/UpdatePetUnit";
import { styled } from "@mui/material/styles";
import { useMutation } from "@tanstack/react-query";
import { UnitDropdownField } from "@/components/room/UnitDropdownField";
import { DRAGANDDROP } from "@/constants/texts/Texts";
import { UnitConfirmationDialogButton } from "@/components/room/UnitConfirmationDialogButton";
import { CODE_TO_ALERT } from "@/constants/Alerts";
import { UtilContext } from "@/components/context/contextFile";

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
      ? theme.palette.animalFile.alert
      : theme.palette.petmodal.dialogSwitchCheckedTrackColorBlue,
    ...theme.applyStyles("dark", {
      backgroundColor: isFullRoom
        ? theme.palette.animalFile.alert
        : theme.palette.petmodal.dialogSwitchCheckedTrackColorBlue,
    }),
  },
}));

interface UnitConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (unitId: string) => void;
  roomName?: string;
  count?: number;
  max?: number;
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
  roomName = "",
  count = 0,
  max = 0,
  onOpenRoomModal,
  pendingMove,
}: UnitConfirmationDialogProps) {
  const { isMobile, isTablet, isDesktop } = useUIConfig();

  const theme = useTheme();
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const isFullRoom = count >= max;
  const percent = max > 0 ? Math.min(100, (count / max) * 100) : 0;
  const { setAlert } = useContext(UtilContext);

  const updatePetUnitMutation = useMutation({
    mutationFn: ({ petId, unitId }: { petId: number; unitId: string }) =>
      updatePetUnit(petId, { unitId }),

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["pet-overview"] }),
        queryClient.invalidateQueries({
          queryKey: ["units-bySection", pendingMove?.toSectionId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["section-detail", pendingMove?.toSectionId],
        }),
        queryClient.invalidateQueries({ queryKey: ["locations-overview"] }),
      ]);
      onConfirm(variables.unitId);
      setSelectedUnitId(null);
      setAlert(CODE_TO_ALERT[7]);
    },
    onError: (error) => {
      console.error(DRAGANDDROP.unitUpdateError, error);
      setAlert(CODE_TO_ALERT[8]);
    },
  });

  const handleConfirm = () => {
    if (selectedUnitId && pendingMove) {
      updatePetUnitMutation.mutate({
        petId: pendingMove.petId,
        unitId: selectedUnitId,
      });
    } else {
      console.warn(DRAGANDDROP.unitUpdateConfirmError);
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
            : DRAGANDDROP.chooseUnit}
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
              ? DRAGANDDROP.chooseAnotherSection
              : pendingMove && !isFullRoom
                ? DRAGANDDROP.noUnits
                : DRAGANDDROP.chooseUnit}
          </Typography>
          {!isFullRoom && pendingMove && (
            <UnitDropdownField
              sectionId={pendingMove.toSectionId}
              onChange={setSelectedUnitId}
              selectedUnitId={selectedUnitId}
              isFullRoom={isFullRoom}
              enabled={open && !!pendingMove?.toSectionId}
              sx={{ mt: 2 }}
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
        <UnitConfirmationDialogButton
          isFullRoom={isFullRoom}
          pendingMove={pendingMove}
          selectedUnitId={selectedUnitId}
          setSelectedUnitId={setSelectedUnitId}
          onClose={onClose}
          onOpenRoomModal={onOpenRoomModal}
          handleConfirm={handleConfirm}
        />
      </DialogActions>
    </Dialog>
  );
}
