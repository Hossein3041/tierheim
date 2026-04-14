import * as React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectProps,
  SxProps,
  Theme,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

export interface CustomDropdownFieldProps
  extends Omit<SelectProps<string | number>, "label"> {
  id: string;
  label: string;
  value: string | number;
  onChange: (
    event: SelectChangeEvent<string | number>,
    child: React.ReactNode,
  ) => void;
  options: Array<{ value: string | number; label: React.ReactNode }>;
  width?: string | number;
  height?: string | number;
  sx?: SxProps<Theme>;
  helperText?: React.ReactNode;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  setInputFontSize?: string | number;
  bRadius?: string | number;
  placeholder?: string;
}

export const CustomDropdownField: React.FC<CustomDropdownFieldProps> = ({
  id,
  label,
  value,
  onChange,
  options,
  width = "100%",
  height,
  sx,
  helperText,
  onMouseEnter,
  onMouseLeave,
  setInputFontSize,
  bRadius,
  placeholder,
  ...rest
}) => {
  const theme = useTheme();
  const pf = theme.palette.inputfields;
  const fieldColor = pf.inputTitleFieldColor;
  const hoverColor = pf.inputTitleFieldHoverColor;
  const labelColor = pf.inputTitleColor;
  const fieldInputColor = theme.palette.petmodal.dialogFieldInputColor;

  return (
    <FormControl
      fullWidth
      variant="standard"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      sx={{ width, ...sx }}
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
      <Select
        id={id}
        value={value}
        onChange={onChange}
        disableUnderline
        IconComponent={KeyboardArrowDownOutlinedIcon}
        MenuProps={{
          PaperProps: {
            sx: { mt: 1, borderRadius: 2 },
          },
        }}
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          height: height || "50px",
          borderRadius: bRadius || "9999px",
          backgroundColor: fieldColor,
          px: 2,
          py: 1,
          transition: "background-color 0.3s ease",
          "&:hover": { backgroundColor: hoverColor },
          "& .MuiSelect-select": {
            padding: 0,
            display: "flex",
            alignItems: "center",
            height: "100%",
            fontSize: setInputFontSize || "0.8rem",
            fontWeight: 100,
            color:
              value === "" && placeholder
                ? theme.palette.text.disabled
                : fieldInputColor,
          },
          "& .MuiSelect-icon": {
            right: 8,
            color:
              fieldColor === theme.palette.background.paper
                ? theme.palette.text.primary
                : theme.palette.text.secondary,
          },
        }}
        {...rest}
      >
        {options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default CustomDropdownField;
