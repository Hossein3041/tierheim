"use client";

import { Box, Divider, Typography, useTheme } from "@mui/material";
import { Appointment } from "@/queries/appointments/GetAppointments";
import {
  formatGermanDate,
  formatGermanDateFromIso,
} from "@/util/FormatGermanDate";
import { APPOINTMENTHISTORYTEXTS } from "@/constants/texts/Texts";

interface AppointmentHistoryContentProps {
  appointment: Appointment;
}

export function AppointmentHistoryContent({
  appointment,
}: AppointmentHistoryContentProps) {
  const theme = useTheme();
  const { checked, checkedAt, checkedBy, date, time } = appointment;

  const hasHistory = checked && !!checkedAt;

  if (!hasHistory) {
    return (
      <Typography>
        {APPOINTMENTHISTORYTEXTS.noHistoryAvailableForThisDate}
      </Typography>
    );
  }

  const checkedAtFormatted = formatGermanDateFromIso(checkedAt);

  return (
    <>
      <Box
        sx={{
          bgcolor: theme.palette.appointmentcard.appointmentCheckedInfo,
          borderRadius: "12px",
          color: theme.palette.petmodal.dialogTitleColor,
          p: 2,
          mb: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          {APPOINTMENTHISTORYTEXTS.appointmentCompleted}
        </Typography>

        <Typography mt={1}>
          <strong>{APPOINTMENTHISTORYTEXTS.date}</strong> {checkedAtFormatted}{" "}
          {APPOINTMENTHISTORYTEXTS.hour}
        </Typography>

        {checkedBy && (
          <Typography>
            <strong>{APPOINTMENTHISTORYTEXTS.by}</strong> {checkedBy}
          </Typography>
        )}
      </Box>

      {date && time && <Divider sx={{ my: 2 }} />}

      {date && time && (
        <Box
          sx={{
            bgcolor: theme.palette.appointmentcard.appointmentOpenInfo,
            borderRadius: "12px",
            p: 2,
            mt: 3,
          }}
        >
          <Typography variant="h6" gutterBottom>
            {APPOINTMENTHISTORYTEXTS.openSince}
          </Typography>

          <Typography>
            <strong>{APPOINTMENTHISTORYTEXTS.from}</strong>{" "}
            {formatGermanDate(date, time)} {APPOINTMENTHISTORYTEXTS.hour}
          </Typography>

          <Typography>
            <strong>{APPOINTMENTHISTORYTEXTS.until}</strong>{" "}
            {checkedAtFormatted} {APPOINTMENTHISTORYTEXTS.hour}
          </Typography>
        </Box>
      )}
    </>
  );
}
