import fetchJson from "@/queries/JsonFetcher";
import { GET_PET_UNITS_ENDPOINT } from "@/queries/Endpoints";
import { Room } from "@/constants/pets/pets";

export async function fetchUnits(): Promise<Room[]> {
  const url = GET_PET_UNITS_ENDPOINT;
  return await fetchJson(url, "GET");
}
