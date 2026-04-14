import dayjs from "dayjs";
import { UPDATE_APPOINTMENT_ENDPOINT } from "../Endpoints";
import fetchJson from "../JsonFetcher";
import { Appointment, AppointmentDTO } from "./GetAppointments";

export async function updateAppointment(
  appointment: Appointment,
): Promise<boolean> {
  console.log(appointment);
  const dto: AppointmentDTO = {
    id: appointment.id,
    appointmentType: appointment.type,
    appointmentCategory: appointment.category,
    appointmentDate: new Date(appointment.date).toISOString().split("T")[0],
    appointmentTime: appointment.time,
    appointmentDescription: appointment.description,
    referencedPet: appointment.referencedPet,
    checked: appointment.checked,
  };

  await fetchJson<void>(
    UPDATE_APPOINTMENT_ENDPOINT.replaceAll("{id}", appointment.id.toString()),
    "PUT",
    dto,
  );

  return true;
}
