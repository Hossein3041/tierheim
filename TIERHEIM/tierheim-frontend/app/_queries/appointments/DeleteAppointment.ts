import { DELETE_APPOINTMENT_ENDPOINT } from "../Endpoints";
import fetchJson from "../JsonFetcher";
import { Appointment } from "./GetAppointments";

export async function deleteAppointment(
  appointment: Appointment,
): Promise<boolean> {
  await fetchJson<void>(
    DELETE_APPOINTMENT_ENDPOINT.replaceAll("{id}", appointment.id.toString()),
    "DELETE",
  );

  return true;
}
