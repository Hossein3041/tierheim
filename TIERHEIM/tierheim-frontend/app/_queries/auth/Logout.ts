import fetchJson from "@/queries/JsonFetcher";
import { LOGOUT_ENDPOINT } from "@/queries/Endpoints";

const TOKEN_QUERY_PARAMETER = "token";

type TProps = {
  token: string;
};

export async function logoutFetch(props: TProps) {
  return await fetchJson(
    LOGOUT_ENDPOINT + "?" + TOKEN_QUERY_PARAMETER + "=" + props.token,
  );
}
