export function isUrl(url: string) {
  let tmp;
  try {
    tmp = new URL(url);
  } catch (err) {
    return false;
  }
  return tmp.protocol === "http:" || tmp.protocol === "https:";
}
