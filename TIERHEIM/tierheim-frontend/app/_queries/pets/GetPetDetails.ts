import fetchJson from "@/queries/JsonFetcher";
import { GET_PETS_DETAIL_ENDPOINT } from "@/queries/Endpoints";
import { PetDetail } from "@/constants/pets/pets";

export async function fetchPetDetail(id: number): Promise<PetDetail> {
  const url = `${GET_PETS_DETAIL_ENDPOINT}/${id}`;
  return await fetchJson(url, "GET");
}
