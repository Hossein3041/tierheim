"use client";

import { Box, useTheme, SxProps, Theme } from "@mui/material";
import { ReactNode, useState } from "react";

interface CircleIconButtonProps {
  onClick: () => void;
  children: ReactNode;
  size?: number;
  sx?: SxProps<Theme>;
  title?: string;
}

export default function CircleIconButton({
  onClick,
  children,
  size = 40,
  sx,
  title,
}: CircleIconButtonProps) {
  const theme = useTheme();
  const palette = theme.palette.home;

  const [isClicked, setIsClicked] = useState(false);

  const handleMouseDown = () => setIsClicked(true);
  const handleMouseUp = () => setIsClicked(false);
  const handleMouseLeave = () => setIsClicked(false);

  const handleTouchStart = () => setIsClicked(true);
  const handleTouchEnd = () => setIsClicked(false);

  return (
    <Box
      aria-label={title}
      role="button"
      onClick={onClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      sx={{
        bottom: 16,
        left: 10,
        zIndex: 2,
        cursor: "pointer",
        bgcolor: palette.background,
        "&:hover": { bgcolor: palette.hover },
        "&:active": { color: palette.onClick, bgcolor: palette.icon },
        color: palette.icon,
        borderRadius: "50%",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "background-color 0.1s ease-in-out",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
