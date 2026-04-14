// queries/pets/GetOverview.ts
import fetchJson from "@/queries/JsonFetcher";
import { GET_PET_OVERVIEW_ENDPOINT } from "@/queries/Endpoints";
import { CategorizedPetOverview, PetData } from "@/constants/pets/pets";

interface RawPetOverview {
  categorizedPets: Record<string, PetData[]>;
}

export async function fetchPetOverview(opts?: {
  archived?: boolean;
}): Promise<CategorizedPetOverview> {
  const archived = opts?.archived ?? false;
  const url = `${GET_PET_OVERVIEW_ENDPOINT}?archived=${archived}`;

  const raw = await fetchJson<RawPetOverview>(url, "GET");
  const categorizedPets = Object.entries(raw.categorizedPets).map(
    ([category, pets]) => ({ category, pets: pets as PetData[] }),
  );
  return { categorizedPets };
}
