import fetchJson from "@/queries/JsonFetcher";
import { GET_PET_COLORS_ENDPOINT } from "@/queries/Endpoints";
import { Color } from "@/constants/pets/pets";

export async function fetchPetColors(): Promise<Color[]> {
  const url = GET_PET_COLORS_ENDPOINT;
  return await fetchJson(url, "GET");
}
