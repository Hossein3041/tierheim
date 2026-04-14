import { CHECK_APPOINTMENT_ENDPOINT } from "../Endpoints";
import fetchJson from "../JsonFetcher";

export async function CheckAppointment(
  id: number,
  checked: boolean,
): Promise<boolean> {
  await fetchJson<void>(
    CHECK_APPOINTMENT_ENDPOINT.replaceAll("{id}", id.toString()),
    "PATCH",
    {
      checked: !checked,
    },
  );

  return true;
}
