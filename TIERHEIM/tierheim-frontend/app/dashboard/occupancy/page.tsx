"use client";

import { CategorizedLocationsOverview } from "@app/_constants/pets/petLocations";
import { PETS } from "@app/_constants/texts/Texts";
import { fetchLocationsOverview } from "@app/_queries/pets/GetOverviewLocations";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import OccupancySection from "./OccupanySection";
import PetsTabs from "@app/_components/TabView/PetsTabs";

export default function OccupancyPage() {
  const { data, isLoading, isError } = useQuery<{
    categorizedLocations: CategorizedLocationsOverview;
  }>({
    queryKey: ["locations-overview"],
    queryFn: fetchLocationsOverview,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 60 * 1000,
    gcTime: 40 * 60 * 1000,
    placeholderData: { categorizedLocations: {} },
  });

  const occupancyTabs = useMemo(() => {
    const cats = Object.keys(data?.categorizedLocations ?? {});
    return [PETS.all, ...cats];
  }, [data]);

  return (
    <PetsTabs tabs={occupancyTabs}>
      <OccupancySection
        locationData={data}
        isError={isError}
        isLoading={isLoading}
      />
    </PetsTabs>
  );
}
