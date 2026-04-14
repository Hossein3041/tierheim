import { TAlert } from "@app/_constants/Alerts";
import { createContext } from "react";

export const UtilContext = createContext<{
  alert: TAlert;
  setAlert: (a: TAlert) => void;
  title: string;
  setTitle: (title: string) => void;
}>({
  alert: { message: "", errorMessage: "", type: "success", stackTrace: "" },
  setAlert: () => {},
  title: "",
  setTitle: () => {},
});

export const createAlertFromError = (e: Error): TAlert => {
  return {
    message: `Es ist ein Fehler aufgetreten`,
    errorMessage: ` ${e?.cause} ${e?.message}`,
    type: "error",
    stackTrace: JSON.stringify(e.stack),
  };
};
