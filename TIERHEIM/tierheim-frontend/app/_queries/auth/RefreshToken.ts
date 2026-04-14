import fetchJson from "@/queries/JsonFetcher";
import { REFRESH_TOKEN_ENDPOINT } from "@/queries/Endpoints";

const TOKEN_QUERY_PARAMETER = "token";

type TProps = {
  token: string;
};

type TSessionData = {
  idToken: string;
  accessToken: string;
};

export async function refreshTokenFetch(props: TProps): Promise<TSessionData> {
  return await fetchJson(
    REFRESH_TOKEN_ENDPOINT + "?" + TOKEN_QUERY_PARAMETER + "=" + props.token,
    undefined,
    undefined,
    undefined,
    true,
  );
}
