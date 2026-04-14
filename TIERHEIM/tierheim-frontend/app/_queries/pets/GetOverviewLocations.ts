import fetchJson from "@/queries/JsonFetcher";
import { GET_LOCATIONS_OVERVIEW_ENDPOINT } from "@/queries/Endpoints";
import { CategorizedLocationsOverview } from "@/constants/pets/petLocations";

interface RawLocationsOverview {
  categorizedPets: CategorizedLocationsOverview;
}

export async function fetchLocationsOverview(): Promise<{
  categorizedLocations: CategorizedLocationsOverview;
}> {
  const raw = await Promise.race([
    fetchJson<RawLocationsOverview>(GET_LOCATIONS_OVERVIEW_ENDPOINT, "GET"),
  ]);
  return { categorizedLocations: raw.categorizedPets };
}
