"use client";

import PetsTabs from "@app/_components/TabView/PetsTabs";
import { CategorizedPetOverview } from "@app/_constants/pets/pets";
import { PETS } from "@app/_constants/texts/Texts";
import { fetchPetOverview } from "@app/_queries/pets/GetOverview";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import AnimalsSection from "./AnimalsSection";

export default function AppointmentPage() {
  const { data, isLoading, isError, error } = useQuery<CategorizedPetOverview>({
    queryKey: ["pet-overview", { archived: false }],
    queryFn: () => fetchPetOverview({ archived: false }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    initialData: {
      categorizedPets: [],
    },
  });

  const animalTabs = useMemo(
    () => [PETS.all, ...data.categorizedPets.map((c) => c.category)],
    [data.categorizedPets],
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <PetsTabs tabs={animalTabs}>
      <AnimalsSection data={data} />
    </PetsTabs>
  );
}
