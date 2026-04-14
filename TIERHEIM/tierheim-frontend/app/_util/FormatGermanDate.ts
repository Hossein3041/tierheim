import dayjs from "dayjs";
import "dayjs/locale/de";

dayjs.locale("de");

export function formatGermanDate(date: string, time?: string) {
  if (!date) return "";
  const source = time ? `${date}T${time}` : date;
  const parsed = dayjs(source);
  if (!parsed.isValid()) return date + (time ? `${time}` : "");
  return parsed.format("DD.MM.YYYY, HH:mm");
}

export function formatGermanDateFromIso(isoString?: string | null) {
  if (!isoString) return "";
  const parsed = dayjs(isoString);
  if (!parsed.isValid()) return isoString;
  return parsed.format("DD.MM.YYYY, HH:mm");
}
