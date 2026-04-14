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
import {
  DatePicker,
  LocalizationProvider,
  MobileDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { de } from "date-fns/locale";
import { PickerValue } from "@mui/x-date-pickers/internals";

export interface CustomDatePickerProps2 {
  label: string;
  value: string | null;
  onChange: (value: PickerValue) => void;
  sx?: SxProps<Theme>;
  helperText?: React.ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
}

export const CustomDatePicker2: React.FC<CustomDatePickerProps2> = ({
  label,
  value,
  onChange,
  sx,
  helperText,
  fullWidth,
  disabled = false,
}) => {
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
        sx={{ ...sx, paddingTop: "16px" }}
      >
        <DatePicker
          disabled={disabled}
          defaultValue={value ? new Date(value) : null}
          onChange={onChange}
          enableAccessibleFieldDOMStructure={false}
          slots={{ textField: TextField }}
          slotProps={{
            textField: {
              label,
            },
          }}
        />
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    </LocalizationProvider>
  );
};

export default CustomDatePicker2;
