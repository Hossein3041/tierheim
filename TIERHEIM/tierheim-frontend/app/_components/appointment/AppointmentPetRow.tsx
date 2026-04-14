import { APPOINTMENTS } from "@app/_constants/texts/Texts";
import { Box, Typography, useTheme } from "@mui/material";
import { AnimalImage } from "../animalFile/AnimalImage";
import ConfirmButton from "./confimButton";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import {
  Appointment,
  APPOINTMENTS_OVERVIEW_QUERY_KEY,
} from "@app/_queries/appointments/GetAppointments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CheckAppointment } from "@app/_queries/appointments/CheckAppointment";
import { CODE_TO_ALERT } from "@app/_constants/Alerts";
import { useContext } from "react";
import { UtilContext } from "../context/contextFile";
import { updateAppointment } from "@app/_queries/appointments/UpdateAppointment";

interface AppointmentPetRowProps {
  appointment: Appointment;
  imageSize?: number;
  onClickPet?: () => void;
  setCurrAppointment?: (appointment: Appointment) => void;
}

export function AppointmentPetRow({
  appointment,
  imageSize = 50,
  onClickPet,
  setCurrAppointment,
}: AppointmentPetRowProps) {
  const theme = useTheme();

  const client = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationKey: [APPOINTMENTS_OVERVIEW_QUERY_KEY, appointment.id],
    mutationFn: (appointment: Appointment) => updateAppointment(appointment),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: [APPOINTMENTS_OVERVIEW_QUERY_KEY],
      });
    },
  });

  const { setAlert } = useContext(UtilContext);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        cursor: onClickPet ? "pointer" : "default",
      }}
    >
      <Box
        tabIndex={1}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onClickPet) {
            onClickPet();
          }
        }}
        onClick={() => {
          if (onClickPet) {
            onClickPet();
          }
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1.5,
          minWidth: 0,
          borderRadius: "1rem",
          "&:hover": {
            backgroundColor: onClickPet
              ? theme.palette.action.hover
              : "transparent",
          },
        }}
      >
        {!appointment.referencedPet ? (
          <Box
            sx={{
              width: imageSize,
              height: imageSize,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: theme.palette.action.hover,
              border: `1px dashed ${theme.palette.divider}`,
              flexShrink: 0,
            }}
            aria-label={APPOINTMENTS.noPictureAvailable}
            role="img"
            title={APPOINTMENTS.noPictureAvailable}
          >
            <LinkOffIcon
              sx={{
                fontSize: imageSize * 0.6,
                color: theme.palette.text.disabled,
              }}
            />
          </Box>
        ) : (
          <AnimalImage
            size={imageSize}
            bRadius="100%"
            name={appointment.referencedPet?.petName ?? ""}
            alt={appointment.referencedPet?.petName ?? ""}
            imageUrl={appointment.referencedPet?.petImage || ""}
            enableHover={false}
            isDesktop={true}
            petDetails={true}
          />
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minWidth: 0,
            width: 180,
          }}
        >
          <Typography
            noWrap
            sx={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              whiteSpace: "normal",
              wordBreak: "break-word",
              textOverflow: "ellipsis",
              lineHeight: 1.2,
              color: theme.palette.appointmentcard.labelOrNotesColro,
              fontSize: "0.9rem",
            }}
          >
            {!appointment.referencedPet
              ? "Tier auswählen"
              : appointment.referencedPet?.petName || APPOINTMENTS.unknownName}
          </Typography>
          {appointment.referencedPet && (
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
                color: theme.palette.navigation.tabText,
              }}
              title={
                appointment.referencedPet?.petBreed || APPOINTMENTS.unknownRace
              }
            >
              {appointment.referencedPet?.petBreed || APPOINTMENTS.unknownRace}
            </Typography>
          )}
        </Box>
      </Box>
      {appointment.id !== -1 && (
        <ConfirmButton
          isConfirmed={appointment.checked}
          onChange={async (next) => {
            if (setCurrAppointment) {
              setCurrAppointment({
                ...appointment,
                checked: next,
              });
              return;
            }
            await mutateAsync({ ...appointment, checked: next });
          }}
          sizePx={50}
          sx={{
            ml: 1,
            mr: 0.5,
          }}
        />
      )}
    </Box>
  );
}
