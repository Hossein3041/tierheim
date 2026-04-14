import { useScreenSize } from "@app/_util/useScreenSize";
import { Box, Stack, Typography, useTheme } from "@mui/material";

interface AppointmentDateCardProps {
  date: Date;
  isSelected: boolean;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date[]>>;
  isToday?: boolean;
}

export function AppointmentDateCard({
  date,
  isSelected,
  setSelectedDate,
  isToday,
}: AppointmentDateCardProps) {
  const theme = useTheme();
  const { isMobile, isTablet } = useScreenSize();

  return (
    <Box
      onClick={() => {
        if (isSelected) {
          setSelectedDate((prev) =>
            prev.filter((d) => d.toDateString() !== date.toDateString()),
          );
          return;
        }
        setSelectedDate((prev) => [...prev, date]);
      }}
      sx={{
        overflow: "hidden",
        position: "relative",
        flex: "1 1 0%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        borderRadius: isMobile ? "0.75rem" : isTablet ? "1rem" : "1.5rem",
        width: isTablet ? 100 : 150,
        height: isTablet ? 60 : 90,
        maxWidth: 150,
        bgcolor: isSelected
          ? theme.palette.primary.main
          : theme.palette.action.hover,
        color: isSelected
          ? theme.palette.primary.contrastText
          : theme.palette.text.primary,
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 1,
        border: `1px solid ${
          isSelected || isToday
            ? theme.palette.primary.main
            : theme.palette.grey[300]
        }`,
        cursor: "pointer",
        transition: "background-color 0.3s, color 0.3s",
        "&:hover": {
          bgcolor: isSelected
            ? theme.palette.primary.dark
            : theme.palette.action.selected,
        },
      }}
    >
      <Typography
        component="span"
        sx={{
          fontSize: isTablet ? 12 : 16,
          textAlign: "center",
          color: isSelected
            ? theme.palette.primary.contrastText
            : theme.palette.text.disabled,
        }}
      >
        {date.toLocaleDateString("default", {
          weekday: isMobile ? "short" : "long",
        })}
      </Typography>
      <Stack flexDirection={"row"} gap={0.5} alignItems="baseline">
        <Typography
          component="span"
          sx={{
            fontSize: isTablet ? 20 : 32,
            lineHeight: 1,
            textAlign: "center",
            color: isSelected
              ? theme.palette.primary.contrastText
              : theme.palette.text.disabled,
          }}
        >
          {date.getDate()}
        </Typography>
        {!isMobile && (
          <Typography
            component="span"
            sx={{
              fontSize: isTablet ? 12 : 16,
              lineHeight: 1,
              textAlign: "center",
              color: isSelected
                ? theme.palette.primary.contrastText
                : theme.palette.text.disabled,
            }}
          >
            {date.toLocaleString("default", { month: "short" })}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}
