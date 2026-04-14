"use client";

import PetsTabs from "@app/_components/TabView/PetsTabs";
import {
  Appointment,
  APPOINTMENTS_OVERVIEW_QUERY_KEY,
  fetchAppointments,
  AppointmentsResponse,
  flattenAppointments,
} from "@app/_queries/appointments/GetAppointments";
import { useQuery } from "@tanstack/react-query";
import { PETS } from "@app/_constants/texts/Texts";
import AppointmentDateBar, {
  getCurrentWeekDays,
} from "@app/_components/appointment/appointmentDateBar";
import { Box, Button, Divider, useTheme } from "@mui/material";
import { useState } from "react";
import AppointmentDetailModal from "@app/_components/appointment/AppointmentDetailModal";
import { useScreenSize } from "@app/_util/useScreenSize";
import {
  APPOINTMENT_CATEGORY_QUERY_KEY,
  AppointmentCategory,
  fetchAppointmentCategories,
} from "@app/_queries/appointments/GetAppointmentCategories";
import AppointmentCategoryContainer from "@app/_components/appointment/appointmentCategoryContainer";
import { APPOINTMENT_TYPES_QUERY_KEY } from "@app/_queries/appointments/GetAppointmentTypes";
import { GET_APPOINTMENTS_OVERVIEW_ENDPOINT } from "@/queries/Endpoints";
import fetchJson from "@/queries/JsonFetcher";

export default function AppointmentPage() {
  const [open, setOpen] = useState(false);
  const { isMobile } = useScreenSize();

  const current_week = getCurrentWeekDays();

  const [selectedDate, setSelectedDate] = useState<Date[]>([]);
  const theme = useTheme();

  const { data: overview, isLoading } = useQuery<AppointmentsResponse>({
    queryKey: [APPOINTMENTS_OVERVIEW_QUERY_KEY, selectedDate],
    queryFn: async () => {
      const url = `${GET_APPOINTMENTS_OVERVIEW_ENDPOINT}?dates=${(selectedDate.length >
      0
        ? selectedDate
        : current_week
      )
        .map((d) => d.toISOString().split("T")[0])
        .join(",")}`;
      return fetchJson<AppointmentsResponse>(url, "GET");
    },
    placeholderData: (prev) => prev,
  });

  const speciesTabs = [PETS.all, ...(overview ? Object.keys(overview) : [])];
  const appointments = overview ? flattenAppointments(overview) : [];

  const { data: categories, isLoading: categoriesLoading } = useQuery<
    AppointmentCategory[]
  >({
    queryKey: [APPOINTMENT_CATEGORY_QUERY_KEY],
    queryFn: () => fetchAppointmentCategories(),
    placeholderData: (prev) => prev,
    initialData: [
      { id: 1 } as any,
      { id: 2 } as any,
      { id: 3 } as any,
      { id: 4 } as any,
    ], // to show skeletons
  });

  return (
    <PetsTabs tabs={speciesTabs}>
      <AppointmentDateBar
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Divider
        sx={{
          my: 3,
          mx: 3,
        }}
      />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          },
          gap: 2,
        }}
      >
        {!categoriesLoading &&
          categories?.map((c, i) => (
            <AppointmentCategoryContainer
              selectedDates={selectedDate}
              key={c.id}
              title={c.name}
              loading={isLoading}
              appointments={appointments.filter((a) => a.category === c.name)}
            />
          ))}
      </Box>
      <Button
        onClick={() => setOpen(true)}
        variant="contained"
        title="Neuen Termin erstellen"
        sx={{
          backgroundColor:
            theme.palette.petmodal.dialogSwitchCheckedTrackColorGreen,
          color: "white",
          position: "fixed",
          bottom: 20,
          width: isMobile ? "auto" : 72,
          height: isMobile ? 48 : 72,
          right: isMobile ? 30 : 104,
          left: isMobile ? 30 : "auto",
          fontSize: 30,
          borderRadius: "1.5rem",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
          "&:hover": {
            filter: "brightness(1.1)",
          },
        }}
      >
        +
      </Button>
      {open && <AppointmentDetailModal onClose={() => setOpen(false)} onOpen />}
    </PetsTabs>
  );
}
