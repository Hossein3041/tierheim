import { GET_PLACEMENT_STATUS_ENDPOINT } from "@/queries/Endpoints";
import fetchJson from "@/queries/JsonFetcher";
import { PlacementStatusOption } from "@/constants/pets/pets";

export async function fetchPlacementStatuses(): Promise<
  PlacementStatusOption[]
> {
  return fetchJson<PlacementStatusOption[]>(
    GET_PLACEMENT_STATUS_ENDPOINT,
    "GET",
  );
}
