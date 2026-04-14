import * as React from "react";
import {
  Button,
  CircularProgress,
  useTheme,
  SxProps,
  Theme,
} from "@mui/material";

export interface CustomButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  height?: string | number;
  width?: string | number;
  backgroundColor?: string;
  hoverColor?: string;
  color?: string;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
  booleanBoxShadow?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  height = "2.5rem",
  width = "auto",
  backgroundColor,
  color,
  fullWidth = false,
  disabled = false,
  isLoading = false,
  sx,
  hoverColor,
  booleanBoxShadow = true,
}) => {
  const theme = useTheme();
  const pf = theme.palette.inputfields;
  const bg = backgroundColor ?? theme.palette.primary.main;
  const hov = hoverColor ?? theme.palette.primary.dark;
  const txt = color ?? theme.palette.primary.contrastText;

  const getHoverColor = (baseColor: string) => {
    if (hoverColor) {
      return hoverColor;
    }
    if (baseColor === pf.inputTitleFieldColor) {
      return pf.inputTitleFieldHoverColor;
    }
    return baseColor;
  };

  return (
    <>
      <Button
        onClick={onClick}
        fullWidth={fullWidth}
        disabled={disabled || isLoading}
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          height,
          width,
          backgroundColor: bg,
          color: txt,
          minWidth: 0,
          borderRadius: "9999px",
          textTransform: "none",
          transition: "background-color 0.3s ease, filter 0.3s ease",
          "&:hover": {
            backgroundColor: getHoverColor(bg),
            ...(hoverColor || bg !== pf.inputTitleFieldColor
              ? { filter: hoverColor ? "none" : "brightness(1.3)" }
              : {}),
          },
          boxShadow: booleanBoxShadow ? theme.shadows[1] : "none",
          ...sx,
        }}
      >
        {isLoading ? <CircularProgress size={20} color="inherit" /> : children}
      </Button>
    </>
  );
};
