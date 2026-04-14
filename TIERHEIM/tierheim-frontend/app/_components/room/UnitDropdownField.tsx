import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUnitsBySection } from "@/queries/units/GetUnitsBySection";
import { UnitsBySection } from "@/constants/pets/unitsBySection";
import { CustomDropdownField } from "@/components/customDropdownField";
import { DRAGANDDROP } from "@/constants/texts/Texts";
import { SelectChangeEvent, SxProps, Theme } from "@mui/material";

interface UnitDropdownFieldProps {
  sectionId: number | null;
  selectedUnitId: string | null;
  isFullRoom?: boolean;
  onChange?: (unitId: string | null) => void;
  sx?: SxProps<Theme>;
  enabled?: boolean;
}

export function UnitDropdownField({
  sectionId,
  selectedUnitId,
  isFullRoom = false,
  onChange,
  sx,
  enabled = false,
}: UnitDropdownFieldProps) {
  const { data, isLoading } = useQuery<UnitsBySection[]>({
    queryKey: ["units-bySection", sectionId],
    queryFn: () => fetchUnitsBySection(sectionId as number),
    enabled: enabled && sectionId !== null && !isFullRoom,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const units: UnitsBySection[] = data ?? [];

  const handleSelectChange = (
    event: SelectChangeEvent<string | number>,
    _child: React.ReactNode,
  ) => {
    const value = event.target.value;
    onChange?.(value === "" ? null : String(value));
  };

  return (
    <CustomDropdownField
      id="unit-select"
      value={selectedUnitId ?? ""}
      label=""
      onChange={handleSelectChange}
      options={units.map((unit) => ({
        value: String(unit.id),
        label: unit.name,
      }))}
      helperText={
        isLoading
          ? DRAGANDDROP.loadUnitsText
          : units.length === 0
            ? DRAGANDDROP.noUnits
            : undefined
      }
      disabled={isFullRoom || isLoading}
      sx={sx}
      bRadius="9px"
    />
  );
}
