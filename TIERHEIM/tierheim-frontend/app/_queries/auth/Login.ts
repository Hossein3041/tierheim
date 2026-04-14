import fetchJson from "@/queries/JsonFetcher";
import { LOGIN_ENDPOINT } from "@/queries/Endpoints";

type TProps = {
  username: string;
  password: string;
};

type TSessionData = {
  idToken: string;
  accessToken: string;
  refreshToken: string;
};

export async function loginFetch(props: TProps): Promise<TSessionData> {
  return await fetchJson(LOGIN_ENDPOINT, "POST", {
    username: props.username,
    password: props.password,
  });
}
