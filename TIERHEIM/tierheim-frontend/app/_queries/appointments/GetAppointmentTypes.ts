import { GET_APPOINTMENT_TYPES_ENDPOINT } from "../Endpoints";
import fetchJson from "../JsonFetcher";

export const APPOINTMENT_TYPES_QUERY_KEY = "appointments-types";

export interface AppointmentType {
  id: number;
  name: string;
}

export async function fetchAppointmentTypes(): Promise<AppointmentType[]> {
  const data = await fetchJson<AppointmentType[]>(
    GET_APPOINTMENT_TYPES_ENDPOINT,
    "GET",
  );

  return data;
}
