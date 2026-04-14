"use client";

import { Box, Button, Stack } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import ConfirmButton from "@/components/appointment/confimButton";
import { useScreenSize } from "@app/_util/useScreenSize";
import { AppointmentDateCard } from "./appointmentDateCard";
import { ContentContainer } from "../ContentContainer";

type Props = {
  selectedDate: Date[];
  setSelectedDate: Dispatch<SetStateAction<Date[]>>;
};

export function getCurrentWeekDays(): Date[] {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

export default function AppointmentDateBar({
  selectedDate,
  setSelectedDate,
}: Props) {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - today.getDay() + 1);

  const [daysOfDisplayedWeek, setDaysofDisplayedWeek] = useState<Date[]>(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      return d;
    });
  });

  const { isMobile, isTablet } = useScreenSize();

  const handleNext = () => {
    setDaysofDisplayedWeek((prevDays) =>
      Array.from({ length: 7 }, (_, i) => {
        const nextDays = new Date(prevDays[0]);
        nextDays.setDate(prevDays[0].getDate() + 7 + i);
        return nextDays;
      }),
    );
  };

  const handlePrev = () => {
    setDaysofDisplayedWeek((prevDays) =>
      Array.from({ length: 7 }, (_, i) => {
        const prevDaysDate = new Date(prevDays[0]);
        prevDaysDate.setDate(prevDays[0].getDate() - 7 + i);
        return prevDaysDate;
      }),
    );
  };

  const displayedSelectedDates = selectedDate.filter(
    (date) =>
      !daysOfDisplayedWeek.some(
        (d) => d.toDateString() === date.toDateString(),
      ),
  );

  return (
    <>
      <ContentContainer>
        <Box sx={{ width: "100%", position: "relative" }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent={"center"}
            spacing={1}
            sx={{ width: "100%" }}
          >
            <ConfirmButton
              mode="arrow-back"
              onClick={handlePrev}
              sizePx={isTablet ? 10 : 50}
            />
            <Box
              sx={{
                overflowX: "hidden",
                display: "flex",
                gap: isTablet ? 0.5 : 2,
                justifyContent: "center",
              }}
            >
              {daysOfDisplayedWeek.map((date) => (
                <AppointmentDateCard
                  isToday={date.toDateString() === today.toDateString()}
                  key={date.toDateString()}
                  date={date}
                  isSelected={selectedDate.some(
                    (d) => d.toDateString() === date.toDateString(),
                  )}
                  setSelectedDate={setSelectedDate}
                />
              ))}
            </Box>
            <ConfirmButton
              mode="arrow-forward"
              onClick={handleNext}
              sizePx={isMobile ? 5 : isTablet ? 10 : 50}
            />
          </Stack>
        </Box>
        <Stack
          flexDirection={"row"}
          gap={0.5}
          mt={selectedDate.length > 0 ? 1 : 0}
          justifyContent={"center"}
        >
          {displayedSelectedDates.length > 0 && (
            <Stack flexDirection={"row"} gap={0.5} justifyContent={"center"}>
              {displayedSelectedDates.map((b) => (
                <Button
                  onClick={() => {
                    setSelectedDate((prev) =>
                      prev.filter(
                        (date) => date.toDateString() !== b.toDateString(),
                      ),
                    );
                  }}
                  variant="outlined"
                  key={b.toDateString()}
                  sx={{
                    fontSize: isTablet ? 12 : 14,
                    minWidth: 0,
                    padding: "4px",
                    borderRadius: 2,
                  }}
                >
                  {b.getDate() + "." + b.getMonth()}
                </Button>
              ))}
            </Stack>
          )}
          {selectedDate.length > 0 && (
            <Button
              variant="text"
              onClick={() => setSelectedDate([])}
              sx={{ ml: 1 }}
            >
              Alle entfernen
            </Button>
          )}
        </Stack>
      </ContentContainer>
    </>
  );
}
