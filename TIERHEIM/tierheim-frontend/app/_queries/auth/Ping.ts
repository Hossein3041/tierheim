import fetchJson from "@/queries/JsonFetcher";
import { PING_ENDPOINT } from "@/queries/Endpoints";

type TPingData = {
  message: string;
};

export async function pingFetch(): Promise<TPingData> {
  return await fetchJson(PING_ENDPOINT);
}
