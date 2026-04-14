import fetchJson from "@/queries/JsonFetcher";
import { GET_SECTION_DETAILS_ENDPOINT } from "@/queries/Endpoints";
import { SectionDetail } from "@/constants/pets/petSectionID";

export async function fetchSectionDetail(id: number): Promise<SectionDetail> {
  const url = `${GET_SECTION_DETAILS_ENDPOINT}/${id}`;
  return await fetchJson(url, "GET");
}
