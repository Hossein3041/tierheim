import { AlertColor } from "@mui/material";

export type TAlert = {
  message: string;
  errorMessage: string;
  type: AlertColor;
  stackTrace: string;
  durationMs?: number;
};

export const CODE_TO_ALERT: Record<number, TAlert> = {
  [1]: {
    message: "Speichern erfolgreich",
    errorMessage: "",
    type: "success",
    stackTrace: "",
    durationMs: Number(process.env.NEXT_PUBLIC_ALERT_FADE_OUT),
  },
  [2]: {
    message: "Fehler beim Speichern",
    errorMessage: "",
    type: "error",
    stackTrace: "",
  },
  [3]: {
    message: "Hochladen des Bildes war erfolgreich",
    errorMessage: "",
    type: "success",
    stackTrace: "",
    durationMs: Number(process.env.NEXT_PUBLIC_ALERT_FADE_OUT),
  },
  [4]: {
    message: "Fehler beim Hochladen des Bildes",
    errorMessage: "",
    type: "error",
    stackTrace: "",
  },
  [5]: {
    message: "Login fehlgeschlagen. Überprüfen Sie die Anmeldedaten",
    errorMessage: "",
    type: "error",
    stackTrace: "",
  },
  [6]: {
    message: "Login erfolgreich",
    errorMessage: "",
    type: "success",
    stackTrace: "",
    durationMs: Number(process.env.NEXT_PUBLIC_ALERT_FADE_OUT),
  },
  [7]: {
    message: "Tier erfolgreich verschoben",
    errorMessage: "",
    type: "success",
    stackTrace: "",
    durationMs: Number(process.env.NEXT_PUBLIC_ALERT_FADE_OUT),
  },
  [8]: {
    message: "Tier konnte nicht verschoben werden",
    errorMessage: "",
    type: "error",
    stackTrace: "",
  },
  [9]: {
    message: "Termin erfolgreich angelegt",
    errorMessage: "",
    type: "success",
    stackTrace: "",
    durationMs: Number(process.env.NEXT_PUBLIC_ALERT_FADE_OUT),
  },
  [10]: {
    message: "Fehler beim Termin anlegen",
    errorMessage: "",
    type: "error",
    stackTrace: "",
  },
  [11]: {
    message: "Termin wurde abgehakt",
    errorMessage: "",
    type: "success",
    stackTrace: "",
    durationMs: Number(process.env.NEXT_PUBLIC_ALERT_FADE_OUT),
  },
  [12]: {
    message: "Termin konnte nicht abgehakt werden",
    errorMessage: "",
    type: "error",
    stackTrace: "",
  },
};
