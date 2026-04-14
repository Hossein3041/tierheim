"use client";

import {
  Box,
  Divider,
  Paper,
  Typography,
  useTheme,
  Skeleton,
  Stack,
} from "@mui/material";
import { useState } from "react";
import AppointmentCardHeader from "@/components/appointment/appointmentCardHeader";
import AppointmentDetailModal from "./AppointmentDetailModal";
import { AppointmentPetRow } from "./AppointmentPetRow";
import { Appointment } from "@app/_queries/appointments/GetAppointments";

interface AppointmentCardProps {
  appointment: Appointment;
  loading?: boolean;
}

export default function AppointmentCard({
  loading = true,
  appointment,
}: AppointmentCardProps) {
  const theme = useTheme();
  const palette = theme.palette;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const imageSize = 50;

  return (
    <Paper
      id={`appointment-card-${appointment.type.replace(/\s+/g, "-").toLowerCase()}`}
      elevation={3}
      sx={{
        borderRadius: 6,
        overflow: "hidden",
        backgroundColor: palette.animalFile.tabBackground,
        boxShadow: theme.shadows[2],
        display: "flex",
        flexDirection: "column",
        filter: appointment.checked ? "grayscale(0.2)" : "none",
        opacity: appointment.checked ? 0.6 : 1,
        transition: "opacity 0.2s ease, filter 0.2s ease",
        minHeight: 200,
      }}
    >
      <AppointmentCardHeader
        leftText={appointment.type}
        timeLabel={appointment.time}
        loading={loading}
        onClick={() => {
          setIsModalOpen(true);
        }}
      />

      <Box
        sx={{
          pt: 1.5,
          pb: 1.5,
          px: 2.5,
          backgroundColor: palette.animalFile.tabBackground,
          minHeight: 40,
        }}
      >
        {loading ? (
          <>
            <Skeleton variant="text" animation="wave" sx={{ width: "95%" }} />
            <Skeleton variant="text" animation="wave" sx={{ width: "90%" }} />
          </>
        ) : appointment.description ? (
          <Typography
            variant="body2"
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              whiteSpace: "normal",
              wordBreak: "break-word",
              textOverflow: "ellipsis",
              lineHeight: 1.35,
              color: palette.navigation.tabText,
            }}
          >
            {appointment.description}
          </Typography>
        ) : null}
      </Box>

      <Divider
        sx={{
          mx: 2.5,
          my: 1,
          mb: 2,
          bgcolor: theme.palette.petmodal.dialogVerticalDivLineColor,
        }}
      />

      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 1,
            px: 0.5,
            pb: 2.5,
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

          <Box sx={{ mr: 2 }}>
            <Skeleton
              variant="circular"
              animation="wave"
              width={50}
              height={50}
            />
          </Box>
        </Box>
      ) : (
        <Box mb={2} mx={2}>
          <AppointmentPetRow appointment={appointment} imageSize={imageSize} />
        </Box>
      )}
      {isModalOpen && (
        <AppointmentDetailModal
          appointment={appointment}
          onOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </Paper>
  );
}
