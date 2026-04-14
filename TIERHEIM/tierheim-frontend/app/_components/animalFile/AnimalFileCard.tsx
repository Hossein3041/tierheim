"use client";

import React, { useState } from "react";
import {
  Box,
  Chip,
  Divider,
  Paper,
  Stack,
  ThemeProvider,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { AnimalImage } from "@/components/animalFile/AnimalImage";
import AppTheme from "@/styles/appTheme";

interface AnimalFileCardProps {
  name: string;
  breed: string;
  id: number;
  chipnumber?: string;
  imageUrl: string;
  locationLabel?: string;
  badgeTopLeft?: "P" | "R";
  showAlertBadge?: boolean;
  group: string;
  onOpenPetModal: (pet: {
    name: string;
    breed: string;
    id: number;
    imageUrl: string;
    group: string;
  }) => void;
}

export default function AnimalFileCard({
  name,
  breed,
  id,
  chipnumber,
  imageUrl,
  locationLabel,
  badgeTopLeft,
  showAlertBadge,
  group,
  onOpenPetModal,
}: AnimalFileCardProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:830px)");
  const isTablet = useMediaQuery("(min-width:830px) and (max-width:1350px)");
  const isDesktop = useMediaQuery("(min-width:1351px)");
  const [isTapped, setIsTapped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleOpenFile = () => {
    onOpenPetModal({ name, breed, id, imageUrl, group });
    if (isMobile) {
      setIsTapped(true);
      setTimeout(() => setIsTapped(false), 200);
    }
  };

  const handleOpenHouse = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const isTouch = isMobile || isTablet;

  const multilineTextStyle = isTouch
    ? {
        display: "-webkit-box",
        WebkitLineClamp: isMobile ? 1 : 3,
        WebkitBoxOrient: "vertical" as const,
        overflow: "hidden",
        wordWrap: "break-word",
        wordBreak: "break-word",
        lineHeight: 1.5,
        mt: isMobile ? 0 : 1,
      }
    : {};

  return (
    <ThemeProvider theme={AppTheme}>
      <Stack
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          mt: 5,
          px: isMobile ? 0 : 2,
        }}
      >
        <Paper
          elevation={1}
          onClick={isMobile ? handleOpenFile : undefined}
          sx={{
            width: isMobile ? 155 : isTablet ? 210 : 300,
            height: isMobile ? "100px" : isTablet ? "145" : "160px",
            borderRadius: "0 0 24px 24px",
            position: "relative",
            pb: 1.5,
            px: isMobile ? 0.75 : 2,
            backgroundColor:
              isMobile && isTapped
                ? theme.palette.animalFile.mobileTap
                : theme.palette.animalFile.tabActiveText,
            overflow: "visible",
            boxShadow:
              isMobile && isTapped ? 4 : !isMobile && isHovered ? 4 : 1,
            transition: "box-shadow 0.2s, background-color 0.2s",
            ...(isMobile && {
              cursor: "pointer",
            }),
          }}
        >
          <Box
            onClick={!isMobile ? handleOpenFile : undefined}
            onMouseEnter={!isMobile ? () => setIsHovered(true) : undefined}
            onMouseLeave={!isMobile ? () => setIsHovered(false) : undefined}
            sx={{
              position: "absolute",
              top: -60,
              left: 0,
              width: "100%",
              height: 60,
              zIndex: 1,
              display: "flex",
              alignItems: "flex-end",
              ...(isMobile
                ? {}
                : {
                    cursor: "pointer",
                  }),
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: isMobile ? 100 : isTablet ? 150 : 170,
                height: 52,
                backgroundColor: isHovered
                  ? theme.palette.animalFile.tabHover
                  : theme.palette.animalFile.tabBackground,
                borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
                transition: "background-color 0.2s",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  bottom: 25,
                  right: -20.6,
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  backgroundColor: theme.palette.common.white,
                  zIndex: 2,
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 25,
                  right: -20,
                  width: 22,
                  height: 11,
                  backgroundColor: isHovered
                    ? theme.palette.animalFile.tabHover
                    : theme.palette.animalFile.tabBackground,
                  borderBottomRightRadius: 10,
                  zIndex: 1,
                  transition: "background-color 0.2s",
                }}
              />
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                height: 25,
                backgroundColor: isHovered
                  ? theme.palette.animalFile.tabHover
                  : theme.palette.animalFile.tabBackground,
                borderTopRightRadius: 12,
                transition: "background-color 0.2s",
              }}
            />
          </Box>

          <Box
            sx={{
              position: "relative",
              width: 64,
              height: 64,
              mt: -4,
              ml: 1,
              zIndex: 2,
            }}
          >
            <AnimalImage
              name={name}
              alt={name}
              imageUrl={imageFile ? URL.createObjectURL(imageFile) : imageUrl}
              size={isMobile ? 50 : 70}
              bRadius="35%"
              enableHover={false}
              sx={{
                border: `2px solid ${theme.palette.animalFile.tabActiveText}`,
                boxShadow: 1,
              }}
              isDesktop={isDesktop}
              petDetails={false}
              // petId={id ?? 0}
            />
            {badgeTopLeft && (
              <Box
                sx={{
                  position: "absolute",
                  top: -4,
                  left: isMobile ? -7 : -4,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  backgroundColor:
                    theme.palette.badge[`${badgeTopLeft}Background`],
                  border: `2px solid ${theme.palette.badge[`${badgeTopLeft}Border`]}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: 1,
                }}
              >
                <Typography
                  sx={{
                    color: theme.palette.badge[`${badgeTopLeft}Text`],
                    fontWeight: "bold",
                    fontSize: 12,
                    lineHeight: 1,
                  }}
                >
                  {badgeTopLeft}
                </Typography>
              </Box>
            )}
            {showAlertBadge && (
              <Box
                sx={{
                  position: "absolute",
                  top: isMobile ? -4 : 55,
                  right: isMobile ? 1 : -12,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  backgroundColor: theme.palette.badge.alertBackground,
                  border: `2px solid ${theme.palette.badge.alertBorder}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: theme.palette.badge.alertText,
                  fontWeight: "bold",
                  fontSize: 12,
                  boxShadow: 1,
                }}
              >
                <Typography>!</Typography>
              </Box>
            )}
          </Box>
          <Box
            sx={{
              mt: isMobile ? 0 : isTablet ? 3 : 4,
              ml: 2,
            }}
          >
            <Typography
              variant="subtitle2"
              fontWeight={600}
              sx={{
                ...(isMobile && { fontSize: 12 }),
                ...multilineTextStyle,
              }}
            >
              {name}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                ...(isMobile && { fontSize: 12 }),
                ...multilineTextStyle,
              }}
            >
              {breed}
            </Typography>
          </Box>
          <Divider
            sx={{
              mt: isMobile ? 0.5 : isTablet ? 1.75 : 2.5,
              mb: { xs: 0.1, sm: 1.5 },
              mx: { xs: 0.1, sm: 0.5 },
            }}
          />

          {isMobile ? (
            <Box
              sx={{
                mt: 0.75,
                px: 1.5,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Chip
                label={locationLabel}
                size="small"
                onClick={handleOpenHouse}
                sx={{
                  backgroundColor: theme.palette.animalFile.chipBg,
                  fontWeight: 500,
                  fontSize: 12,
                  height: 22,
                  width: "100%",
                  px: 1,
                  color: theme.palette.animalFile.secondaryTexts,
                  justifyContent: "center",
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: theme.palette.animalFile.tabHover,
                  },
                }}
              />
            </Box>
          ) : (
            <Box
              sx={{
                ml: 1,
                mt: 1.5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                {chipnumber}
              </Typography>
              <Chip
                label={locationLabel}
                onClick={handleOpenHouse}
                sx={{
                  backgroundColor: theme.palette.animalFile.chipBg,
                  fontWeight: 500,
                  fontSize: 12,
                  height: 22,
                  px: !isMobile ? 0.75 : 0,
                  color: theme.palette.animalFile.secondaryTexts,
                  cursor: "pointer",
                  "&:hover": {
                    backgroundColor: theme.palette.animalFile.tabHover,
                  },
                }}
              />
            </Box>
          )}
        </Paper>
      </Stack>
    </ThemeProvider>
  );
}
