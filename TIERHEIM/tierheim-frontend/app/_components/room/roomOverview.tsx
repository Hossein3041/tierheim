"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Paper, useTheme, Typography } from "@mui/material";
import { AnimalImage } from "@/components/animalFile/AnimalImage";
import RoomHeader from "@/components/room/roomHeader";
import { useUIConfig } from "@/util/useUIConfig";
import RoomModals from "@/components/room/roomModals";
import { DRAGANDDROP, PETS, ROOMPETMODALTEXTS } from "@/constants/texts/Texts";
import { PetData, PetSex } from "@/constants/pets/pets";
import { RoomConfig } from "@/components/house/types";
import { SectionDetail } from "@/constants/pets/petSectionID";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SectionPetSummary } from "@/constants/pets/petLocations";
import { useDrop } from "react-dnd";
import UnitConfirmationDialog from "@/components/room/unitConfimationDialog";
import { fetchUnitsBySection } from "@/queries/units/GetUnitsBySection";
import { fetchSectionDetail } from "@/queries/pets/GetOverviewSectionID";
import DragAndDrop from "@/components/room/DragAndDrop";
import DropZone from "@/components/room/DropZone";
import { GlobalDragLayer } from "@/components/room/GlobalDragLayer";
import { normalizeQuery, includesNormalized } from "@/util/searchbarUtils";

interface RoomOverviewProps {
  houseTitle: string;
  room: RoomConfig;
  onOpenPetModal: (pet: {
    name: string;
    breed: string;
    id: number;
    imageUrl: string;
    group: string;
  }) => void;
  onMovePet?: (
    fromSectionId: number,
    toSectionId: number,
    petId: number,
    toUnitId: string,
  ) => void;
  isActiveRoom: boolean;
  edgeZone?: "left" | "right" | "none";
  searchQuery?: string;
}

export default function RoomOverview({
  houseTitle,
  room,
  onOpenPetModal,
  onMovePet,
  isActiveRoom,
  edgeZone,
  searchQuery,
}: RoomOverviewProps) {
  const theme = useTheme();
  const palette = theme.palette.animalFile;

  const q = normalizeQuery(searchQuery);

  const { title, count, max } = room;
  const pets = room.pets ?? [];
  const isRoomEmpty = pets.length === 0;

  const handleOpenPet = (pet: any) => {
    onOpenPetModal({
      name: pet.name,
      breed: pet.species || PETS.unknown,
      id: pet.id,
      imageUrl: pet.image || "",
      group: pet.locationUnit || "",
    });
  };

  const {
    isMobile,
    isTablet,
    isTabletVertical,
    isTabletHorizontal,
    isDesktop,
  } = useUIConfig();

  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPetRoomModalOpen, setIsPetRoomModalOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [pendingMove, setPendingMove] = useState<{
    petId: number;
    fromSectionId: number;
    toSectionId: number;
  } | null>(null);
  const placeholders = Math.max(0, count - pets.length);
  const emptySlots = Array(placeholders).fill(null);
  const imageSize = isMobile || isTablet ? 50 : 70;
  const minRoomContentHeight = imageSize + 40;
  const sectionId = Number(room.id);
  const DEAD_ANIMALS_SECTION_ID = 43;
  const isDeadAnimalsSection = sectionId === DEAD_ANIMALS_SECTION_ID;

  const {
    data: sectionDetail,
    refetch: refetchSection,
    isLoading: isSectionLoading,
    isFetching: isSectionFetching,
    isRefetching: isSectionRefetching,
  } = useQuery<SectionDetail>({
    queryKey: ["section-detail", sectionId],
    queryFn: () => fetchSectionDetail(sectionId),
    enabled: false,
    refetchOnWindowFocus: false,
    staleTime: 30 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const modalPets: PetData[] = useMemo(() => {
    if (!sectionDetail) return [];
    const list: PetData[] = [];
    for (const u of sectionDetail.units) {
      for (const p of u.pets) {
        list.push({
          id: p.id,
          name: p.name,
          chipNumber: p.chipNr ?? null,
          image: p.image ?? null,
          birthdate: "",
          isRegistered: false,
          isCastrated: false,
          foundLocation: null,
          dateFound: "",
          isExtraInvoice: false,
          specialNotes: null,
          sex: PetSex.UNKNOWN,
          locationUnit: u.name,
          placementStatusId: null,
          placementStatusName: "Available",
          isActive: true,
          species: { id: 0, name: "" },
          breed: { id: 0, name: p.breed ?? "" },
          color: { id: 0, name: "" },
          finder: { id: 0, name: "" },
          unit: { id: u.id, name: u.name },
          locationShortName: "",
          sectionShortName: "",
        });
      }
    }
    return list;
  }, [sectionDetail]);

  const units = useMemo(() => {
    if (!sectionDetail) return [];
    return sectionDetail.units.map((u) => ({
      id: u.id,
      name: u.name,
    }));
  }, [sectionDetail]);

  const handleOpenFile = async () => {
    await refetchSection();
    setIsPetRoomModalOpen(true);
  };

  const handleCloseFile = () => {
    setIsPetRoomModalOpen(false);
  };

  const handleImageClick = (pet: SectionPetSummary) => {
    onOpenPetModal({
      name: pet.name,
      breed: pet.species || PETS.unknown,
      id: pet.petId,
      imageUrl: pet.image || "",
      group: title,
    });
  };

  const contentPaddingSx = {
    pl: isMobile || isTabletHorizontal ? 2 : isTabletVertical ? 1 : 2.5,
    pr: isMobile || isTabletHorizontal ? 2 : isTabletVertical ? 1 : 2.5,
    pt: 2,
    pb: 3,
  } as const;

  const gridBaseSx = {
    pt: 2,
    pb: 3,
    display: "grid",
    justifyItems: "center",
    rowGap: 2.5,
    columnGap: isMobile ? 1.5 : isTabletVertical ? 0 : 2,
    alignContent: "start",
    boxSizing: "border-box",
  } as const;

  const normalRoomGridSx = {
    ...gridBaseSx,
    gridTemplateColumns: "repeat(4, minmax(50px, 1fr))",
    minHeight: minRoomContentHeight,
  } as const;

  const deadRoomGridSx = {
    ...contentPaddingSx,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignContent: "flex-start",
    gap: isMobile ? 1.5 : isTabletVertical ? 0 : 2,
    boxSizing: "border-box",
    minHeight: minRoomContentHeight,
  };

  const renderPetCell = (pet: SectionPetSummary, enableDrag: boolean) => {
    const isMatch = includesNormalized(pet.name, q);

    const imageNode = (
      <AnimalImage
        name={pet.name}
        alt={pet.name}
        imageUrl={pet.image || ""}
        size={imageSize}
        isOccupancy={true}
        onClick={
          isTablet || isDesktop ? () => handleImageClick(pet) : undefined
        }
        isDesktop={isDesktop || isTablet}
        petDetails={false}
        highlight={isMatch}
      />
    );

    if (!enableDrag) {
      return <Box key={pet.petId}>{imageNode}</Box>;
    }

    return (
      <DragAndDrop
        key={pet.petId}
        petId={pet.petId}
        sectionId={sectionId}
        imageUrl={imageFile ? URL.createObjectURL(imageFile) : pet.image}
        name={pet.name}
        size={imageSize}
      >
        {imageNode}
      </DragAndDrop>
    );
  };

  return (
    <>
      <Paper
        id={"room-" + sectionId}
        elevation={3}
        sx={{
          borderRadius: 6,
          overflow: "hidden",
          backgroundColor:
            isActive && !isMobile
              ? palette.tabBackground
              : palette.tabBackground,
          width: isDeadAnimalsSection ? "100%" : 360,
          flex: isDeadAnimalsSection ? "0 0 100%" : "0 0 360px",
          maxWidth: isDeadAnimalsSection ? "100%" : 360,
          flexShrink: 0,
          boxShadow:
            isActive && !isMobile ? theme.shadows[4] : theme.shadows[2],
          cursor: isMobile ? "pointer" : "default",
          display: "flex",
          flexDirection: "column",

          ...(isDeadAnimalsSection && {
            width: "100%",
            flex: "0 0 100% !important",
            maxWidth: "100% !important",
          }),
        }}
      >
        <RoomHeader
          onClick={handleOpenFile}
          title={title}
          count={count}
          max={max}
          setIsActive={isDesktop || isTablet ? setIsActive : () => {}}
        />

        {isDeadAnimalsSection ? (
          <Box sx={deadRoomGridSx}>
            {pets.map((pet) => renderPetCell(pet, false))}
            {emptySlots.map((_, i) => (
              <AnimalImage
                key={`empty-${i}`}
                name=""
                alt=""
                imageUrl=""
                size={imageSize}
                isOccupancy={true}
                isDesktop={isDesktop || isTablet}
                petDetails={false}
              />
            ))}
          </Box>
        ) : (
          <DropZone
            toSectionId={sectionId}
            onDropPet={({ petId, fromSectionId, toSectionId }) => {
              if (fromSectionId === toSectionId) return;
              setPendingMove({ petId, fromSectionId, toSectionId });
              setOpenConfirmDialog(true);
            }}
            isActiveRoom={isActiveRoom}
            edgeZone={edgeZone}
            sx={{
              ...contentPaddingSx,
              ...normalRoomGridSx,
            }}
          >
            {isRoomEmpty ? (
              <Box
                sx={{
                  gridColumn: "1 / -1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: minRoomContentHeight,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{ color: theme.palette.grey[500], opacity: 0.7 }}
                >
                  {ROOMPETMODALTEXTS.roomPetPlaceholderText}
                </Typography>
              </Box>
            ) : (
              <>
                {pets.map((pet) => renderPetCell(pet, true))}
                {emptySlots.map((_, i) => (
                  <AnimalImage
                    key={`empty-${i}`}
                    name=""
                    alt=""
                    imageUrl=""
                    size={imageSize}
                    isOccupancy={true}
                    isDesktop={isDesktop || isTablet}
                    petDetails={false}
                  />
                ))}
              </>
            )}
          </DropZone>
        )}
      </Paper>
      <RoomModals
        open={isPetRoomModalOpen}
        onClose={handleCloseFile}
        roomTitle={title}
        houseTitle={houseTitle}
        onOpenPetModal={handleOpenPet}
        pets={modalPets}
        units={units}
        loading={isSectionLoading || isSectionFetching || isSectionRefetching}
        skeletonUnitCount={units?.length ?? 3}
      />
      <UnitConfirmationDialog
        open={openConfirmDialog}
        onClose={() => {
          setOpenConfirmDialog(false);
          setPendingMove(null);
        }}
        onConfirm={(unitId) => {
          if (pendingMove) {
            onMovePet?.(
              pendingMove.fromSectionId,
              pendingMove.toSectionId,
              pendingMove.petId,
              unitId,
            );
            setOpenConfirmDialog(false);
            setPendingMove(null);
          }
        }}
        roomName={title}
        count={count}
        max={max}
        onOpenRoomModal={handleOpenFile}
        pendingMove={pendingMove}
      />
    </>
  );
}
