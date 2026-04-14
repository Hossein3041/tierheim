import fetchJson from "@/queries/JsonFetcher";
import { GET_PET_FINDERS_ENDPOINT } from "@/queries/Endpoints";
import { FinderOption } from "@/constants/pets/pets";

export async function fetchPetFinders(q?: string): Promise<FinderOption[]> {
  const url =
    q && q.trim()
      ? `${GET_PET_FINDERS_ENDPOINT}?q=${encodeURIComponent(q)}`
      : GET_PET_FINDERS_ENDPOINT;
  return fetchJson(url, "GET");
}
