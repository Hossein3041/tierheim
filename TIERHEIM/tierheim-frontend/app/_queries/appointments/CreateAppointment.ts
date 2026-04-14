import dayjs from "dayjs";
import { CREATE_APPOINTMENT_ENDPOINT } from "../Endpoints";
import fetchJson from "../JsonFetcher";
import { Appointment, AppointmentDTO } from "./GetAppointments";

type CreateAppointmentDTO = Omit<AppointmentDTO, "id" | "checked">;

export async function CreateAppointment(
  appointment: Omit<Appointment, "id">,
): Promise<boolean> {
  const dto: CreateAppointmentDTO = {
    appointmentType: appointment.type,
    appointmentCategory: appointment.category,
    appointmentDate: dayjs(appointment.date).format("YYYY-MM-DD"),
    appointmentTime: appointment.time,
    appointmentDescription: appointment.description,
    referencedPet: appointment.referencedPet,
  };

  await fetchJson<void>(CREATE_APPOINTMENT_ENDPOINT, "POST", dto);

  return true;
}
