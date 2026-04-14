import fetchJson from "@/queries/JsonFetcher";
import { CONFIRM_ENDPOINT } from "@/queries/Endpoints";

type TProps = {
  username: string;
  oldPassword: string;
  newPassword: string;
};

type TSessionData = {
  idToken: string;
  accessToken: string;
  refreshToken: string;
};

export async function confirmFetch(props: TProps): Promise<TSessionData> {
  return await fetchJson(CONFIRM_ENDPOINT, "POST", {
    username: props.username,
    oldPassword: props.oldPassword,
    newPassword: props.newPassword,
  });
}
