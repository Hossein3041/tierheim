import * as React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  SxProps,
  Theme,
  TextField,
  FormHelperText,
} from "@mui/material";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";
import { useTheme } from "@mui/material/styles";

export interface CustomInputProps {
  id: string;
  label: string;
  type: string;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  showPassword?: boolean;
  onToggleShow?: () => void;
  width?: string | number;
  sx?: SxProps<Theme>;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  fullWidth?: boolean;
  height?: string | number;
  bRadius?: string | number;
  setInputFontSize?: string | number;
  specialFeaturesDesktop?: boolean;
  error?: boolean;
  helperText?: string;
  readOnly?: boolean;
  disabled?: boolean;
  InputProps?: any;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  enableFlash?: boolean;
  multiline?: boolean;
}

export const CustomInputField: React.FC<CustomInputProps> = ({
  id,
  label,
  type,
  value = "",
  onChange,
  showPassword,
  onToggleShow,
  width,
  sx,
  onMouseEnter,
  onMouseLeave,
  height,
  bRadius,
  setInputFontSize,
  specialFeaturesDesktop,
  onKeyDown,
  error = false,
  helperText,
  disabled = false,
  enableFlash = false,
  readOnly = false,
  InputProps,
}) => {
  const theme = useTheme();
  const pf = theme.palette.inputfields;
  const fieldColor = pf.inputTitleFieldColor;
  const hoverColor = pf.inputTitleFieldHoverColor;
  const labelColor = pf.inputTitleColor;
  const browserTextColor = theme.palette.login.loginBrowserTextColor;
  const fieldInputColor = theme.palette.petmodal.dialogFieldInputColor;
  const isSpecialFeatures =
    id == "field-Specialfeatures" && !specialFeaturesDesktop;

  const [flashShadow, setFlashShadow] = React.useState(false);
  const triggerFlash = () => {
    if (enableFlash) {
      setFlashShadow(true);
      setTimeout(() => setFlashShadow(false), 200);
    }
  };

  const commonStyles = {
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: bRadius || "9999px",
    backgroundColor: fieldColor,
    // pl: 11,
    px: 2,
    height: height || "50px",
    transition: "background-color 0.3s ease",
    boxShadow: flashShadow ? theme.shadows[1] : "none",
    "&:hover": { backgroundColor: hoverColor },
    "& input": {
      height: isSpecialFeatures ? "auto" : "100%",
      boxSizing: "border-box",
      fontSize: setInputFontSize,
      fontWeight: 100,
      color: fieldInputColor,
      ...(isSpecialFeatures && {
        textAlign: "left",
        verticalAlign: "top",
      }),
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

  const isPasswordBase = type === "password";
  const effectiveType = isPasswordBase && showPassword ? "text" : type;

  return (
    <FormControl
      fullWidth
      variant="standard"
      error={error}
      onMouseEnter={enableFlash ? triggerFlash : onMouseEnter}
      onMouseLeave={enableFlash ? triggerFlash : onMouseLeave}
      sx={{
        width,
        ...sx,
      }}
    >
      <InputLabel
        shrink
        htmlFor={id}
        sx={{
          pl: 0,
          color: labelColor,
          letterSpacing: "0.01rem",
          fontSize: "0.85rem",
          "&.Mui-focused": { color: labelColor },
          transform: "translate(18px, -0px) scale(0.75)",
        }}
      >
        {label}
      </InputLabel>
      {isSpecialFeatures ? (
        <TextField
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          multiline
          rows={4}
          maxRows={10}
          fullWidth
          variant="outlined"
          disabled={disabled}
          InputProps={{ readOnly, ...(InputProps || {}) }}
          inputProps={{
            maxLength: 300,
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              ...commonStyles,
              overflowY: "auto",
              mt: 2,
              ml: 0,
              fontSize: setInputFontSize,

              "& .MuiOutlinedInput-notchedOutline": {
                border: "none",
              },
            },
          }}
        />
      ) : (
        <Input
          id={id}
          type={effectiveType}
          value={value ?? ""}
          onChange={onChange}
          disableUnderline
          disabled={disabled}
          error={error}
          inputProps={{
            onKeyDown,
            maxLength: 300,
            readOnly,
          }}
          {...(InputProps ? { InputProps } : {})}
          endAdornment={
            isPasswordBase && onToggleShow ? (
              <InputAdornment position="end">
                <IconButton onClick={onToggleShow} edge="end">
                  {showPassword ? (
                    <VisibilityOffOutlined />
                  ) : (
                    <VisibilityOutlined />
                  )}
                </IconButton>
              </InputAdornment>
            ) : undefined
          }
          sx={{
            ...commonStyles,
            pl: "16px",
            px: 2,
            height: height || "50px",
          }}
        />
      )}
      {helperText && (
        <FormHelperText sx={{ mx: 5, mt: 0.5 }}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
