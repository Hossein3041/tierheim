import { Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useUIConfig } from "@/util/useUIConfig";

interface Props {
  title: string;
  count: number;
  max: number;
  setIsActive: (active: boolean) => void;
  onClick?: () => void;
}

export default function RoomHeader({
  title,
  count,
  max,
  setIsActive,
  onClick,
}: Props) {
  const theme = useTheme();
  const palette = theme.palette;

  const [isClicked, setIsClicked] = useState(false);
  const handleMouseDown = () => {
    if (!isMobile) setIsClicked(true);
  };
  const handleMouseUp = () => setIsClicked(false);
  const handleMouseLeave = () => {
    setIsClicked(false);
    setIsActive(false);
  };

  const { isMobile } = useUIConfig();

  return (
    <Box
      id={"room-header-" + title}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      onClick={onClick}
      onMouseEnter={() => setIsActive(true)}
      sx={{
        px: 2.5,
        py: 1.75,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        bgcolor: isClicked
          ? palette.animalFile.onClick
          : palette.animalFile.fill,
        "&:hover": {
          backgroundColor: isClicked
            ? palette.animalFile.onClick
            : palette.animalFile.tabHover,
          boxShadow: "5px 0 5px 0 rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <Typography variant="subtitle2">{title}</Typography>

      <Box
        sx={{
          display: "flex",
          height: "28px",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: `inset 0 0 0 1px ${palette.navigation.boxShadow}`,
        }}
      >
        <Box
          sx={{
            px: 1.5,
            backgroundColor: palette.animalFile.bg2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: palette.navigation.tabText, fontWeight: 500 }}
          >
            {count}
          </Typography>
        </Box>
        <Box
          sx={{
            px: 1.5,
            backgroundColor: palette.navigation.bg2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: palette.animalFile.tabBackground, fontWeight: 500 }}
          >
            {max}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
