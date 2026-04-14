import React, { useState, useMemo } from "react";
import {
  Avatar,
  useTheme,
  Box,
  Typography,
  SxProps,
  Theme,
} from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import { useUIConfig } from "@/util/useUIConfig";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import { ANIMALIMAGE } from "@/constants/texts/Texts";

export interface AnimalImageProps {
  name: string;
  alt: string;
  imageUrl: string | null;
  size?: number;
  bRadius?: string;
  isOccupancy?: boolean;
  enableHover?: boolean;
  isDesktop: boolean;
  index?: number;
  onClick?: () => void;
  sx?: SxProps<Theme>;
  petDetails?: boolean;
  highlight?: boolean;
}

const BaseAvatar: React.FC<{
  name: string;
  alt: string;
  imageUrl: string | null;
  size?: number;
  bRadius?: string;
  sx?: SxProps<Theme>;
  setBackgroundColor?: string;
  setColor?: string;
}> = ({ name, imageUrl, size, bRadius, sx, setBackgroundColor, setColor }) => (
  <Avatar
    src={imageUrl || undefined}
    alt={name}
    sx={{
      width: size,
      height: size,
      borderRadius: bRadius,
      boxShadow: 1,
      backgroundColor: imageUrl ? "transparent" : setBackgroundColor,
      color: imageUrl ? "transparent" : setColor,
      ...sx,
    }}
  />
);

export function AnimalImage({
  name,
  imageUrl,
  size,
  bRadius,
  enableHover = false,
  isOccupancy = false,
  onClick,
  sx,
  isDesktop,
  petDetails = false,
  highlight = false,
}: AnimalImageProps) {
  const { isMobile, isTablet } = useUIConfig();
  const isTouch = isMobile || isTablet;
  const theme = useTheme();

  const highlightColor = theme.palette.primary.main;
  const defaultBorder = `2px solid ${theme.palette.animalFile.tabActiveText}`;
  const highlightBorder = `3px solid ${highlightColor}`;

  const showDesktopUploadOverlay = enableHover && isDesktop;
  const showNonDesktopUploadOverlay = enableHover && !isDesktop;
  const pf = theme.palette.inputfields;
  const fieldColor = pf.inputTitleFieldColor;
  const hoverColor = pf.inputTitleFieldHoverColor;
  const clickColor = theme.palette.animalImage.animalImageClickColor;
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const dimension = petDetails ? (size ?? 50) : isMobile ? 50 : (size ?? 50);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), 90);
  };

  const clickHandler = useMemo<(() => void) | undefined>(() => {
    if (enableHover && isDesktop) {
      return () => {
        handleClick();
        if (onClick) onClick();
      };
    }
    if (onClick && !isTouch) return onClick;
    return undefined;
  }, [enableHover, isDesktop, isTouch, onClick]);

  const shouldApplyLightOverlay = !petDetails && isDesktop && isOccupancy;

  const avatarContent = shouldApplyLightOverlay ? (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={clickHandler}
      sx={{
        position: "relative",
        width: dimension,
        height: dimension,
        cursor: "pointer",
        ...sx,
      }}
    >
      <Avatar
        src={imageUrl || undefined}
        alt={name}
        sx={{
          width: dimension,
          height: dimension,
          borderRadius: "35%",
          border: highlight ? highlightBorder : defaultBorder,
          boxShadow: 1,
          backgroundColor: !imageUrl
            ? theme.palette.animalImage.animalImageBackgroundColor
            : undefined,
          transition: "filter 0.2s ease",
          ...(isHovered
            ? {
                filter: "brightness(1.1)",
              }
            : {
                filter: "none",
              }),
          userSelect: "none",
          WebkitUserSelect: "none",
          WebkitTouchCallout: "none",
          touchAction: "none",
        }}
      >
        {!imageUrl && (
          <PetsIcon
            sx={{
              fontSize: dimension ? dimension * 0.6 : undefined,
              color: theme.palette.animalImage.animalImagePetIconColor,
            }}
          />
        )}
      </Avatar>
      {isHovered && (
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            top: -3,
            right: -17,
            bgcolor: theme.palette.animalFile.toolTipBg,
            color: theme.palette.animalFile.tabActive,
            px: 0.5,
            py: 0,
            borderRadius: 25,
            border: highlight ? highlightBorder : defaultBorder,
            fontSize: "0.6rem",
            zIndex: 2,
          }}
        >
          {name || ANIMALIMAGE.animalName}
        </Typography>
      )}
      {isHovered && (
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            inset: 0,
            borderRadius: "35%",
            backgroundColor: theme.palette.animalImage.animalImageHoverColor,
            pointerEvents: "none",
            transition: "background-color 0.2s ease",
            zIndex: 1,
          }}
        />
      )}
    </Box>
  ) : petDetails ? (
    <Box
      sx={{
        position: "relative",
        width: dimension,
        height: dimension,
        ...sx,
      }}
    >
      <BaseAvatar
        name={name}
        alt={name}
        imageUrl={imageUrl}
        size={size}
        bRadius={bRadius}
        setBackgroundColor={theme.palette.login.loginBackgroundColor}
        setColor={theme.palette.animalImage.animalImageColor}
      />
      {enableHover && isDesktop && (
        <Avatar
          src={undefined}
          alt={name}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: size,
            height: size,
            borderRadius: bRadius,
            boxShadow: 1,
            zIndex: "9999",
            opacity: isHovered ? "0.6" : "0",
            backgroundColor: theme.palette.login.loginBackgroundColor,
            color: theme.palette.animalImage.animalImageColor,
            transition: "opacity 0.3s ease",
          }}
        >
          <AddAPhotoOutlinedIcon
            sx={{
              fontSize: size ? size / 3 : 48,
              transform: "scaleX(-1)",
            }}
          />
        </Avatar>
      )}
      {enableHover && !isDesktop && (
        <Avatar
          src={undefined}
          alt={ANIMALIMAGE.uploadImage}
          onClick={handleClick}
          sx={{
            position: "absolute",
            bottom: 15,
            right: 15,
            width: size ? size * 0.17 : 40,
            height: size ? size * 0.17 : 40,
            borderRadius: "50%",
            boxShadow: 2,
            zIndex: "10000",
            backgroundColor: isActive ? clickColor : fieldColor,
            color: theme.palette.animalImage.animalImageColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background-color 0.4s ease",
            "&:hover": {
              backgroundColor: hoverColor,
            },
          }}
        >
          <AddAPhotoOutlinedIcon
            sx={{
              fontSize: size ? size * 0.09 : 24,
              transform: "scaleX(-1)",
            }}
          />
        </Avatar>
      )}
    </Box>
  ) : (
    <Box sx={{ position: "relative" }}>
      <Avatar
        src={imageUrl || undefined}
        alt={name}
        sx={{
          width: dimension,
          height: dimension,
          borderRadius: "35%",
          border: highlight ? highlightBorder : defaultBorder,
          cursor: isOccupancy ? "pointer" : "default",
          boxShadow: 1,
          backgroundColor: !imageUrl
            ? theme.palette.animalImage.animalImageBackgroundColor
            : undefined,
        }}
      >
        {!imageUrl && (
          <PetsIcon
            sx={{
              fontSize: dimension ? dimension * 0.6 : undefined,
              color: theme.palette.animalImage.animalImagePetIconColor,
            }}
          />
        )}
      </Avatar>
      {isOccupancy && isHovered && (
        <Typography
          variant="caption"
          sx={{
            position: "absolute",
            top: -3,
            right: -17,
            bgcolor: theme.palette.animalFile.toolTipBg,
            color: theme.palette.animalFile.tabActive,
            px: 0.5,
            py: 0,
            borderRadius: 25,
            border: highlight ? highlightBorder : defaultBorder,
            fontSize: "0.6rem",
            zIndex: 2,
          }}
        >
          {name || ANIMALIMAGE.animalName}
        </Typography>
      )}
      {isHovered && isOccupancy && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: theme.palette.animalImage.overlayBackground,
            cursor: isOccupancy ? "pointer" : "default",
            borderRadius: "35%",
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );

  return <>{avatarContent}</>;
}