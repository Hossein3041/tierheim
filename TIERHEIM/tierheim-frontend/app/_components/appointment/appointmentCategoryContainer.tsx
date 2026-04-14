"use client";

import { Fragment, useContext } from "react";
import {
  Box,
  Divider,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import AppointmentCategoryHeader from "@/components/appointment/appointmentCategoryHeader";
import { Appointment } from "@/queries/appointments/GetAppointments";
import AppointmentCard from "@/components/appointment/appointmentCard";
import { TabContext } from "../TabView/PetsTabs";
import { APPOINTMENTSMODALTEXTS, PETS } from "@app/_constants/texts/Texts";
import { SearchQueryContext } from "@app/dashboard/SearchQueryContext";
import { useScreenSize } from "@app/_util/useScreenSize";

type AppointmentCategoryProps = {
  title: string;
  appointments: Appointment[];
  loading?: boolean;
  selectedDates?: Date[];
};

export default function AppointmentCategoryContainer({
  title,
  appointments,
  loading = false,
  selectedDates,
}: AppointmentCategoryProps) {
  const theme = useTheme();

  const { selectedRace } = useContext(TabContext);
  const { searchQuery } = useContext(SearchQueryContext);

  const { isMobile } = useScreenSize();

  const appointmentPlaceholderForSkeleton: Appointment[] = [
    {
      id: -1,
      type: "",
      date: "",
      time: "",
      description: "",
      category: "",
      checked: false,
      race: "",
      referencedPet: undefined,
    },
  ];

  const filteredAppointments = loading
    ? appointmentPlaceholderForSkeleton
    : appointments
        .filter((a) => {
          // by Race
          if (selectedRace && selectedRace !== PETS.all) {
            return a.race === selectedRace;
          }
          return true;
        })
        .filter((a) => {
          // by Search Query
          if (searchQuery) {
            return a.referencedPet?.petName
              .toLowerCase()
              .includes(searchQuery.toLowerCase());
          }
          return true;
        })
        .sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });

  return (
    <Paper
      id={`appointment-category-${title?.replace(/\s+/g, "-").toLowerCase()}`}
      elevation={2}
      sx={{
        position: "relative",
        borderRadius: 5,
        overflow: "hidden",
        bgcolor: theme.palette.background.paper,
        pb: 2,
      }}
    >
      <AppointmentCategoryHeader
        isLoading={loading}
        title={title}
        count={filteredAppointments.length}
        sx={{
          m: 2,
          mb: 0,
          color: theme.palette.primary.contrastText,
        }}
      />
      {filteredAppointments.length === 0 && !loading && (
        <Typography
          sx={{
            p: 2,
            color: theme.palette.navigation.tabText,
            textAlign: "center",
          }}
        >
          {APPOINTMENTSMODALTEXTS.noAppointmentsfound}
        </Typography>
      )}
      <Stack
        gap={2}
        sx={{ p: 2, overflowX: !isMobile ? "hidden" : "auto" }}
        flexDirection={!isMobile ? "column" : "row"}
      >
        {filteredAppointments.map((a, i) => {
          return (
            <Fragment key={a.id}>
              {a.date !== filteredAppointments[i - 1]?.date && !isMobile && !loading && (
                <Stack flexDirection={"row"} alignItems="center" p={1} gap={1}>
                  <Typography sx={{ color: theme.palette.navigation.tabText }}>
                    {new Date(a.date).toLocaleDateString("default", {
                      weekday: "long",
                    })}
                  </Typography>
                  <Divider
                    sx={{
                      flexGrow: 1,
                    }}
                  />
                  <Typography sx={{ color: theme.palette.navigation.tabText }}>
                    {new Date(a.date).getDate()}
                  </Typography>
                </Stack>
              )}
              <Box key={a.id} sx={{ minWidth: !isMobile ? "auto" : "100%" }}>
                <AppointmentCard appointment={a} key={a.id} loading={loading} />
              </Box>
            </Fragment>
          );
        })}
      </Stack>
    </Paper>
  );
}
