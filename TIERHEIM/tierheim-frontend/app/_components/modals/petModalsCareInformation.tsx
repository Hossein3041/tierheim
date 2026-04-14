import * as React from "react";
import { Grid } from "@mui/material";
import { CustomInputField } from "@/components/customInputFields";
import { CustomDropdownField } from "@/components/customDropdownField";
import { PETMODALTEXTS } from "@/constants/texts/Texts";
import { SelectChangeEvent } from "@mui/material";
import { useUIConfig } from "@/util/useUIConfig";
import { NameIdPair, PetDetail, Room } from "@/constants/pets/pets";
import { generateDropdownOptions } from "@/util/transformutils";
import CustomComboField from "../customComboField";

type PlacementStatusOption = { id: number; name: string; displayName?: string };

interface PetModalsCareInformationProps {
  pet?: PetDetail | undefined;
  units?: Room[] | undefined;
  foods?: NameIdPair[];
  medications?: NameIdPair[];
  placementStatuses?: PlacementStatusOption[];
  placementStatusesLoading?: boolean;
  setPet?: (pet: PetDetail) => void;
}

const MAX_MULTI_ITEMS = 5;
const DEAD_ANIMALS_SECTION_NAME = "Tote Tiere";

export const PetModalsCareInformation: React.FC<
  PetModalsCareInformationProps
> = ({
  pet,
  units,
  foods,
  medications,
  placementStatuses,
  placementStatusesLoading,
  setPet,
}) => {
  const {
    isTablet,
    isDesktop,
    inputHeight,
    inputSpecialHeight,
    inputFontSize,
  } = useUIConfig();

  const [species, setSpecies] = React.useState<string | number>("");

  const registrationOptions: Array<{ value: string; label: string }> = [
    { value: "true", label: "Ja" },
    { value: "false", label: "Nein" },
  ];

  const handleRoomChange = (
    event: SelectChangeEvent<string | number>,
    _child: React.ReactNode,
  ) => {
    const newRoomId = Number(event.target.value);
    const selectedRoom = units?.find((u) => u.id === newRoomId);
    if (pet && setPet && selectedRoom) {
      setPet({
        ...pet,
        room: {
          id: selectedRoom.id,
          name: selectedRoom.name,
          default: selectedRoom.default,
          section: selectedRoom.section,
          location: selectedRoom.location,
        },
      });
    }
  };

  const handleFeedChange = (newValues: NameIdPair[]) => {
    if (pet && setPet) {
      setPet({
        ...pet,
        foods: (newValues || []).slice(0, MAX_MULTI_ITEMS),
      });
    }
  };

  const handleMedicationChange = (newValues: NameIdPair[]) => {
    if (pet && setPet) {
      setPet({
        ...pet,
        medications: (newValues || []).slice(0, MAX_MULTI_ITEMS),
      });
    }
  };

  const handleChipNumberChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (pet && setPet) {
      setPet({ ...pet, chipNumber: event.target.value });
    }
  };

  const handleRegistrationChange = (
    event: SelectChangeEvent<string | number>,
    _child: React.ReactNode,
  ) => {
    const newValue = event.target.value === "true";
    if (pet && setPet) {
      setPet({ ...pet, registered: newValue });
    }
  };

  const handleCastrationChange = (
    event: SelectChangeEvent<string | number>,
    _child: React.ReactNode,
  ) => {
    const newValue = event.target.value === "true";
    if (pet && setPet) {
      setPet({ ...pet, neutered: newValue });
    }
  };

  const handleSpecialFeaturesChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (pet && setPet) {
      setPet({ ...pet, specialCharacteristics: event.target.value });
    }
  };

  const handleSpeciesChange = (
    event: SelectChangeEvent<string | number>,
    _child: React.ReactNode,
  ) => {
    setSpecies(event.target.value);
  };

  const placementStatusOptions =
    (placementStatuses ?? []).map((s) => ({
      value: s.id,
      label: s.displayName ?? s.name,
    })) ?? [];

  const handlePlacementStatusChange = (
    event: SelectChangeEvent<string | number>,
  ) => {
    const v =
      event.target.value === "" ? undefined : Number(event.target.value);
    if (pet && setPet) {
      setPet({ ...pet, placementStatusId: v });
    }
  };

  const dropdownOptions = generateDropdownOptions(units ?? []);
  const selectedValue = pet?.room?.id ?? "";
  const isDesktopOrTablet = isDesktop || isTablet;
  const isDeadAnimalsSection = pet?.room?.section === DEAD_ANIMALS_SECTION_NAME;

  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{
          px: isDesktopOrTablet ? 1 : 0,
          pt: 2,
          mr: isDesktopOrTablet ? 2.5 : 1,
          ml: isDesktopOrTablet ? 2.5 : 0.5,
        }}
      >
        {isDesktopOrTablet ? (
          <>
            <Grid size={8}>
              <CustomDropdownField
                id="field-room"
                label={PETMODALTEXTS.fieldRoomLabelText}
                value={selectedValue}
                onChange={handleRoomChange}
                options={dropdownOptions}
                displayEmpty
                fullWidth
                height={inputHeight}
                setInputFontSize={inputFontSize}
                disabled={isDeadAnimalsSection}
              />
            </Grid>
            <Grid size={4}>
              <CustomDropdownField
                id="field-placement-status"
                label={
                  (PETMODALTEXTS as any).fieldPlacementStatusLabelText ??
                  "Status"
                }
                value={pet?.placementStatusId?.toString() ?? ""}
                onChange={handlePlacementStatusChange}
                disabled={placementStatusesLoading}
                options={placementStatusOptions}
                displayEmpty
                fullWidth
                height={inputHeight}
                setInputFontSize={inputFontSize}
              />
            </Grid>
            <Grid size={12} sx={{ mt: 2 }}>
              <CustomComboField
                id="field-feed"
                label={PETMODALTEXTS.fieldFeedLabelText}
                options={foods || []}
                value={pet?.foods ?? []}
                multiple
                freeSolo
                onChange={handleFeedChange}
              />
            </Grid>

            <Grid size={12} sx={{ mt: 2 }}>
              <CustomComboField
                id="field-medication"
                label={PETMODALTEXTS.fieldMedicationLabelText}
                options={medications || []}
                value={pet?.medications ?? []}
                multiple
                freeSolo
                onChange={handleMedicationChange}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid size={6}>
              <CustomDropdownField
                id="field-room"
                label={PETMODALTEXTS.fieldRoomLabelText}
                value={selectedValue}
                onChange={handleRoomChange}
                options={dropdownOptions}
                displayEmpty
                fullWidth
                height={inputHeight}
                setInputFontSize={inputFontSize}
                disabled={isDeadAnimalsSection}
              />
            </Grid>
            <Grid size={6}>
              <CustomDropdownField
                id="field-placement-status"
                label={
                  (PETMODALTEXTS as any).fieldPlacementStatusLabelText ??
                  "Status"
                }
                value={pet?.placementStatusId?.toString() ?? ""}
                onChange={handlePlacementStatusChange}
                disabled={placementStatusesLoading}
                options={placementStatusOptions}
                displayEmpty
                fullWidth
                height={inputHeight}
                setInputFontSize={inputFontSize}
              />
            </Grid>

            <Grid size={12} sx={{ mt: 2 }}>
              <CustomComboField
                id="field-feed"
                label={PETMODALTEXTS.fieldFeedLabelText}
                options={foods || []}
                value={pet?.foods ?? []}
                multiple
                freeSolo
                onChange={handleFeedChange}
              />
            </Grid>

            <Grid size={12} sx={{ mt: 2 }}>
              <CustomComboField
                id="field-medication"
                label={PETMODALTEXTS.fieldMedicationLabelText}
                options={medications || []}
                value={pet?.medications ?? []}
                multiple
                freeSolo
                onChange={handleMedicationChange}
              />
            </Grid>
          </>
        )}
      </Grid>

      <Grid
        container
        spacing={1}
        sx={{
          px: isDesktopOrTablet ? 1 : 0,
          pt: 2,
          mr: isDesktopOrTablet ? 2.5 : 1,
          ml: isDesktopOrTablet ? 2.5 : 0.5,
        }}
      >
        {isDesktopOrTablet ? (
          <>
            <Grid size={4}>
              <CustomInputField
                id="field-chipnumber"
                label={PETMODALTEXTS.fieldChipnumberLabelText}
                value={pet?.chipNumber ?? ""}
                type="text"
                onChange={handleChipNumberChange}
                fullWidth
                height={inputHeight}
              />
            </Grid>
            <Grid size={4}>
              <CustomDropdownField
                id="field-registration"
                label={PETMODALTEXTS.fieldRegistrationLabelText}
                value={pet?.registered?.toString() ?? ""}
                onChange={handleRegistrationChange}
                options={registrationOptions}
                displayEmpty
                fullWidth
                height={inputHeight}
              />
            </Grid>
            <Grid size={4}>
              <CustomDropdownField
                id="field-castration"
                label={PETMODALTEXTS.fieldCastrationLabelText}
                value={pet?.neutered?.toString() ?? ""}
                onChange={handleCastrationChange}
                options={registrationOptions}
                displayEmpty
                fullWidth
                height={inputHeight}
                setInputFontSize={inputFontSize}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid size={6}>
              <CustomDropdownField
                id="field-registration"
                label={PETMODALTEXTS.fieldRegistrationLabelText}
                value={pet?.registered?.toString() ?? ""}
                onChange={handleRegistrationChange}
                options={registrationOptions}
                displayEmpty
                fullWidth
                height={inputHeight}
              />
            </Grid>
            <Grid size={6}>
              <CustomDropdownField
                id="field-castration"
                label={PETMODALTEXTS.fieldCastrationLabelText}
                value={pet?.neutered?.toString() ?? ""}
                onChange={handleCastrationChange}
                options={registrationOptions}
                displayEmpty
                fullWidth
                height={inputHeight}
                setInputFontSize={inputFontSize}
              />
            </Grid>
            <Grid size={12}>
              <CustomInputField
                id="field-chipnumber"
                label={PETMODALTEXTS.fieldChipnumberLabelText}
                value={pet?.chipNumber ?? ""}
                type="text"
                onChange={handleChipNumberChange}
                fullWidth
                height={inputHeight}
              />
            </Grid>
          </>
        )}
      </Grid>

      <Grid
        container
        spacing={1}
        sx={{
          px: isDesktopOrTablet ? 1 : 0,
          pt: 2,
          mr: isDesktopOrTablet ? 2.5 : 1,
          ml: isDesktopOrTablet ? 2.5 : 0.5,
        }}
      >
        <Grid size={12}>
          <CustomInputField
            id="field-Specialfeatures"
            label={PETMODALTEXTS.fieldSpecialfeaturesLabelText}
            value={pet?.specialCharacteristics ?? ""}
            onChange={handleSpecialFeaturesChange}
            type="text"
            fullWidth
            height={isDesktopOrTablet ? inputHeight : inputSpecialHeight}
            bRadius="20px"
            specialFeaturesDesktop={isDesktop}
            setInputFontSize={inputFontSize}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default PetModalsCareInformation;
