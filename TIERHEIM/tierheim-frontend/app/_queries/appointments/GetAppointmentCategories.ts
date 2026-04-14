import { GET_APPOINTMENT_CATEGORIES_ENDPOINT } from "../Endpoints";
import fetchJson from "../JsonFetcher";
import { AppointmentType } from "./GetAppointmentTypes";

export const APPOINTMENT_CATEGORY_QUERY_KEY = "appointments-categories";

export interface AppointmentCategory extends AppointmentType {}

export async function fetchAppointmentCategories(): Promise<AppointmentCategory[]> {
  const data = await fetchJson<AppointmentCategory[]>(
    GET_APPOINTMENT_CATEGORIES_ENDPOINT,
    "GET",
  );

  return data;
}
