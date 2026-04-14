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

export interface CustomDropdownFieldProps2
  extends Omit<SelectProps<string | number>, "label"> {
  id: string;
  label: string;
  value?: string | number;
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

export const CustomDropdownField2: React.FC<CustomDropdownFieldProps2> = ({
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
  const labelColor = pf.inputTitleColor;

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
          color: labelColor,
          transform: "translate(25px, -0px) scale(0.75)",
          "&.Mui-focused": { color: labelColor },
        }}
      >
        {label}
      </InputLabel>
      <Select
        id={id}
        label={label}
        value={value}
        onChange={onChange}
        disableUnderline
        IconComponent={KeyboardArrowDownOutlinedIcon}
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

export default CustomDropdownField2;
