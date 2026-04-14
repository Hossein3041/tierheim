import { Breed, Color, Room, Species } from "@/constants/pets/pets";
import * as React from "react";

export const mapSpeciesToOptions = (
  species: Species[] | undefined,
): Array<{ value: string | number; label: React.ReactNode }> => {
  if (!species) return []; // wenn undefined -> leeres Array

  return species.map((s) => ({
    value: s.id,
    label: s.name,
  }))
    .sort((a, b) => a.label.toString().localeCompare(b.label.toString()));
};

export const mapBreedToOptions = (
  breed: Breed[] | undefined,
): Array<{ value: string | number; label: React.ReactNode }> => {
  if (!breed) return []; // wenn undefined -> leeres Array

  return breed.map((s) => ({
    value: s.id,
    label: s.name,
  }))
    .sort((a, b) => a.label.toString().localeCompare(b.label.toString()));
};

export const mapColorsToOptions = (
  colors: Color[] | undefined,
): Array<{ value: string | number; label: React.ReactNode }> => {
  if (!colors) return []; // wenn undefined -> leeres Array

  return colors.map((s) => ({
    value: s.id,
    label: s.name,
  }))
    .sort((a, b) => a.label.toString().localeCompare(b.label.toString()));

};

export const mapSexToOptions = (): Array<{
  value: string;
  label: React.ReactNode;
}> => {
  return [
    { value: "MALE", label: "Männlich" },
    { value: "FEMALE", label: "Weiblich" },
    { value: "UNKNOWN", label: "Unbekannt" },
  ];
};

type DropdownOption = { label: string; value: number };

export function generateDropdownOptions(units: Room[]): DropdownOption[] {
  const seenDefault = new Set<string>();
  const seenCustom = new Set<string>();

  if (!Array.isArray(units)) {
    console.error("generateDropdownOptions: units is not an array", units);
    return [];
  }

  return (units ?? []).reduce<DropdownOption[]>((acc, item) => {
    if (item.default) {
      const label =
        item.location === item.section
          ? item.location
          : `${item.location} - ${item.section}`;
      if (!seenDefault.has(label)) {
        seenDefault.add(label);
        acc.push({ label, value: item.id });
      }
    } else {
      const label = `${item.location} - ${item.section} - ${item.name}`;
      if (!seenCustom.has(label)) {
        seenCustom.add(label);
        acc.push({ label, value: item.id });
      }
    }
    return acc;
  }, []);
}
