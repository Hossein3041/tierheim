import { APPOINTMENTSMODALTEXTS } from "@app/_constants/texts/Texts";
import { ModalLayout } from "../modals/ModalLayout";
import { Divider, FormControl, Stack, TextField } from "@mui/material";
import { useContext, useState } from "react";
import CustomDatePicker2 from "../CustomDatePicker2";
import CustomDropdownField2 from "../CustomDropDownField2";
import {
  Appointment,
  APPOINTMENTS_OVERVIEW_QUERY_KEY,
} from "@app/_queries/appointments/GetAppointments";
import { AppointmentPetRow } from "./AppointmentPetRow";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { PetArchivedModal } from "../archive/PetArchivedModal";
import {
  APPOINTMENT_TYPES_QUERY_KEY,
  AppointmentType,
  fetchAppointmentTypes,
} from "@app/_queries/appointments/GetAppointmentTypes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  APPOINTMENT_CATEGORY_QUERY_KEY,
  AppointmentCategory,
  fetchAppointmentCategories,
} from "@app/_queries/appointments/GetAppointmentCategories";
import { CreateAppointment } from "@app/_queries/appointments/CreateAppointment";
import { updateAppointment } from "@app/_queries/appointments/UpdateAppointment";
import AppointmentDeleteModal from "./AppointmentDeleteModal";
import { UtilContext } from "../context/contextFile";
import { CODE_TO_ALERT } from "@app/_constants/Alerts";
import { AppointmentHistoryModal } from "@/components/appointment/AppointmentHistoryModal";

interface AppointmentDetailModalProps {
  onOpen: boolean;
  onClose: () => void;
  appointment?: Appointment;
}

export default function AppointmentDetailModal({
  onOpen,
  onClose,
  appointment,
}: AppointmentDetailModalProps) {
  const [openArchive, setOpenArchive] = useState(false);
  const [openHistory, setOpenHistory] = useState(false);
  const { setAlert } = useContext(UtilContext);

  const queryClient = useQueryClient();

  const [currAppointment, setCurrAppointment] = useState<Appointment>(
    appointment || {
      id: -1,
      type: "",
      date: "",
      time: "",
      description: "",
      category: "",
      race: "",
      referencedPet: undefined,
      checked: false,
      checkedAt: null,
      checkedBy: null,
    },
  );

  const { data: types, isLoading: typesLoading } = useQuery<AppointmentType[]>({
    queryKey: [APPOINTMENT_TYPES_QUERY_KEY],
    queryFn: () => fetchAppointmentTypes(),
    placeholderData: (prev) => prev,
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery<
    AppointmentCategory[]
  >({
    queryKey: [APPOINTMENT_CATEGORY_QUERY_KEY],
    queryFn: () => fetchAppointmentCategories(),
    placeholderData: (prev) => prev,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: [APPOINTMENTS_OVERVIEW_QUERY_KEY],
    mutationFn: async (updatedAppointment: Appointment) => {
      !!appointment
        ? updateAppointment(updatedAppointment)
        : CreateAppointment(updatedAppointment);
    },
    onSuccess: () => {
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [APPOINTMENTS_OVERVIEW_QUERY_KEY],
        });
      }, 100);
      setAlert(CODE_TO_ALERT[1]);
      onClose();
    },
    onError: (error: any) => {
      console.error("Error saving appointment:", error);
      setAlert({
        ...CODE_TO_ALERT[2],
        errorMessage: error.message,
        stackTrace: error.stack,
      });
    },
  });

  return (
    <ModalLayout
      size="small"
      title={APPOINTMENTSMODALTEXTS.headline}
      onOpen={onOpen}
      disabled={
        isPending ||
        typesLoading ||
        categoriesLoading ||
        currAppointment.type === "" ||
        currAppointment.category === "" ||
        currAppointment.date === "" ||
        currAppointment.time === "" ||
        !currAppointment.referencedPet
      }
      onClose={onClose}
      handleSave={async () => {
        await mutateAsync(currAppointment);
      }}
      hideHistoryButton={!appointment}
      onHistoryClick={() => setOpenHistory(true)}
    >
      <Stack gap={2} mt={3}>
        <CustomDropdownField2
          id="field-appointment-categorie"
          label={APPOINTMENTSMODALTEXTS.categorie}
          defaultValue={appointment?.category}
          onChange={(e) => {
            setCurrAppointment({
              ...currAppointment!,
              category: e.target.value.toString(),
            });
          }}
          options={
            !categoriesLoading && categories
              ? categories.map((c) => ({
                  value: c.name,
                  label: c.name,
                }))
              : []
          }
          displayEmpty
          fullWidth
        />
        <Divider sx={{ my: 1 }} />
        <CustomDropdownField2
          id="field-appointment-type"
          disabled={categoriesLoading}
          label={APPOINTMENTSMODALTEXTS.typeOfAppointmentLabelText}
          defaultValue={appointment?.type}
          onChange={(e) => {
            setCurrAppointment({
              ...currAppointment!,
              type: e.target.value.toString(),
            });
          }}
          options={
            !typesLoading && types
              ? types.map((t) => ({
                  value: t.name,
                  label: t.name,
                }))
              : []
          }
          displayEmpty
          fullWidth
        />
        <Stack flexDirection={"row"} gap={2}>
          <CustomDatePicker2
            label={APPOINTMENTSMODALTEXTS.date}
            value={appointment?.date ?? null}
            fullWidth
            onChange={(e) => {
              setCurrAppointment({
                ...currAppointment!,
                date: e?.toISOString() || "",
              });
            }}
          />
          <FormControl fullWidth variant="standard" sx={{ paddingTop: "16px" }}>
            <TimePicker
              defaultValue={
                appointment?.time ? dayjs(appointment?.time, "HH:mm") : null
              }
              onChange={(newValue) => {
                setCurrAppointment({
                  ...currAppointment!,
                  time: dayjs(newValue).format("HH:mm"),
                });
              }}
              enableAccessibleFieldDOMStructure={false}
              slots={{ textField: TextField }}
              slotProps={{
                textField: {
                  label: APPOINTMENTSMODALTEXTS.time,
                },
              }}
            />
          </FormControl>
        </Stack>
        <Divider sx={{ my: 1 }} />
        <TextField
          id="field-appointment-notes"
          label={APPOINTMENTSMODALTEXTS.notes}
          defaultValue={appointment?.description ?? ""}
          onChange={(e) => {
            setCurrAppointment({
              ...currAppointment!,
              description: e.target.value,
            });
          }}
          multiline
          rows={4}
          fullWidth
        />
        <Divider sx={{ my: 1 }} />
        <AppointmentPetRow
          appointment={currAppointment}
          onClickPet={() => setOpenArchive(true)}
          setCurrAppointment={setCurrAppointment}
        />
        <Divider sx={{ my: 1 }} />
        {!!appointment && (
          <AppointmentDeleteModal
            appointment={currAppointment}
            afterDelete={() => onClose()}
          />
        )}
      </Stack>
      {openArchive && (
        <PetArchivedModal
          onClose={() => setOpenArchive(false)}
          open={openArchive}
          mode="selectPet"
          setPet={(pet) => {
            setCurrAppointment({ ...currAppointment!, referencedPet: pet });
            setOpenArchive(false);
          }}
        />
      )}
      {appointment && (
        <AppointmentHistoryModal
          open={openHistory}
          onClose={() => setOpenHistory(false)}
          appointment={appointment}
        />
      )}
    </ModalLayout>
  );
}
