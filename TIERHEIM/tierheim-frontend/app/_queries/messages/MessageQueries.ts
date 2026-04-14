import { GET_ALL_MESSAGES, POST_MESSAGE } from "../Endpoints";
import fetchJson from "../JsonFetcher";

export type Message = {
  id?: number;
  message: string;
};

export async function getAllMessages(): Promise<Message[]> {
  const result = await fetchJson<Message[]>(GET_ALL_MESSAGES);
  if (result === null) {
    throw new Error("Failed to fetch messages: No data returned");
  }
  return result;
}

export async function postNewMessage(newMessage: Message): Promise<Message> {
  const result = await fetchJson<Message>(POST_MESSAGE, "POST", newMessage);
  if (result === null) {
    throw new Error("Failed to post message: No data returned");
  }
  return result;
}

export async function deleteAllMessages(): Promise<void> {
  const result = await fetchJson<unknown>(GET_ALL_MESSAGES, "DELETE");
  if (result !== null) {
    throw new Error("Unexpected data returned from DELETE request");
  }
  return;
}
