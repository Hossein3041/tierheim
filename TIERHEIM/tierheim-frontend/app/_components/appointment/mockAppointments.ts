import type { AppointmentsResponse } from "@/queries/appointments/GetAppointments";

export const MOCK_APPOINTMENTS: AppointmentsResponse = {
  Hunde: {
    Allgemein: [
      {
        id: 101,
        appointmentType: "Impfung",
        appointmentDate: "2025-10-22",
        appointmentTime: "10:30",
        appointmentDescription:
          "Tollwutimpfung und allgemeiner Gesundheitscheck.",
        checked: false,
        referencedPet: {
          petId: 1,
          petName: "Minka",
          petBreed: "Europäisch Kurzhaar",
          petImage: "/tierheim/beispiel_katze.jpg",
        },
      },
      {
        id: 102,
        appointmentType: "Kastration",
        appointmentDate: "2025-10-23",
        appointmentTime: "14:00",
        appointmentDescription: "Kastration und Nachsorge.",
        checked: true,
        referencedPet: {
          petId: 2,
          petName: "Sideklick",
          petBreed: "Ein Rudel Hunde",
          petImage: "/tierheim/sideklick-favicon.png",
        },
      },
    ],
    Behandlung: [
      {
        id: 101,
        appointmentType: "Impfung",
        appointmentDate: "2025-10-24",
        appointmentTime: "10:30",
        appointmentDescription:
          "Tollwutimpfung und allgemeiner Gesundheitscheck.",
        checked: true,
        referencedPet: {
          petId: 1,
          petName: "Minka",
          petBreed: "Europäisch Kurzhaar",
          petImage: "/tierheim/beispiel_katze.jpg",
        },
      },
      {
        id: 102,
        appointmentType: "Beschmierung",
        appointmentDate: "2025-10-21",
        appointmentTime: "14:00",
        appointmentDescription: "Mit Butter und Marmelade.",
        checked: false,
        referencedPet: {
          petId: 2,
          petName: "Bernd das Brot",
          petBreed: "Brot",
          petImage: "/tierheim/Tierheim_favicon.png",
        },
      },
    ],
  },
  Katzen: {
    Kreuzigung: [
      {
        id: 103,
        appointmentType: "Impfung",
        appointmentDate: "2025-10-23",
        appointmentTime: "10:30",
        appointmentDescription:
          "Tollwutimpfung und allgemeiner Gesundheitscheck.",
        checked: false,
        referencedPet: {
          petId: 1,
          petName: "Minka",
          petBreed: "Europäisch Kurzhaar",
          petImage: "/tierheim/beispiel_katze.jpg",
        },
      },
      {
        id: 104,
        appointmentType: "Kastration",
        appointmentDate: "2025-10-23",
        appointmentTime: "14:00",
        appointmentDescription: "Kastration und Nachsorge.",
        checked: true,
        referencedPet: {
          petId: 2,
          petName: "Sideklick",
          petBreed: "Ein Rudel Hunde",
          petImage: "/tierheim/sideklick-favicon.png",
        },
      },
    ],
    Erholung: [
      {
        id: 105,
        appointmentType: "Impfung",
        appointmentDate: "2025-10-20",
        appointmentTime: "10:30",
        appointmentDescription:
          "Tollwutimpfung und allgemeiner Gesundheitscheck.",
        checked: false,
        referencedPet: {
          petId: 1,
          petName: "Minka",
          petBreed: "Europäisch Kurzhaar",
          petImage: "/tierheim/beispiel_katze.jpg",
        },
      },
      {
        id: 106,
        appointmentType: "Kastration",
        appointmentDate: "2025-10-20",
        appointmentTime: "14:00",
        appointmentDescription: "Kastration und Nachsorge.",
        checked: true,
        referencedPet: {
          petId: 2,
          petName: "Sideklick",
          petBreed: "Ein Rudel Hunde",
          petImage: "/tierheim/sideklick-favicon.png",
        },
      },
    ],
  },
};
