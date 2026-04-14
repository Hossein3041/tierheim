import { logout, refresh_token } from "@app/_auth/Authentication";
import { isPublicUrl } from "@/queries/Endpoints";
import { ConfirmationError } from "@app/_constants/Error";

export default async function fetchJson<T = unknown>(
  url: string,
  method: string = "GET",
  body?: any,
  params?: any,
  isRefresh?: boolean,
  contentType?: string,
): Promise<T> {
  if (!window) {
    throw new Error("FetchJson is only supported in browser environments");
  }

  if (process.env.NEXT_PUBLIC_ENV !== "local" && !url.startsWith("http")) {
    url =
      window.location.origin +
      "/" +
      process.env.NEXT_PUBLIC_APP_NAME +
      "/" +
      url;
  }

  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": contentType || "application/json",
      ...(isPublicUrl(url)
        ? {}
        : {
            Authorization: window.localStorage.getItem("IdToken") || "",
            Authentication: window.localStorage.getItem("AccessToken") || "",
          }),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  if (!isPublicUrl(url) && !isRefresh) {
    await refresh_token();
  }

  const response = await fetch(
    params ? url + "?" + new URLSearchParams(params) : url,
    fetchOptions,
  );

  if (!response.ok) {
    const respBody = await response.clone().text();
    if (response.status === 401 || response.status === 403) {
      await logout();
      throw new Error(`Unauthorized or forbidden (status ${response.status})`);
    }
    if (response.status === 412) {
      throw new ConfirmationError();
    }
    if (response.status === 502) {
      throw new Error("Server unavailable (status 502)");
    }
    throw new Error(`HTTP error ${response.status}: ${respBody}`);
  }

  const responseContentType = response.headers.get("Content-Type");
  if (response.status === 204 || !responseContentType) {
    if (method.toUpperCase() === "DELETE") {
      return undefined as T; // Für DELETE-Anfragen wird void erwartet
    }
    throw new Error("No content returned from server");
  }

  if (!responseContentType.includes("application/json")) {
    throw new Error(
      `Expected JSON response, received: ${responseContentType || "none"}`,
    );
  }

  return response.json() as Promise<T>;
}

export async function fetchVoid(
  url: string,
  method: string = "POST", // Updates sind meist POST/PUT
  body?: any,
  params?: any,
  isRefresh?: boolean,
  contentType?: string,
): Promise<void> {
  if (!window) throw new Error("Only in browser");

  if (process.env.NEXT_PUBLIC_ENV !== "local" && !url.startsWith("http")) {
    url = `${window.location.origin}/${process.env.NEXT_PUBLIC_APP_NAME}/${url}`;
  }

  const headers: Record<string, string> = {};
  // Content-Type nur setzen, wenn du tatsächlich JSON schickst
  if (body !== undefined && !(body instanceof FormData)) {
    headers["Content-Type"] = contentType || "application/json";
  }

  const fetchOptions: RequestInit = {
    method,
    headers: {
      ...headers,
      ...(isPublicUrl(url)
        ? {}
        : {
          Authorization: window.localStorage.getItem("IdToken") || "",
          Authentication: window.localStorage.getItem("AccessToken") || "",
        }),
    },
    ...(body !== undefined
      ? { body: body instanceof FormData ? body : JSON.stringify(body) }
      : {}),
  };

  if (!isPublicUrl(url) && !isRefresh) {
    await refresh_token();
  }

  const response = await fetch(
    params ? url + "?" + new URLSearchParams(params) : url,
    fetchOptions,
  );

  if (!response.ok) {
    const respBody = await response.clone().text();
    if (response.status === 401 || response.status === 403) {
      await logout();
      throw new Error(`Unauthorized or forbidden (status ${response.status})`);
    }
    if (response.status === 412) throw new ConfirmationError();
    if (response.status === 502) throw new Error("Server unavailable (502)");
    throw new Error(`HTTP error ${response.status}: ${respBody}`);
  }

  // Erfolgreich – kein JSON erwartet, einfach zurück
  return;
}

