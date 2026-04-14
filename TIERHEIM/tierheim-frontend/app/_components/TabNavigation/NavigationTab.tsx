"use client";

import { useScreenSize } from "@app/_util/useScreenSize";
import { Tab, useMediaQuery, useTheme } from "@mui/material";

interface NavigationTabProps {
  label?: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  setRef?: (el: HTMLElement | null) => void;
  isFirst: boolean;
  isLast: boolean;
}

export default function NavigationTab({
  label,
  isActive,
  disabled,
  onClick,
  setRef,
  isFirst,
  isLast,
}: NavigationTabProps) {
  const theme = useTheme();
  const { isMobile } = useScreenSize();
  const palette = theme.palette;

  return (
    <Tab
      label={label}
      onClick={onClick}
      disabled={disabled}
      ref={setRef}
      sx={{
        flex: 1,
        opacity: isActive ? 1 : 0.6,
        zIndex: 2,
        textTransform: "none",
        fontSize: isMobile ? "0.75rem" : "1rem",
        px: isMobile ? 0.5 : 4,
        py: isMobile ? 0.5 : 1.5,
        mx: isMobile
          ? isFirst || isLast
            ? 0.1
            : 0.15
          : isFirst || isLast
            ? 0.2
            : 0.3,
        minHeight: "2.25rem",
        borderRadius: "9999px",
        color: isActive
          ? palette.navigation.tabActiveText
          : palette.navigation.tabText,
        backgroundColor: isActive
          ? palette.navigation.tabActive
          : "transparent",
        transition: "all 0.2s ease",
        cursor: disabled ? "not-allowed" : "pointer",
        "&:hover": {
          backgroundColor:
            !isActive && !disabled ? palette.navigation.tabHover : undefined,
        },
      }}
    />
  );
}
