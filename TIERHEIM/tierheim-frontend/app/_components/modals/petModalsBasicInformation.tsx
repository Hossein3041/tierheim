import * as React from "react";
import { Grid, useTheme } from "@mui/material";
import { CustomInputField } from "@/components/customInputFields";
import { CustomDatePicker } from "@/components/customDatePicker";
import { CustomDropdownField } from "@/components/customDropdownField";
import { AnimalImage } from "@/components/animalFile/AnimalImage";
import { PETMODALTEXTS, ANIMALIMAGE } from "@/constants/texts/Texts";
import { SelectChangeEvent } from "@mui/material";
import { useUIConfig } from "@/util/useUIConfig";
import { Breed, Color, PetDetail, Species } from "@/constants/pets/pets";
import {
  mapBreedToOptions,
  mapColorsToOptions,
  mapSexToOptions,
  mapSpeciesToOptions,
} from "@/util/transformutils";
import { useEffect, useState } from "react";

interface PetModalsBasicInformation {
  imageSize?: number;
  inputHeightIncludingTablet?: number;
  pet?: PetDetail;
  species?: Species[] | undefined;
  setPet?: (pet: PetDetail) => void;
  breed?: Breed[] | undefined;
  colors?: Color[] | undefined;
  imageUrl: string;
}

export const PetModalsBasicInformation: React.FC<PetModalsBasicInformation> = ({
  imageSize,
  inputHeightIncludingTablet,
  pet,
  species,
  setPet,
  breed,
  colors,
  imageUrl,
}) => {
  const {
    isTablet,
    isDesktop,
    isTabletVertical,
    labelFontSize,
    inputFontSize,
  } = useUIConfig();

  const [sex, setSex] = React.useState<string | number>(pet?.sex ?? "");
  const [currentImageUrl, setCurrentImageUrl] = useState<string | null>(
    imageUrl,
  );

  const handleSexChange = (
    event: SelectChangeEvent<string | number>,
    _child: React.ReactNode,
  ) => {
    const newSex = event.target.value;
    setSex(newSex);
    if (pet && setPet) {
      setPet({ ...pet, sex: newSex as string });
    }
  };

  const handleSpeciesChange = (
    event: SelectChangeEvent<string | number>,
    _child: React.ReactNode,
  ) => {
    const newSpeciesId = Number(event.target.value);
    if (pet && setPet) {
      setPet({
        ...pet,
        species: {
          id: newSpeciesId,
          name: species?.find((s) => s.id === newSpeciesId)?.name || "",
        },
      });
    }
  };

  const handleBreedChange = (
    event: SelectChangeEvent<string | number>,
    _child: React.ReactNode,
  ) => {
    const newBreedId = Number(event.target.value);
    if (pet && setPet) {
      setPet({
        ...pet,
        breed: {
          id: newBreedId,
          name: breed?.find((b) => b.id === newBreedId)?.name || "",
        },
      });
    }
  };

  const handleColorChange = (
    event: SelectChangeEvent<string | number>,
    _child: React.ReactNode,
  ) => {
    const newColorId = Number(event.target.value);
    if (pet && setPet) {
      setPet({
        ...pet,
        color: {
          id: newColorId,
          name: colors?.find((c) => c.id === newColorId)?.name || "",
        },
      });
    }
  };

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (pet && setPet) {
      setPet({ ...pet, name: event.target.value });
    }
  };

  const handleBirthdateChange = (value: string | null) => {
    if (pet && setPet) {
      setPet({ ...pet, birthdate: value });
    }
  };

  return (
    <Grid
      container
      sx={{
        px: isDesktop || isTablet ? 1 : 0,
        pb: 2,
        pt: isDesktop ? 2 : isTablet ? 3 : 0,
        mr: isDesktop || isTablet ? 2.5 : 1,
        ml: isDesktop || isTablet ? 2 : 0.5,
      }}
      rowSpacing={isTablet ? 12 : 1}
      columnSpacing={1}
    >
      <Grid size={isDesktop || isTablet ? 4 : 12}>
        <Grid
          size={12}
          sx={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            pl: 1.5,
            pr: isTablet ? 2 : 1,
            py: 0,
            my: isTabletVertical ? 0.9 : isTablet ? 0 : 1.5,
            pb: isDesktop || isTablet ? 0 : 1,
          }}
        >
          <AnimalImage
            size={imageSize}
            bRadius="8%"
            name={ANIMALIMAGE.animalImageName}
            alt={ANIMALIMAGE.animalImageName}
            imageUrl={currentImageUrl}
            enableHover={true}
            isDesktop={isDesktop}
            petDetails={true}
          />
        </Grid>
      </Grid>
      <Grid size={isDesktop || isTablet ? 4 : 6}>
        <Grid
          container
          direction="column"
          spacing={1}
          rowSpacing={isTablet ? 1.5 : isDesktop ? 1.5 : 1}
        >
          <Grid size={12}>
            <CustomInputField
              id="field-name"
              label={PETMODALTEXTS.fieldNameLabelText}
              type="text"
              value={pet?.name ?? ""}
              onChange={handleNameChange}
              fullWidth
              height={inputHeightIncludingTablet}
              readOnly
              disabled
            />
          </Grid>
          <Grid size={12}>
            <CustomDatePicker
              id="field-birthdate"
              label={PETMODALTEXTS.fieldBirthdateLabelText}
              value={pet?.birthdate ?? null}
              fullWidth
              height={inputHeightIncludingTablet}
              setInputFontSize={isDesktop ? undefined : inputFontSize}
              isDesktop={isDesktop}
              onChange={handleBirthdateChange}
            />
          </Grid>
          <Grid size={12}>
            <CustomDropdownField
              id="field-sex"
              label={PETMODALTEXTS.fieldSexLabelText}
              value={pet?.sex ?? ""}
              onChange={handleSexChange}
              options={mapSexToOptions()}
              displayEmpty
              fullWidth
              height={inputHeightIncludingTablet}
              setInputFontSize={inputFontSize}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid size={isDesktop || isTablet ? 4 : 6}>
        <Grid
          container
          direction="column"
          spacing={1}
          rowSpacing={isTablet ? 1.5 : isDesktop ? 1.5 : 1}
        >
          <Grid size={12}>
            <CustomDropdownField
              id="field-species"
              label={PETMODALTEXTS.fieldSpeciesLabelText}
              value={pet?.species?.id ?? ""}
              onChange={handleSpeciesChange}
              options={mapSpeciesToOptions(species)}
              displayEmpty
              fullWidth
              height={inputHeightIncludingTablet}
              setInputFontSize={inputFontSize}
            />
          </Grid>
          <Grid size={12}>
            <CustomDropdownField
              id="field-race"
              label={PETMODALTEXTS.fieldRaceLabelText}
              value={pet?.breed?.id ?? ""}
              onChange={handleBreedChange}
              options={mapBreedToOptions(breed)}
              displayEmpty
              fullWidth
              height={inputHeightIncludingTablet}
              setInputFontSize={inputFontSize}
            />
          </Grid>
          <Grid size={12}>
            <CustomDropdownField
              id="field-color"
              label={PETMODALTEXTS.fieldColorLabelText}
              value={pet?.color?.id ?? ""}
              onChange={handleColorChange}
              options={mapColorsToOptions(colors)}
              displayEmpty
              fullWidth
              height={inputHeightIncludingTablet}
              setInputFontSize={inputFontSize}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
