import { NameIdPair } from "@app/_constants/pets/pets";
import fetchJson from "../JsonFetcher";
import { GET_PET_FOODS_ENDPOINT } from "../Endpoints";

export function fetchPetFoods(): Promise<NameIdPair[]> {
  return fetchJson(GET_PET_FOODS_ENDPOINT, "GET");
}
