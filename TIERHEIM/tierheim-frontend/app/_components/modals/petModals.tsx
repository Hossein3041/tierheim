"use client";

import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  useTheme,
  Divider,
} from "@mui/material";
import { FooterBox } from "@/components/footerBox";
import { CustomButton } from "@/components/customButton";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { PETMODALTEXTS } from "@/constants/texts/Texts";
import { PetModalsBasicInformation } from "@/components/modals/petModalsBasicInformation";
import { PetModalsFinderInformation } from "@/components/modals/petModalsFinderInformation";
import { PetModalsCareInformation } from "@/components/modals/petModalsCareInformation";
import { PetModalsBottomActionBar } from "@/components/modals/petModalsBottomActionBar";
import { useUIConfig } from "@/util/useUIConfig";
import { useQuery } from "@tanstack/react-query";
import { fetchPetDetail } from "@/queries/pets/GetPetDetails";
import { PetDetail, PlacementStatusOption } from "@/constants/pets/pets";
import { fetchPetSpecies } from "@/queries/metadata/species";
import { fetchPetBreeds } from "@/queries/metadata/breeds";
import { fetchPetColors } from "@/queries/metadata/colors";
import { fetchUnits } from "@/queries/metadata/units";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import fetchJson from "@/queries/JsonFetcher";
import { UPDATE_PET_ENDPOINT } from "@/queries/Endpoints";
import { toast } from "react-toastify";
import { ConfirmationError } from "@/constants/Error";
import { fetchPetFinders } from "@/queries/metadata/finders";
import { toUpdateBody } from "@/components/modals/petModalsMapper";
import { fetchPetMedications } from "@app/_queries/metadata/medications";
import { fetchPetFoods } from "@app/_queries/metadata/foods";
import { fetchPlacementStatuses } from "@/queries/metadata/placementStatus";

export type OpenPetPayload = {
  name: string;
  breed: string;
  id: number;
  imageUrl: string;
  group: string;
  image?: string;
};

interface PetModalsProps {
  onOpen: boolean;
  onClose: () => void;
  pet: OpenPetPayload;
}

export function PetModals({ onOpen, onClose, pet }: PetModalsProps) {
  const theme = useTheme();
  const loginPalette = theme.palette.login;
  const inputfieldsPalette = theme.palette.inputfields;

  const { useRef, useState, useEffect, useMemo } = React;
  const paperRef = useRef<HTMLDivElement>(null);

  const {
    isMobile,
    isTablet,
    isTabletVertical,
    isTabletHorizontal,
    isDesktop,
    inputHeight,
    buttonFontSize,
  } = useUIConfig();

  const [modalWidth, setModalWidth] = useState<number>(
    isDesktop ? 180 : window.innerWidth * 0.9,
  );

  const queryClient = useQueryClient();
  const [updatedPet, setUpdatedPet] = React.useState<PetDetail | undefined>(
    undefined,
  );
  const [error, setError] = React.useState<string | null>(null);

  const handleModalClose = () => {
    setUpdatedPet(undefined);
    onClose();
  };

  const speciesQuery = useQuery({
    queryKey: ["pet-species"],
    queryFn: () => fetchPetSpecies(),
    enabled: onOpen,
  });

  const breedQuery = useQuery({
    queryKey: ["pet-breeds"],
    queryFn: () => fetchPetBreeds(),
    enabled: onOpen,
  });

  const colorQuery = useQuery({
    queryKey: ["pet-colors"],
    queryFn: () => fetchPetColors(),
    enabled: onOpen,
  });

  const unitQuery = useQuery({
    queryKey: ["pet-units"],
    queryFn: () => fetchUnits(),
    enabled: onOpen,
  });

  const findersQuery = useQuery({
    queryKey: ["pet-finders"],
    queryFn: () => fetchPetFinders(),
    enabled: onOpen,
  });

  const medicationQuery = useQuery({
    queryKey: ["pet-medications"],
    queryFn: () => fetchPetMedications(),
    enabled: onOpen,
  });

  const foodsQuery = useQuery({
    queryKey: ["pet-foods"],
    queryFn: () => fetchPetFoods(),
    enabled: onOpen,
  });

  const { data: detail } = useQuery({
    queryKey: ["pet-detail", pet.id],
    queryFn: () => fetchPetDetail(Number(pet.id)),
    enabled: onOpen && !!pet.id,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    gcTime: 10 * 60 * 1000,
  });

  const placementStatusQuery = useQuery({
    queryKey: ["placement-statuses"],
    queryFn: () => fetchPlacementStatuses(),
    enabled: onOpen,
  });

  useEffect(() => {
    if (!detail) return;

    setUpdatedPet(detail);
  }, [onOpen, detail, setUpdatedPet]);

  const updateMutation = useMutation<PetDetail, Error, PetDetail>({
    mutationFn: async (data: PetDetail) => {
      const url = UPDATE_PET_ENDPOINT.replace("{id}", data.id.toString());
      const payload = toUpdateBody(data);
      return fetchJson<PetDetail>(url, "PUT", payload);
    },
    onSuccess: (resp, variables) => {
      if (resp) {
        queryClient.setQueryData(["pet-detail", variables.id], resp);
      } else {
        queryClient.setQueryData<PetDetail>(
          ["pet-detail", variables.id],
          (old) => (old ? { ...old, ...variables } : old),
        );
      }

      queryClient.invalidateQueries({ queryKey: ["pet-detail", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["pet-overview"] });
      onClose();
    },

    onError: (error) => {
      let message = "Unbekannter Fehler";
      if (error instanceof ConfirmationError) {
        message = "Bestätigung erforderlich. Bitte überprüfe die Daten.";
      } else if (error instanceof Error) {
        if (error.message.includes("400"))
          message = "Ungültige Daten. Bitte überprüfe die Eingaben.";
        else if (error.message.includes("401") || error.message.includes("403"))
          message = "Nicht autorisiert. Bitte erneut einloggen.";
        else message = error.message;
      }
      setError("Fehler beim Speichern: " + message);
      toast.error("Fehler beim Speichern: " + message);
    },
  });

  const handleSave = () => {
    if (!updatedPet) {
      setError("Keine Daten zum Speichern verfügbar");
      toast.error("Keine Daten zum Speichern verfügbar.");
      return;
    }

    if (!updatedPet.name) {
      setError("Name ist erforderlich.");
      toast.error("Name ist erforderlich.");
      return;
    }
    updateMutation.mutate(updatedPet);
  };

  const imageSizeDesktop = 180;
  const imageSizeTabletHorizontal = imageSizeDesktop * 1.4;
  const imageSizeTabletVertical = imageSizeDesktop * 1.07;
  const imageSizeMobile = 0.9 * modalWidth;

  const imageSize = useMemo(() => {
    if (isDesktop) return imageSizeDesktop;
    else if (isTabletHorizontal) return imageSizeTabletHorizontal;
    else if (isTabletVertical) return imageSizeTabletVertical;
    else if (isMobile) return imageSizeMobile;
    else return Math.max(120, Math.min(0.9 * modalWidth, 220));
  }, [
    modalWidth,
    isMobile,
    isTablet,
    isTabletHorizontal,
    isTabletVertical,
    isDesktop,
  ]);

  function getInputHeightIncludingTablet(): number {
    if (isTabletHorizontal) return inputHeight + inputHeight * 0.3;
    else return inputHeight;
  }

  const inputHeightIncludingTablet = getInputHeightIncludingTablet();

  React.useLayoutEffect(() => {
    if (!onOpen) return;
    const update = () => {
      if (paperRef.current) {
        const w = paperRef.current.getBoundingClientRect().width;
        setModalWidth(w);
      }
    };
    update();

    const ro = new ResizeObserver(update);

    if (paperRef.current) ro.observe(paperRef.current);

    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [onOpen]);

  const handleClick = () => {};

  return (
    <>
      <Dialog
        open={onOpen}
        onClose={handleModalClose}
        maxWidth={false}
        onClick={handleClick}
        PaperProps={{
          ref: paperRef,
          sx: {
            width: isDesktop
              ? "640px !important"
              : isMobile
                ? "90vw !important"
                : "80vw !important",
            maxWidth: "100%",
            height: "880px",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
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
            px: 3,
            py: 1,
          }}
        >
          <Typography variant="h6" component="div">
            {PETMODALTEXTS.headline}
          </Typography>
          <IconButton
            onClick={handleModalClose}
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
        <DialogContent
          sx={{
            flex: 1,
            overflowY: "auto",
            px: 1,
          }}
        >
          <PetModalsBasicInformation
            imageSize={imageSize}
            inputHeightIncludingTablet={inputHeightIncludingTablet}
            pet={updatedPet}
            setPet={setUpdatedPet}
            species={speciesQuery.data}
            breed={breedQuery.data}
            colors={colorQuery.data}
            imageUrl={pet?.imageUrl ?? ""}
          />
          <Divider
            sx={{
              mx: isDesktop || isTablet ? 3.5 : 1,
            }}
          />

          <PetModalsFinderInformation
            pet={updatedPet}
            setPet={setUpdatedPet}
            finders={findersQuery.data ?? []}
          />
          <Divider
            sx={{
              mx: isDesktop || isTablet ? 3.5 : 1,
            }}
          />

          <PetModalsCareInformation
            pet={updatedPet}
            setPet={setUpdatedPet}
            units={unitQuery.data ?? []}
            foods={foodsQuery.data ?? []}
            medications={medicationQuery.data ?? []}
            placementStatuses={placementStatusQuery.data ?? []}
            placementStatusesLoading={placementStatusQuery.isLoading}
          />
        </DialogContent>

        <DialogActions
          sx={{
            pt: isDesktop || isTablet ? 1 : 2,
            pb: isDesktop || isTablet ? 1 : 2,
            justifyContent: "space-evenly",
            backgroundColor: inputfieldsPalette.inputTitleFieldColor,
            alignItems: isDesktop || isTablet ? "center" : "flex-end",
          }}
        >
          <PetModalsBottomActionBar
            pet={updatedPet}
            setPet={setUpdatedPet}
            inputfieldsPalette={inputfieldsPalette}
          />
        </DialogActions>
        <Box sx={{ height: (theme) => theme.spacing(0.5) }} />
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "0px",
          }}
        >
          <CustomButton
            onClick={handleModalClose}
            width={isDesktop ? "15%" : "40%"}
            backgroundColor={inputfieldsPalette.inputTitleFieldColor}
            color={inputfieldsPalette.inputTitleColor}
            booleanBoxShadow={false}
            sx={{
              fontSize: buttonFontSize,
            }}
          >
            {PETMODALTEXTS.fieldCancelationButtonInputText}
          </CustomButton>
          <CustomButton
            onClick={handleSave}
            width={isDesktop ? "15%" : "40%"}
            backgroundColor={theme.palette.petmodal.dialogSwitchLabelColor}
            color={loginPalette.loginCardOneColor}
            booleanBoxShadow={false}
            sx={{
              fontSize: buttonFontSize,
            }}
          >
            {PETMODALTEXTS.fieldSaveButtonInputText}
          </CustomButton>
        </DialogActions>
        <Box sx={{ height: (theme) => theme.spacing(0) }} />
        <FooterBox linkText={PETMODALTEXTS.footerBoxLinkText} linkHref="#" />
      </Dialog>
    </>
  );
}
