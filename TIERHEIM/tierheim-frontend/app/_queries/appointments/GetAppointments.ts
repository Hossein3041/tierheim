import { GET_APPOINTMENTS_OVERVIEW_ENDPOINT } from "../Endpoints";
import fetchJson from "../JsonFetcher";

export const APPOINTMENTS_OVERVIEW_QUERY_KEY = "appointments-overview";
export interface AppointmentDTO {
  id: number;
  appointmentType: string;
  appointmentCategory: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentDescription?: string;
  checked: boolean;
  referencedPet?: {
    petId: number;
    petName: string;
    petBreed: string;
    petImage?: string;
  };
  checkedAt?: string | null;
  checkedBy?: string | null;
}

export interface AppointmentsResponse {
  [pet: string]: {
    [appointmentType: string]: AppointmentDTO[];
  };
}

export interface Appointment {
  id: number;
  race: string;
  category: string;
  type: string;
  date: string;
  time: string;
  description?: string;
  checked: boolean;
  referencedPet?: {
    petId: number;
    petName: string;
    petBreed: string;
    petImage?: string;
  };
  checkedAt?: string | null;
  checkedBy?: string | null;
}

export function flattenAppointments(data: AppointmentsResponse) {
  const result: Appointment[] = [];

  for (const [race, categories] of Object.entries(data)) {
    for (const [categorie, appointments] of Object.entries(categories)) {
      for (const appointment of appointments) {
        result.push({
          ...appointment,
          race: race,
          category: categorie,
          type: appointment.appointmentType,
          date: appointment.appointmentDate,
          time: appointment.appointmentTime,
          description: appointment.appointmentDescription,
          id: appointment.id,
        });
      }
    }
  }

  return result;
}

export async function fetchAppointments(dates: Date[]): Promise<Appointment[]> {
  const url = `${GET_APPOINTMENTS_OVERVIEW_ENDPOINT}?dates=${dates
    .map((date) => date.toISOString().split("T")[0])
    .join(",")}`;

  const raw = await fetchJson<AppointmentsResponse>(url, "GET");
  const data = flattenAppointments(raw);

  return data;
}
