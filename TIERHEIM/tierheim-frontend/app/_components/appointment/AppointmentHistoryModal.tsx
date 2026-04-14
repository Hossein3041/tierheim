"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CustomButton } from "@/components/customButton";
import { Appointment } from "@/queries/appointments/GetAppointments";
import { APPOINTMENTHISTORYTEXTS } from "@/constants/texts/Texts";
import { AppointmentHistoryContent } from "./AppointmentHistoryContent";

interface AppointmentHistoryModalProps {
  open: boolean;
  onClose: () => void;
  appointment: Appointment;
}

export function AppointmentHistoryModal({
  open,
  onClose,
  appointment,
}: AppointmentHistoryModalProps) {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "25px",
          overflow: "hidden",
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
          py: 1.5,
        }}
      >
        <Typography variant="body1" component="div">
          {APPOINTMENTHISTORYTEXTS.historyLabel}
        </Typography>
        <IconButton
          onClick={onClose}
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

      <DialogContent dividers>
        <AppointmentHistoryContent appointment={appointment} />
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <CustomButton onClick={onClose} width="100px" booleanBoxShadow={false}>
          {APPOINTMENTHISTORYTEXTS.close}
        </CustomButton>
      </DialogActions>
    </Dialog>
  );
}
