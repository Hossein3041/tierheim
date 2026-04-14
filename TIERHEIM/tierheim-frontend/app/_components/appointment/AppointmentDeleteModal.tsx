import { APPOINTMENTSMODALTEXTS } from "@app/_constants/texts/Texts";
import { ModalLayout } from "../modals/ModalLayout";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import {
  Appointment,
  APPOINTMENTS_OVERVIEW_QUERY_KEY,
} from "@app/_queries/appointments/GetAppointments";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAppointment } from "@app/_queries/appointments/DeleteAppointment";
import CircleIconButton from "../circleIconButton";
import { Delete, Inventory2Outlined } from "@mui/icons-material";

interface AppointmentDetailModalProps {
  appointment: Appointment;
  afterDelete?: () => void;
}

export default function AppointmentDeleteModal({
  appointment,
  afterDelete,
}: AppointmentDetailModalProps) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [APPOINTMENTS_OVERVIEW_QUERY_KEY],
    mutationFn: () => deleteAppointment(appointment),
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [APPOINTMENTS_OVERVIEW_QUERY_KEY],
        });
      }, 100);
      setOpen(false);
      afterDelete && afterDelete();
    },
  });

  return (
    <>
      <CircleIconButton
        title={APPOINTMENTSMODALTEXTS.deleteAppointmentTitle}
        onClick={() => setOpen(true)}
        sx={{
          position: "absolute",
          bottom: 16,
          right: 0,
          bgcolor: (t) => t.palette.common.white,
          "& svg": { color: (t) => t.palette.grey[600] },
          "&:hover svg": { color: (t) => t.palette.action.active },
        }}
      >
        <Delete fontSize="small" sx={{ color: (t) => t.palette.grey[600] }} />
      </CircleIconButton>
      {open && (
        <ModalLayout
          size="small"
          hideHistoryButton
          disabled={isPending}
          title={APPOINTMENTSMODALTEXTS.deleteAppointmentTitle}
          saveButtonText={APPOINTMENTSMODALTEXTS.deleteAppointment}
          onOpen={true}
          onClose={() => setOpen(false)}
          handleSave={async () => {
            await mutateAsync();
          }}
        >
          <Stack gap={2} mt={3}>
            <Typography>
              {APPOINTMENTSMODALTEXTS.deleteAppointmentMessage}
            </Typography>
          </Stack>
        </ModalLayout>
      )}
    </>
  );
}
