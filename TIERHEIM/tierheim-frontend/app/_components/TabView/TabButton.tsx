import {
  Box,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { Theme } from "@mui/material/styles";
import { useScreenSize } from "@app/_util/useScreenSize";

interface TabButtonProps {
  title: string;
  onClick?: () => void;
  isActive?: boolean;
  disabled?: boolean;
  sx?: SxProps<Theme>;
  isArchived?: boolean;
  tabNameIsTooLong?: boolean;
}

export default function TabButton({
  onClick,
  title,
  isActive,
  disabled = false,
  sx,
  isArchived = false,
}: TabButtonProps) {
  const { isMobile, isTablet } = useScreenSize();

  const dim = isMobile ? "28px" : "35px";
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const theme = useTheme();
  const palette = theme.palette.animalFile;

  const handleMouseDown = () => setIsClicked(true);
  const handleMouseUp = () => setIsClicked(false);
  const handleMouseLeave = () => setIsClicked(false);

  const handleClick = () => {
    if (!disabled) {
      if (onClick) {
        onClick();
      }
    }
  };

  const bg = disabled
    ? palette.tabDisabledBackground
    : isActive
      ? palette.tabActive
      : isClicked
        ? palette.onClick
        : isHovered
          ? palette.tabHover
          : palette.tabBackground;

  const textColor = disabled
    ? palette.tabDisabledText
    : isActive
      ? palette.tabActiveText
      : palette.tabText;

  return (
    <Stack
      flexDirection="row"
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseLeave();
      }}
    >
      {!isMobile && (
        <Box
          sx={{
            backgroundColor: bg,
            height: dim,
            width: isTablet ? "9px" : "15px",
          }}
        >
          <Box
            sx={{
              backgroundColor: palette.fill,
              height: "inherit",
              width: "inherit",
              borderBottomRightRadius: "1.5rem",
            }}
          />
        </Box>
      )}
      <Box
        sx={{
          backgroundColor: bg,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: textColor,
          width: isMobile ? "auto" : "110px",
          px: 0.5,
          minHeight: dim,
          borderRadius: isMobile ? "0.5rem 0.5rem 0 0" : "1.5rem 1.5rem 0 0",
          cursor: disabled ? "default" : "pointer",
          fontWeight: 500,
          fontSize: isMobile ? "0.8rem" : "1rem",
          userSelect: "none",
          opacity: disabled ? 0.6 : 1,
          ...sx,
        }}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        title={title}
      >
        <Typography
          sx={{
            ...(isArchived && {
              fontSize: 12,
              lineHeight: 1.1,
            }),
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            px: 1,
          }}
        >
          {title}
        </Typography>
      </Box>
      {!isMobile && (
        <Box sx={{ backgroundColor: bg, height: dim, width: "15px" }}>
          <Box
            sx={{
              backgroundColor: palette.fill,
              height: "inherit",
              width: "inherit",
              borderBottomLeftRadius: "1.5rem",
            }}
          />
        </Box>
      )}
    </Stack>
  );
}
