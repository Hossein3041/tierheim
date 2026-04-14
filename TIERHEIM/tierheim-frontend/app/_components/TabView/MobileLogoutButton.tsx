"use client";

import * as React from "react";
import { Button, useTheme } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

type MobileLogoutButtonProps = React.PropsWithChildren<{
  onClick: () => void;
  width?: string | number;
  sx?: SxProps<Theme>;
}>;

export default function MobileLogoutButton({
  onClick,
  children,
  width = "150px",
  sx,
}: MobileLogoutButtonProps) {
  const theme = useTheme();
  const palette = theme.palette.home;

  return (
    <Button
      onClick={onClick}
      disableElevation
      sx={{
        borderRadius: "999px",
        backgroundColor: palette.background,
        color: palette.icon,
        textTransform: "none",
        fontWeight: 500,
        fontSize: "0.95rem",
        px: 4,
        py: 1,
        minHeight: "32px",
        boxShadow: "none",
        transition: "background-color 0.1s ease-in-out",
        "&:active": {
          backgroundColor: palette.icon,
          color: palette.onClick,
        },
        width,
        ...sx,
      }}
    >
      {children}
    </Button>
  );
}
