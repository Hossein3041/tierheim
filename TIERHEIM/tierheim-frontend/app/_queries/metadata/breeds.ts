import fetchJson from "@/queries/JsonFetcher";
import { GET_PET_BREEDS_ENDPOINT } from "@/queries/Endpoints";
import { Breed } from "@/constants/pets/pets";

export async function fetchPetBreeds(): Promise<Breed[]> {
  const url = GET_PET_BREEDS_ENDPOINT;
  return await fetchJson(url, "GET");
}
