"use client";

import { Box, Stack, Typography, useTheme } from "@mui/material";
import AnimalFileCard from "@/components/animalFile/AnimalFileCard";
import { ANIMALCONTENT, PETS } from "@/constants/texts/Texts";
import { CategorizedPetOverview } from "@/constants/pets/pets";
import { useMemo } from "react";
import AnimalFileCardSkeleton from "@/components/animalFile/AnimalFileCardSkeleton";
import { useUIConfig } from "@/util/useUIConfig";
import { normalizeQuery, includesNormalized } from "@/util/searchbarUtils";
import { OpenPetPayload } from "@/components/modals/petModals";

type AnimalContentProps = {
  categorizedPets: CategorizedPetOverview["categorizedPets"];
  currentCategory: string;
  overflowTabs: string[];
  isLoading: boolean;
  isError: boolean;
  onOpenPetModal: (pet: OpenPetPayload) => void;
  searchQuery?: string;
};

export default function AnimalContent({
  categorizedPets,
  currentCategory,
  overflowTabs,
  isLoading,
  isError,
  onOpenPetModal,
  searchQuery,
}: AnimalContentProps) {
  const theme = useTheme();
  const palette = theme.palette.animalFile;

  const {
    isMobile,
    isTablet,
    isTabletVertical,
    isTabletHorizontal,
    isDesktop,
  } = useUIConfig();

  const skeletonCount = isMobile ? 6 : 12;

  const otherGroups = useMemo(
    () => categorizedPets.filter((g) => overflowTabs.includes(g.category)),
    [categorizedPets, overflowTabs],
  );

  const emptyOtherCategories = useMemo(() => {
    const set = new Set<string>();
    for (const cat of overflowTabs) {
      const group = categorizedPets.find((g) => g.category === cat);
      if (!group || !group.pets || group.pets.length === 0) {
        set.add(cat);
      }
    }
    return Array.from(set);
  }, [categorizedPets, overflowTabs]);

  const qRaw = (searchQuery ?? "").trim();
  const q = normalizeQuery(qRaw);

  const basePets = (() => {
    if (currentCategory === PETS.all) {
      return categorizedPets.flatMap((g) => g.pets);
    }
    if (currentCategory === PETS.other) {
      return categorizedPets
        .filter((g) => overflowTabs.includes(g.category))
        .flatMap((g) => g.pets);
    }
    return (
      categorizedPets.find((g) => g.category === currentCategory)?.pets ?? []
    );
  })();

  const petsToDisplay = useMemo(() => {
    if (!q) return basePets;
    return basePets.filter((p) => includesNormalized(p.name, q));
  }, [basePets, q]);

  const emptyText = useMemo(() => {
    if (qRaw)
      return ANIMALCONTENT.noPetsFoundForQueryInCategory(qRaw, currentCategory);
    if (currentCategory === PETS.other) {
      if (emptyOtherCategories.length > 0) {
        return ANIMALCONTENT.emptyOtherCategoriesText(emptyOtherCategories);
      }
      return ANIMALCONTENT.otherCategoryText;
    }
    if (currentCategory !== PETS.all) {
      return ANIMALCONTENT.noPetsInCategoryText(currentCategory);
    }
    return PETS.noPets;
  }, [currentCategory, emptyOtherCategories, qRaw]);

  return (
    <Stack
      justifyContent={"center"}
      sx={{
        px: { xs: 1, sm: 3 },
        py: { xs: 2, sm: 5 },
      }}
    >
      {isLoading ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(auto-fill, minmax(140px, 1fr))",
              sm: "repeat(auto-fill, minmax(180px, 1fr))",
              md: "repeat(auto-fill, minmax(220px, 1fr))",
              lg: "repeat(auto-fill, minmax(260px, 1fr))",
            },
            gap: { xs: 2, sm: 10 },
            justifyContent: "start",
            px: { xs: 0, sm: 3 },
            pb: { xs: 3, sm: 0 },
          }}
        >
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <Box
              key={`pet-skel-${i}`}
              sx={{
                flex: "0 1 auto",
                maxWidth: 320,
                minWidth: 150,
                pt: isMobile ? "45px" : 0,
              }}
            >
              <AnimalFileCardSkeleton />
            </Box>
          ))}
        </Box>
      ) : isError ? (
        <Typography sx={{ px: 3 }} color="error">
          {PETS.errorPets}
        </Typography>
      ) : petsToDisplay.length === 0 ? (
        <Typography sx={{ px: 3 }}>{emptyText}</Typography>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(auto-fill, minmax(140px, 1fr))",
              sm: "repeat(auto-fill, minmax(180px, 1fr))",
              md: "repeat(auto-fill, minmax(220px, 1fr))",
              lg: "repeat(auto-fill, minmax(260px, 1fr))",
            },
            gap: { xs: 2, sm: 10 },
            justifyContent: "start",
            px: { xs: 0, sm: 3 },
            pb: { xs: 3, sm: 0 },
          }}
        >
          {petsToDisplay.map((pet) => (
            <Box
              key={pet.id}
              sx={{
                flex: "0 1 auto",
                maxWidth: 320,
                minWidth: 150,
              }}
            >
              <AnimalFileCard
                name={pet.name}
                breed={
                  typeof pet.breed === "string"
                    ? pet.breed
                    : pet.breed?.name || PETS.unknown
                }
                id={pet.id}
                chipnumber={pet.chipNumber || ""}
                imageUrl={pet.image || ""}
                group={pet.locationUnit || ""}
                locationLabel={
                  pet.locationShortName + " - " + pet.sectionShortName
                }
                badgeTopLeft={pet.primaryBadge ?? undefined}
                showAlertBadge={Boolean(pet.hasAttention)}
                onOpenPetModal={() =>
                  onOpenPetModal({
                    name: pet.name,
                    breed:
                      typeof pet.breed === "string"
                        ? pet.breed
                        : pet.breed?.name || PETS.unknown,
                    id: pet.id,
                    imageUrl: pet.image || "",
                    group: pet.locationUnit || "",
                  })
                }
              />
            </Box>
          ))}
        </Box>
      )}
    </Stack>
  );
}
