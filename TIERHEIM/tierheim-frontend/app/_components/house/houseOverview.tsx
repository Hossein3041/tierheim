import React from "react";
import { Box, Typography } from "@mui/material";
import CustomHouse from "./customHouse";
import { ANIMALCONTENT, PETS } from "@/constants/texts/Texts";
import {
  CategorizedLocationsOverview,
  SectionPetSummary,
} from "@/constants/pets/petLocations";
import { useMemo } from "react";
import CustomHouseSkeleton from "@/components/house/CustomHouseSkeleton";
import { useUIConfig } from "@/util/useUIConfig";
import { normalizeQuery, includesNormalized } from "@/util/searchbarUtils";

type HouseOverviewProps = {
  categorizedLocations: CategorizedLocationsOverview;
  isLoading: boolean;
  isError: boolean;
  currentCategory: string;
  overflowTabs: string[];
  onOpenPetModal: (pet: any) => void;
  searchQuery?: string;
};

export function HouseOverview({
  categorizedLocations,
  isLoading,
  isError,
  currentCategory,
  overflowTabs,
  onOpenPetModal,
  searchQuery,
}: HouseOverviewProps) {
  const { isMobile } = useUIConfig();

  const entries = useMemo(
    () => Object.entries(categorizedLocations),
    [categorizedLocations],
  );

  const displayLocations = useMemo(() => {
    if (currentCategory !== PETS.all) {
      const scope =
        currentCategory === PETS.other
          ? entries.filter(([cat]) => overflowTabs.includes(cat))
          : entries.filter(([cat]) => cat === currentCategory);
      return scope.flatMap(([, dto]) => dto.locations);
    }

    type Section = {
      id: number;
      name: string;
      currentPetCount: number;
      maxPetCount: number;
      pets?: SectionPetSummary[];
    };

    type LocationAgg = { id: number; name: string; sections: Section[] };

    const byLocation = new Map<string, LocationAgg>();

    for (const [, dto] of entries) {
      for (const loc of dto.locations) {
        const key = String(loc.id ?? loc.name);
        const existing = byLocation.get(key);

        if (!existing) {
          byLocation.set(key, {
            id: loc.id ?? key,
            name: loc.name,
            sections: [...loc.sections],
          });
        } else {
          const merged = new Map<string, Section>();
          const allSections = [...existing.sections, ...loc.sections];
          for (const s of allSections) {
            const sid = String(s.id ?? s.name);
            const prev = merged.get(sid);
            if (!prev) merged.set(sid, { ...s });
            else {
              merged.set(sid, {
                ...prev,
                currentPetCount:
                  (prev.currentPetCount ?? 0) + (s.currentPetCount ?? 0),
                maxPetCount: Math.max(
                  prev.maxPetCount ?? 0,
                  s.maxPetCount ?? 0,
                ),
                pets: [...(prev.pets ?? []), ...(s.pets ?? [])],
              });
            }
          }

          existing.sections = Array.from(merged.values());
        }
      }
    }

    return Array.from(byLocation.values());
  }, [entries, currentCategory, overflowTabs]);

  type Totals = { totalCount: number; totalMax: number };
  const houseTotalsByKey = useMemo(() => {
    const map = new Map<string | number, Totals>();
    for (const loc of displayLocations) {
      const key = loc.id ?? loc.name;
      const totalCount = (loc.sections ?? []).reduce(
        (s, r) => s + (r.currentPetCount ?? 0),
        0,
      );
      const totalMax = (loc.sections ?? []).reduce(
        (s, r) => s + (r.maxPetCount ?? 0),
        0,
      );
      map.set(key, { totalCount, totalMax });
    }
    return map;
  }, [displayLocations]);

  const searchQueryRaw = searchQuery ?? "";
  const normalizedSearchQuery = normalizeQuery(searchQueryRaw);

  type LocWithTotals = (typeof displayLocations)[number] & { __totals: Totals };

  const filteredLocations: LocWithTotals[] = useMemo(() => {
    if (!normalizedSearchQuery) {
      return displayLocations.map((loc) => ({
        ...(loc as any),
        __totals: houseTotalsByKey.get(loc.id ?? loc.name)!,
      })) as LocWithTotals[];
    }

    return displayLocations
      .map((loc) => {
        const sections = loc.sections ?? [];
        const keepSections = sections.filter((section) =>
          (section.pets ?? []).some((p) =>
            includesNormalized(p.name, normalizedSearchQuery),
          ),
        );
        if (keepSections.length === 0) return null;

        return {
          ...loc,
          sections: keepSections,
          __totals: houseTotalsByKey.get(loc.id ?? loc.name)!,
        } as LocWithTotals;
      })
      .filter((x): x is LocWithTotals => x !== null);
  }, [displayLocations, normalizedSearchQuery, houseTotalsByKey]);

  if (isLoading) {
    const skeletonHouses = isMobile ? 2 : 3;
    return (
      <>
        {Array.from({ length: skeletonHouses }).map((_, i) => (
          <Box key={`house-skel-${i}`} sx={{ mb: 7.5 }}>
            <CustomHouseSkeleton />
          </Box>
        ))}
      </>
    );
  }

  if (isError) return <Typography color="error">{PETS.errorPets}</Typography>;

  if (filteredLocations.length === 0) {
    const emptyText = searchQueryRaw
      ? ANIMALCONTENT.noPetsFoundForQueryInCategory(
          searchQueryRaw,
          currentCategory,
        )
      : PETS.noPets;
    return <Typography>{emptyText}</Typography>;
  }

  return (
    <>
      {filteredLocations.map((location, i) => (
        <Box
          id={"house-" + (location.id ?? location.name)}
          key={(location.id ?? location.name) + "-overview-" + i}
          sx={{
            mb: 7.5,
            touchAction: "pan-y"
          }}
        >
          <CustomHouse
            title={location.name}
            rooms={location.sections.map((sec) => ({
              id: sec.id,
              title: sec.name,
              count: sec.currentPetCount,
              max: sec.maxPetCount,
              // <- HIER: Pet-Objekte fürs UI normalisieren und image sichern
              pets: (sec.pets ?? []).map((p) => ({
                ...p,
                id: p.petId,
                group: p.species,
                imageUrl: p.image,
                image: p.image,
              })),
            }))}
            onOpenPetModal={onOpenPetModal}
            houseTotalCount={(location as any).__totals.totalCount}
            houseTotalMax={(location as any).__totals.totalMax}
            searchQuery={searchQuery}
          />
        </Box>
      ))}
    </>
  );
}
