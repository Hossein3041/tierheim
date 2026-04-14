"use client";

import { IconButton, SxProps, Theme, useTheme } from "@mui/material";
import { useMemo, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useScreenSize } from "@app/_util/useScreenSize";

type ButtonMode = "confirm" | "arrow-back" | "arrow-forward";

interface ConfirmButtonProps {
  mode?: ButtonMode;
  onChange?: (next: boolean) => void;
  onClick?: () => void;
  isConfirmed?: boolean;
  disabled?: boolean;
  sizePx?: number;
  sx?: SxProps<Theme>;
}

export default function ConfirmButton({
  mode = "confirm",
  onChange,
  onClick,
  isConfirmed,
  disabled,
  sizePx = 50,
  sx,
}: ConfirmButtonProps) {
  const theme = useTheme();
  const palette = theme.palette;

  const { isMobile } = useScreenSize();

  const [confirmedLocal, setConfirmedLocal] = useState(false);

  const confirmed = useMemo(
    () => (typeof isConfirmed === "boolean" ? isConfirmed : confirmedLocal),
    [isConfirmed, confirmedLocal],
  );

  const idleBg =
    theme.palette.animalFile.tabBackground ?? theme.palette.action.hover;
  const hoverBg = theme.palette.action.hover;
  const activeBg = theme.palette.action.selected;
  const okBg = theme.palette.appointmentcard.doneIconBackgroundColor;
  const okFg = theme.palette.appointmentcard.doneIconColor;
  const idleFg = palette.animalFile.onClick;
  const border = theme.palette.divider;
  const whiteBackground = theme.palette.common.white;

  const isArrow = mode === "arrow-back" || mode === "arrow-forward";

  const handlePress = () => {
    if (disabled) return;
    if (isArrow) {
      onClick?.();
      return;
    }

    const next = !confirmed;
    if (typeof isConfirmed !== "boolean") {
      setConfirmedLocal(next);
    }
    onChange?.(next);
    onClick?.();
  };

  const bgColor = isArrow ? whiteBackground : confirmed ? okBg : idleBg;

  const iconNode =
    mode === "arrow-back" ? (
      <ArrowBackIcon
        fontSize={isMobile ? "medium" : "large"}
        sx={{ color: idleFg, backgroundColor: whiteBackground }}
      />
    ) : mode === "arrow-forward" ? (
      <ArrowForwardIcon
        fontSize={isMobile ? "medium" : "large"}
        sx={{ color: idleFg, backgroundColor: whiteBackground }}
      />
    ) : (
      <DoneIcon fontSize="large" sx={{ color: confirmed ? okFg : idleFg }} />
    );

  return (
    <IconButton
      onClick={handlePress}
      disabled={disabled}
      sx={{
        width: sizePx,
        height: sizePx,
        borderRadius: "50%",
        backgroundColor: bgColor,
        color: onClick ? idleFg : confirmed ? okFg : idleFg,
        transition: "background-color 0.15s ease, transform 0.05s ease",
        boxShadow: 0,
        "&:hover": {
          backgroundColor: isArrow ? hoverBg : confirmed ? okBg : hoverBg,
        },
        "&:active": {
          transform: "scale(0.96)",
          backgroundColor: isArrow ? activeBg : confirmed ? okBg : activeBg,
        },
        "&.Mui-disabled": {
          opacity: 0.6,
        },
        ...sx,
      }}
      aria-label={
        mode === "arrow-back"
          ? "Zurück"
          : mode === "arrow-forward"
            ? "Weiter"
            : "Bestätigen"
      }
    >
      {iconNode}
    </IconButton>
  );
}
