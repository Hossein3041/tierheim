import fetchJson from "@/queries/JsonFetcher";
import { GET_UNITS_BY_SECTION_ENDPOINT } from "@/queries/Endpoints";
import { UnitsBySection } from "@/constants/pets/unitsBySection";

export async function fetchUnitsBySection(
  id: number | null,
): Promise<UnitsBySection[]> {
  const url = `${GET_UNITS_BY_SECTION_ENDPOINT}/${id}`;
  return await fetchJson(url, "GET");
}
