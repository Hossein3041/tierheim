import fetchJson from "@/queries/JsonFetcher";
import { UPDATE_PET_UNIT_ENDPOINT } from "@/queries/Endpoints";

interface UpdateUnitPayload {
  unitId: number | string;
}

export async function updatePetUnit(
  petId: number,
  payload: UpdateUnitPayload,
): Promise<void> {
  const url = UPDATE_PET_UNIT_ENDPOINT.replace(
    "{petId}",
    encodeURIComponent(String(petId)),
  );
  await fetchJson(url, "PUT", payload);
}
