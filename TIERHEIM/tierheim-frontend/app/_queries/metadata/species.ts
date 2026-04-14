import fetchJson from "@/queries/JsonFetcher";
import { GET_PET_SPECIES_ENDPOINT } from "@/queries/Endpoints";
import { Species } from "@/constants/pets/pets";

export async function fetchPetSpecies(): Promise<Species[]> {
  const url = GET_PET_SPECIES_ENDPOINT;
  return await fetchJson(url, "GET");
}
