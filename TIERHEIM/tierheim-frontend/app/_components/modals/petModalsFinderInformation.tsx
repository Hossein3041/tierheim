import * as React from "react";
import { Grid, useTheme, Divider, SelectChangeEvent } from "@mui/material";
import { CustomInputField } from "@/components/customInputFields";
import { CustomDatePicker } from "@/components/customDatePicker";
import { PETMODALTEXTS } from "@/constants/texts/Texts";
import { useUIConfig } from "@/util/useUIConfig";
import { FinderOption, PetDetail } from "@/constants/pets/pets";
import CustomDropdownField from "@/components/customDropdownField";

interface PetModalsFinderInformationProps {
  pet?: PetDetail;
  setPet?: (pet: PetDetail) => void;
  finders?: FinderOption[];
}

export const PetModalsFinderInformation: React.FC<
  PetModalsFinderInformationProps
> = ({ pet, setPet, finders = [] }) => {
  const theme = useTheme();

  const { isTablet, isDesktop, inputHeight, labelFontSize, inputFontSize } =
    useUIConfig();

  const finderOptions = [
    { value: "", label: "_ bitte wählen _" },
    ...finders.map((f) => ({ value: f.id, label: f.name })),
  ];

  const selectedFinderId: string | number =
    pet?.finderId ?? pet?.finder?.id ?? "";

  const handleFinderChange = (
    event: SelectChangeEvent<string | number>,
    _child: React.ReactNode,
  ) => {
    if (!pet || !setPet) return;

    const raw = event.target.value;
    const newId = raw === "" ? undefined : Number(raw);

    if (newId == null) {
      setPet({
        ...pet,
        finderId: undefined,
        finderName: "",
        finderPhone: "",
        finderAddress: "",
      });
      return;
    }

    const selected = finders.find((f) => f.id === newId);
    if (!selected) {
      setPet({
        ...pet,
        finderId: undefined,
        finderName: "",
        finderPhone: "",
        finderAddress: "",
      });
      return;
    }

    setPet({
      ...pet,
      finderId: selected.id,
      finderName: selected.name,
      finderPhone: selected.phone ?? "",
      finderAddress: selected.address ?? "",
    });
  };

  const handleFoundLocationChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (pet && setPet) {
      setPet({ ...pet, foundLocation: event.target.value });
    }
  };

  const handleFoundDateChange = (value: string | null) => {
    if (pet && setPet) {
      setPet({ ...pet, foundDate: value });
    }
  };

  const handleFinderAddressChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (pet && setPet) {
      setPet({ ...pet, finderAddress: event.target.value });
    }
  };

  const handleFinderPhoneChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = event.target.value;
    if (pet && setPet) {
      if (/^\+?\d*$/.test(value)) {
        setPet({ ...pet, finderPhone: value });
      }
    }
  };

  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{
          px: isDesktop || isTablet ? 1 : 0,
          pt: 2,
          mr: isDesktop || isTablet ? 2.5 : 1,
          ml: isDesktop || isTablet ? 2.5 : 0.5,
        }}
        rowSpacing={1.5}
      >
        {isDesktop || isTablet ? (
          <>
            <Grid size={4}>
              <CustomDropdownField
                id="field-finder"
                label={PETMODALTEXTS.fieldFinderNameLabelText}
                value={selectedFinderId}
                onChange={handleFinderChange}
                options={finderOptions}
                displayEmpty
                fullWidth
                height={inputHeight}
              />
            </Grid>
            <Grid size={4}>
              <CustomInputField
                id="field-finderlocation"
                label={PETMODALTEXTS.fieldFinderLocationLabelText}
                value={pet?.foundLocation ?? ""}
                onChange={handleFoundLocationChange}
                disabled
                type="text"
                fullWidth
                height={inputHeight}
              />
            </Grid>
            <Grid size={4}>
              <CustomDatePicker
                id="field-findingdate"
                label={PETMODALTEXTS.fieldFindingDateLabelText}
                value={pet?.foundDate ?? null}
                onChange={handleFoundDateChange}
                fullWidth
                height={inputHeight}
                isDesktop={isDesktop}
                disabled
                setInputFontSize={isDesktop ? undefined : inputFontSize}
              />
            </Grid>
          </>
        ) : (
          <>
            <Grid size={6}>
              <CustomInputField
                id="field-finderlocation"
                label={PETMODALTEXTS.fieldFinderLocationLabelText}
                value={pet?.foundLocation ?? ""}
                onChange={handleFoundLocationChange}
                disabled
                type="text"
                fullWidth
                height={inputHeight}
              />
            </Grid>
            <Grid size={6}>
              <CustomDatePicker
                id="field-findingdate"
                label={PETMODALTEXTS.fieldFindingDateLabelText}
                value={pet?.foundDate ?? null}
                onChange={handleFoundDateChange}
                fullWidth
                height={inputHeight}
                isDesktop={isDesktop}
                disabled
                sx={{
                  "& .MuiInputLabel-root": {
                    pl: 3.5,
                    fontSize: labelFontSize,
                  },
                  "& .MuiInputBase-input": {
                    px: 2,
                    py: 1,
                    fontSize: inputFontSize,
                  },
                }}
                setInputFontSize={isDesktop ? undefined : inputFontSize}
              />
            </Grid>
            <Grid size={6}>
              <CustomDropdownField
                id="field-finder"
                label={PETMODALTEXTS.fieldFinderNameLabelText}
                value={selectedFinderId}
                onChange={handleFinderChange}
                options={finderOptions}
                displayEmpty
                fullWidth
                height={inputHeight}
              />
            </Grid>
          </>
        )}
        {isDesktop || isTablet ? (
          <>
            <Grid size={8}>
              <CustomInputField
                id="field-finderadress"
                label={PETMODALTEXTS.fieldFinderAddressLabelText}
                value={pet?.finderAddress ?? ""}
                readOnly
                disabled
                onChange={handleFinderAddressChange}
                type="text"
                fullWidth
                height={inputHeight}
              />
            </Grid>
            <Grid size={4}>
              <CustomInputField
                id="field-telephonnumber"
                label={PETMODALTEXTS.fieldTelephonenumberLabelText}
                value={pet?.finderPhone ?? ""}
                onChange={handleFinderPhoneChange}
                type="text"
                fullWidth
                height={inputHeight}
                readOnly
                disabled
              />
            </Grid>
            <Divider
              sx={{
                mx: isDesktop || isTablet ? 3.5 : 1,
              }}
            />
          </>
        ) : (
          <>
            <Grid size={6}>
              <CustomInputField
                id="field-telephonnumber"
                label={PETMODALTEXTS.fieldTelephonenumberLabelText}
                value={pet?.finderPhone ?? ""}
                onChange={handleFinderPhoneChange}
                type="text"
                fullWidth
                height={inputHeight}
                readOnly
                disabled
              />
            </Grid>
          </>
        )}
      </Grid>
      {isDesktop || isTablet ? (
        <></>
      ) : (
        <>
          <Grid
            container
            spacing={1}
            sx={{ px: 0, py: 1, pb: 2, mr: 1, ml: 0.5 }}
          >
            <Grid size={isDesktop || isTablet ? 8 : 12}>
              <CustomInputField
                id="field-finderadress"
                label={PETMODALTEXTS.fieldFinderAddressLabelText}
                type="text"
                value={pet?.finderAddress ?? ""}
                onChange={handleFinderAddressChange}
                fullWidth
                height={inputHeight}
                readOnly
                disabled
              />
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default PetModalsFinderInformation;
