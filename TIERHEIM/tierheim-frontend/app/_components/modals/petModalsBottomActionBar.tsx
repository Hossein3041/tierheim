import * as React from "react";
import { Divider, Palette, useTheme } from "@mui/material";
import { CustomButton } from "@/components/customButton";
import CustomSwitch from "@/components/customSwitch";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import { PETMODALTEXTS } from "@/constants/texts/Texts";
import { palette } from "@mui/system";
import { useUIConfig } from "@/util/useUIConfig";
import { Appointment, PetDetail } from "@/constants/pets/pets";
import { toast } from "react-toastify";
import fetchJson from "@/queries/JsonFetcher";

interface PetModalsBottomActionBarProps {
  inputfieldsPalette: Palette["inputfields"];
  pet?: PetDetail | undefined;
  setPet?: (pet: PetDetail) => void;
}

export const PetModalsBottomActionBar: React.FC<
  PetModalsBottomActionBarProps
> = ({ inputfieldsPalette, pet, setPet }) => {
  const theme = useTheme();

  const {
    isMobile,
    isTablet,
    isDesktop,
    isMobileLayout,
    isTabletLayout,
    isDesktopLayout,
    inputHeight,
    inputSpecialHeight,
    labelFontSize,
    inputFontSize,
    buttonFontSize,
  } = useUIConfig();

  const [openAppointments, setOpenAppointments] = React.useState(false);
  const [appointments, setAppointments] = React.useState<Appointment[]>([]);
  const [newAppointment, setNewAppointment] = React.useState<{
    date: string | null;
    description: string;
  }>({
    date: null,
    description: "",
  });
  const handleAppointmentsClick = async () => {
    setOpenAppointments(true);
    try {
      const data = await fetchJson<Appointment[]>(
        `http://localhost:8080/tierheim/api/private/pet/${pet?.id}/appointments`,
        "GET",
      );
      setAppointments(data || []);
    } catch (error) {
      toast.error("Fehler beim Laden der Termine");
    }
  };
  const handleAppointmentsClose = () => {
    setOpenAppointments(false);
    setNewAppointment({ date: null, description: "" });
  };

  const handleAddAppointment = async () => {
    if (!newAppointment.date || !newAppointment.description) {
      toast.error("Datum und Beschreibung sind erforderlich");
      return;
    }
    try {
      await fetchJson(
        `http//localhost:8080/tierheim/api/private/pet/${pet?.id}/appointments`,
        "POST",
        newAppointment,
      );
      toast.success("Termin hinzufügen");
      const data = await fetchJson<Appointment[]>(
        `http://localhost:8080/tierheim/api/private/pet/${pet?.id}/appointments`,
        "GET",
      );
      setAppointments(data || []);
      setNewAppointment({ date: null, description: "" });
    } catch (error) {
      toast.error("Fehler beim Hinzufügen des Termins");
    }
  };

  const handleExtraInvoiceChange = (
    event: React.SyntheticEvent,
    checked: boolean,
  ) => {
    if (pet && setPet) {
      setPet({ ...pet, hasExtraInvoice: checked });
    }
  };

  const handleArchiveChange = (
    event: React.SyntheticEvent,
    checked: boolean,
  ) => {
    if (pet && setPet) {
      setPet({ ...pet, archived: checked });
    }
  };

  return (
    <>
      <CustomButton
        onClick={handleAppointmentsClick}
        width={isMobile ? "50px" : "15%"}
        height={isMobile ? "50px" : "40px"}
        backgroundColor={inputfieldsPalette.inputTitleFieldColor}
        color={inputfieldsPalette.inputTitleColor}
        sx={{ ml: 0, fontSize: buttonFontSize }}
        booleanBoxShadow={false}
      >
        <CalendarMonthOutlinedIcon
          sx={{
            mr: isDesktop || isTablet ? 0.5 : 0,
            fontSize: isDesktop || isTablet ? "large" : "1.5rem",
          }}
        />
        {!isMobile ? PETMODALTEXTS.fieldAppointmentButtonInputText : undefined}
      </CustomButton>

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          mx: 1,
          my: 1,
          bgcolor: theme.palette.petmodal.dialogVerticalDivLineColor,
          height: "2rem",
        }}
      />

      <CustomSwitch
        label={PETMODALTEXTS.fieldInvoiceButtonInputText}
        checked={pet?.hasExtraInvoice ?? false}
        onChange={handleExtraInvoiceChange}
        trackColor={theme.palette.petmodal.dialogSwitchTrackColor}
        checkedTrackColor={
          theme.palette.petmodal.dialogSwitchCheckedTrackColorBlue
        }
        labelColor={theme.palette.petmodal.dialogSwitchLabelColor}
        isMobileBoolean={isMobile}
      />

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          mx: 1,
          my: 1,
          bgcolor: theme.palette.petmodal.dialogVerticalDivLineColor,
          height: "2rem",
        }}
      />

      <CustomSwitch
        label={PETMODALTEXTS.fieldArchiveButtonInputText}
        checked={pet?.archived ?? false}
        onChange={handleArchiveChange}
        trackColor={theme.palette.petmodal.dialogSwitchTrackColor}
        checkedTrackColor={
          theme.palette.petmodal.dialogSwitchCheckedTrackColorGreen
        }
        labelColor={theme.palette.petmodal.dialogSwitchLabelColor}
        isMobileBoolean={isMobile}
      />
    </>
  );
};

export default PetModalsBottomActionBar;
