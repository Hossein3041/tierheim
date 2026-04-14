import fetchJson from "../JsonFetcher";
import { GET_PET_MEDICATIONS_ENDPOINT } from "../Endpoints";
import { NameIdPair } from "@app/_constants/pets/pets";

export function fetchPetMedications(): Promise<NameIdPair[]> {
  return fetchJson(GET_PET_MEDICATIONS_ENDPOINT, "GET");
}
