"use client";

import * as React from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Switch,
  FormControlLabel,
  Backdrop,
  useTheme,
  Divider,
  useMediaQuery,
  Stack,
} from "@mui/material";

import { FooterBox } from "@/components/footerBox";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { PETMODALTEXTS, PETS } from "@/constants/texts/Texts";
import { RoomPetDetails } from "@/components/room/roomPetDetails";
import { useUIConfig } from "@/util/useUIConfig";
import { PetData } from "@/constants/pets/pets";
import RoomPetHeader from "@/components/room/RoomPetHeader";
import RoomPetPlaceHolder, {
  RoomPetPlaceholder,
} from "@/components/room/roomPetPlaceholder";
import Skeleton from "@mui/material/Skeleton";
import RoomPetSkeleton from "@/components/room/roomPetSkeleton";
import RoomPetHeaderSkeleton from "@/components/room/RoomPetHeaderSkeleton";

interface RoomModalsProps {
  open: boolean;
  onClose: () => void;
  roomTitle: string;
  houseTitle: string;
  onOpenPetModal: (pet: {
    name: string;
    breed: string;
    id: number;
    imageUrl: string;
    group: string;
  }) => void;
  pets: PetData[];
  units?: Array<{ id: number | string; name: string }>;
  loading?: boolean;
  skeletonUnitCount?: number;
}

export default function RoomModals({
  open,
  onClose,
  roomTitle,
  houseTitle,
  onOpenPetModal,
  pets,
  units,
  loading,
  skeletonUnitCount,
}: RoomModalsProps) {
  const theme = useTheme();
  const petModals = theme.palette.petmodal;

  const handleOpenPet = (pet: any) =>
    onOpenPetModal({
      name: pet.name,
      breed:
        typeof pet.breed === "string"
          ? pet.breed
          : pet.breed?.name || PETS.unknown,
      id: pet.id,
      imageUrl: pet.image || "",
      group: pet.locationUnit || "",
    });

  const {
    isMobile,
    isTablet,
    isTabletVertical,
    isTabletHorizontal,
    isDesktop,
    isMobileLayout,
    isTabletLayout,
    isDesktopLayout,
    inputHeight,
    inputSpecialHeight,
    labelFontSize,
    inputFontSize,
    buttonFontSize,
    isLandscape,
  } = useUIConfig();

  const { useRef, useState, useEffect, useMemo } = React;
  const paperRef = useRef<HTMLDivElement>(null);
  const [modalWidth, setModalWidth] = useState<number>(
    isDesktop ? 180 : window.innerWidth * 0.9,
  );

  useEffect(() => {
    const updateWidth = () => {
      if (paperRef.current) {
        const w = paperRef.current.getBoundingClientRect().width;
        setModalWidth(w);
      }
    };

    const timeout = setTimeout(updateWidth, 0);

    const ro = new ResizeObserver((entries) => {
      if (entries[0]) {
        const w = entries[0].contentRect.width;
        setModalWidth(w);
      }
    });

    if (paperRef.current) ro.observe(paperRef.current);

    window.addEventListener("resize", updateWidth);

    return () => {
      clearTimeout(timeout);
      ro.disconnect();
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const NO_UNIT_KEY = "__no_unit__";

  const groups = React.useMemo(() => {
    type Group = {
      unitId: number | string;
      title?: string;
      hasHeader: boolean;
      pets: PetData[];
    };

    const map = new Map<number | string, { title?: string; pets: PetData[] }>();

    (units ?? []).forEach((u) => {
      map.set(u.id, { title: u.name, pets: [] });
    });

    for (const p of pets) {
      const key = p.unit?.id ?? NO_UNIT_KEY;
      if (!map.has(key)) map.set(key, { title: p.unit?.name, pets: [] });
      map.get(key)!.pets.push(p);
    }
    return Array.from(map.entries()).map<Group>(([key, value]) => ({
      unitId: key,
      title: value.title,
      hasHeader: key !== NO_UNIT_KEY && Boolean(value.title),
      pets: value.pets,
    }));
  }, [pets, units]);

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth={false}
        fullWidth
        sx={{
          "& .MuiDialog-container": {
            p: 0,
          },
          "& .MuiPaper-root": {
            m: 0,
            width: isMobile ? "93%" : "650px",
            maxWidth: "100%",
            borderRadius: "25px",
          },
        }}
        PaperProps={{
          ref: paperRef,
          sx: {
            height: "750px",
            display: "flex",
            flexDirection: "column",
            backgroundColor: petModals.dialogVerticalDivLineColor,
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: theme.palette.petmodal.dialogSwitchCheckedTrackColorBlue,
            color: theme.palette.petmodal.dialogTitleColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: !isMobile ? 4.5 : 3,
            py: loading ? 0.5 : isMobile ? 1.3 : 2,
          }}
        >
          {loading ? (
            <Skeleton
              variant="text"
              animation="wave"
              sx={{
                fontSize: isMobile ? "1.1rem" : "1.4rem",
                width: isMobile ? "85%" : "90%",
                height: isMobile ? "45px" : "50px",
              }}
            />
          ) : (
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontSize: isMobile ? "1.1rem" : "1.4rem",
              }}
            >
              {houseTitle} | {roomTitle}
            </Typography>
          )}
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: theme.palette.petmodal.dialogXColor,
              transition: "color 0.3s ease",
              "&:hover": { color: theme.palette.petmodal.dialogXHoverColor },
              cursor: "pointer",
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>

        <Box
          sx={{
            pl: 3,
            pr: 3,
            borderRadius: "25px",
          }}
        >
          {loading ? (
            Array.from({ length: skeletonUnitCount ?? 3 }).map((_, i) => (
              <React.Fragment key={i}>
                <RoomPetHeaderSkeleton />
                <RoomPetSkeleton withHeader={true} />
              </React.Fragment>
            ))
          ) : groups.length === 0 ? (
            <RoomPetPlaceholder
              key="empty-no-units"
              borderRadiusTop={true}
              bgWhite={true}
              borderRadiusBottom={true}
            />
          ) : (
            groups.map((group) => (
              <React.Fragment key={group.unitId}>
                {group.hasHeader && <RoomPetHeader title={group.title!} />}
                {group.pets.length === 0 ? (
                  <RoomPetPlaceholder
                    key={`empty-${group.unitId}`}
                    borderRadiusTop={!group.hasHeader}
                    bgWhite={true}
                    borderRadiusBottom={true}
                  />
                ) : (
                  group.pets.map((pet: PetData, index) => (
                    <RoomPetDetails
                      key={pet.id}
                      borderRadiusTop={!group.hasHeader && index === 0}
                      bgWhite={index % 2 === 0}
                      borderRadiusBottom={index === group.pets.length - 1}
                      onOpenPetModal={() => {

                        onOpenPetModal({
                          name: pet.name,
                          breed: pet.breed?.name || PETS.unknown,
                          id: pet.id,
                          imageUrl: pet.image || "",
                          group: pet.locationUnit || "",
                        });
                      }}
                      pet={pet}
                    />
                  ))
                )}
              </React.Fragment>
            ))
          )}
        </Box>
        <Box sx={{ mt: 5 }} />
        <FooterBox sx={{ mt: "auto", height: "30px" }} linkText="" />
      </Dialog>
    </>
  );
}
