import { logout } from "@app/_auth/Authentication";

export async function fetchFile(
  url: string,
  method: string = "PUT",
  body?: any,
  contentType?: string,
  params?: any,
) {
  if (!window) {
    return undefined;
  }
  if (process.env.NEXT_PUBLIC_ENV !== "local" && !url.startsWith("http")) {
    url =
      window.location.origin +
      "/" +
      process.env.NEXT_PUBLIC_APP_NAME +
      "/" +
      url;
  }
  const response = await fetch(
    params ? url + "?" + new URLSearchParams(params) : url,
    {
      method,
      headers: {
        "Content-Type": contentType || "application/json",
        Authorization: window.localStorage.getItem("IdToken") || "",
      },
      body: body,
    },
  );

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      await logout();
    }
  }
}

export async function fetchBlob(
  url: string,
  method: string = "GET",
  params?: any,
) {
  if (!window) {
    return undefined;
  }
  if (process.env.NEXT_PUBLIC_ENV !== "local" && !url.startsWith("http")) {
    url =
      window.location.origin +
      "/" +
      process.env.NEXT_PUBLIC_APP_NAME +
      "/" +
      url;
  }
  const response = await fetch(
    params ? url + "?" + new URLSearchParams(params) : url,
    {
      method,
      headers: {
        Authorization: window.localStorage.getItem("IdToken") || "",
      },
    },
  );

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      await logout();
    }
  }

  const responseContentType = response.headers.get("Content-Type");
  if (response.status === 204 || !responseContentType) {
    return null;
  }
  return response.blob();
}
