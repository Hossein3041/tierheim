import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { Button, Divider, useMediaQuery } from "@mui/material";
import {
  FormControl,
  InputLabel,
  TextField,
  SxProps,
  Theme,
  FormHelperText,
} from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { de } from "date-fns/locale";

export interface CustomDatePickerProps {
  id: string;
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  width?: string | number;
  height?: string | number;
  sx?: SxProps<Theme>;
  helperText?: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  fullWidth?: boolean;
  setInputFontSize?: string;
  isDesktop?: boolean;
  enableFlash?: boolean;
  disabled?: boolean;
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  id,
  label,
  value,
  onChange,
  width = "100%",
  height,
  sx,
  helperText,
  onMouseEnter,
  onMouseLeave,
  fullWidth,
  setInputFontSize,
  isDesktop,
  enableFlash = false,
  disabled = false,
}) => {
  const theme = useTheme();
  const pf = theme.palette.inputfields;
  const fieldColor = pf.inputTitleFieldColor;
  const hoverColor = pf.inputTitleFieldHoverColor;
  const labelColor = pf.inputTitleColor;
  const browserTextColor = theme.palette.login.loginBrowserTextColor;
  const fieldInputColor = theme.palette.petmodal.dialogFieldInputColor;

  const [flashShadow, setFlashShadow] = React.useState(false);
  const triggerFlash = () => {
    if (enableFlash) {
      setFlashShadow(true);
      setTimeout(() => setFlashShadow(false), 200);
    }
  };

  const [open, setOpen] = React.useState(false);
  const [tempDate, setTempDate] = React.useState<Date | null>(
    value ? new Date(value) : null,
  );

  React.useEffect(() => {
    setTempDate(value ? new Date(value) : null);
  }, [value]);

  const handleCancel = () => {
    setOpen(false);
    setTempDate(value ? new Date(value) : null);
  };

  const handleAccept = () => {
    onChange(tempDate ? tempDate.toISOString().split("T")[0] : null);
    setOpen(false);
  };

  const commonStyles = {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: "9999px",
    backgroundColor: fieldColor,
    padding: 0,
    margin: 0,
    height: height || "50px",
    transition: "background-color 0.3s ease",
    boxShadow: flashShadow ? theme.shadows[1] : "none",
    "&:hover": { backgroundColor: hoverColor },
    "& input": {
      height: "100%",
      boxSizing: "border-box",
      fontSize: "0.9rem",
      fontWeight: 100,
      color: fieldInputColor,
      paddingRight: !isDesktop ? "0px" : "16px",
    },
    "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus":
      {
        WebkitBoxShadow: `0 0 0 1000px ${fieldColor} inset`,
        WebkitTextFillColor: browserTextColor,
      },
    "& input:-moz-autofill": {
      boxShadow: `0 0 0 1000px ${fieldColor} inset`,
      backgroundColor: fieldColor,
    },
  };

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={de}
      localeText={{
        cancelButtonLabel: "Abbrechen",
        okButtonLabel: "Bestätigen",
        datePickerToolbarTitle: "Datum auswählen",
      }}
    >
      <FormControl
        fullWidth={fullWidth}
        variant="standard"
        onMouseEnter={enableFlash ? triggerFlash : onMouseEnter}
        onMouseLeave={enableFlash ? triggerFlash : onMouseLeave}
        sx={{ width, ...sx, paddingTop: "16px" }}
      >
        <InputLabel
          shrink
          htmlFor={id}
          sx={{
            pl: 0,
            color: labelColor,
            letterSpacing: "0.1rem",
            fontSize: "0.85rem",
            "&.Mui-focused": { color: labelColor },
            transform: "translate(18px, -0px) scale(0.75)",
          }}
        >
          {label}
        </InputLabel>
        {!isDesktop ? (
          <MobileDatePicker
            open={open}
            onOpen={() => setOpen(true)}
            onClose={handleCancel}
            disabled={disabled}
            value={tempDate}
            onChange={(newVal) => {
              if (newVal && typeof (newVal as any).toDate === "function")
                setTempDate((newVal as any).toDate());
              else setTempDate(newVal as Date | null);
            }}
            onAccept={handleAccept}
            enableAccessibleFieldDOMStructure={false}
            slots={{ textField: TextField }}
            slotProps={{
              textField: {
                id,
                fullWidth,
                variant: "outlined",
                "aria-label": label,
                inputProps: {
                  sx: {
                    pl: 1.5,
                    paddingTop: 2,
                    paddingLeft: 2,
                  },
                  style: {
                    fontSize: setInputFontSize || "0.8rem",
                  },
                },
                sx: {
                  "& .MuiOutlinedInput-root": {
                    paddingTop: "8px",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    ...commonStyles,
                  },
                  "& .MuiInputLabel-root": {
                    pl: 3.5,
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderRadius: "9999px",
                    border: "none",
                    boxSizing: "border-box",
                  },
                  "& .MuiInputAdornment-root": {
                    marginRight: "20px",
                    "& .MuiSvgIcon-root": {
                      fontSize: "1.2rem",
                    },
                  },
                },
              },
            }}
          ></MobileDatePicker>
        ) : (
          <TextField
            id={id}
            type="date"
            value={value || ""}
            onChange={(e) => onChange(e.target.value || null)}
            fullWidth={fullWidth}
            variant="outlined"
            disabled={disabled}
            inputProps={{
              sx: {
                pl: 1.5,
                paddingTop: 2,
                paddingLeft: 2,
              },
              style: {
                fontSize: setInputFontSize,
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                paddingTop: "8px",
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                ...commonStyles,
              },
              "& .MuiInputLabel-root": {
                pl: 3.5,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderRadius: "9999px",
                border: "none",
                boxSizing: "border-box",
              },
            }}
          />
        )}
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
