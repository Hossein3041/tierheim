"use client";

import { jwtDecode } from "jwt-decode";
import { loginFetch } from "@/queries/auth/Login";
import { logoutFetch } from "@/queries/auth/Logout";
import { refreshTokenFetch } from "@/queries/auth/RefreshToken";
import { ConfirmationError } from "@/constants/Error";
import { confirmFetch } from "@/queries/auth/Confirm";

type TSession = {
  AccessToken: string;
  IdToken: string;
  RefreshToken: string;
};

type TJwtDecoded = {
  aud: string;
  auth_time: number;
  "cognito:username": string;
  "cognito:groups": string[];
  email: string;
  email_verified: boolean;
  event_id: string;
  name: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  origin_jti: string;
  sub: string;
  token_use: string;
};

function isSessionEmpty({
  AccessToken,
  IdToken,
  RefreshToken,
}: TSession): boolean {
  return !AccessToken || !IdToken || !RefreshToken;
}

function clearSession() {
  if (!window) {
    throw new Error("window is not defined!");
  }
  window.localStorage.removeItem("AccessToken");
  window.localStorage.removeItem("IdToken");
  window.localStorage.removeItem("RefreshToken");
}

function isSessionValid(session: TSession): boolean {
  if (isSessionEmpty(session)) {
    return false;
  }
  let decodedIdToken = jwtDecode(session.IdToken);
  if (!decodedIdToken || !decodedIdToken.exp) {
    return false;
  }
  const currentTime = Math.floor(Date.now() / 1000);
  const expirationTime = decodedIdToken.exp - 2;
  return expirationTime > currentTime;
}

function setSession(session: TSession) {
  if (!window) {
    throw new Error("window is not defined!");
  }
  if (!isSessionValid(session)) {
    throw new Error("Session is not valid!");
  }
  window.localStorage.setItem("AccessToken", session.AccessToken);
  window.localStorage.setItem("IdToken", session.IdToken);
  window.localStorage.setItem("RefreshToken", session.RefreshToken);
}

function getSession(): TSession {
  if (!window) {
    throw new Error("window is not defined!");
  }
  let AccessToken = window.localStorage.getItem("AccessToken");
  let IdToken = window.localStorage.getItem("IdToken");
  let RefreshToken = window.localStorage.getItem("RefreshToken");
  const session: TSession = {
    AccessToken: AccessToken || "",
    IdToken: IdToken || "",
    RefreshToken: RefreshToken || "",
  };
  if (isSessionEmpty(session)) {
    throw new Error("Session is empty!");
  }
  return session;
}

export function getUsername(): string {
  try {
    const session = getSession();
    const decodedIdToken: TJwtDecoded = jwtDecode(session.IdToken);
    if (!decodedIdToken || !decodedIdToken["cognito:username"]) {
      return "-";
    }
    return decodedIdToken["cognito:username"];
  } catch (err) {
    return "-";
  }
}

export function getEmail(): string {
  try {
    const session = getSession();
    const decodedIdToken: TJwtDecoded = jwtDecode(session.IdToken);
    if (!decodedIdToken || !decodedIdToken["email"]) {
      return "-";
    }
    return decodedIdToken["email"];
  } catch (err) {
    return "-";
  }
}

export function getRoles(): string[] | undefined {
  try {
    const session = getSession();
    const decodedIdToken: TJwtDecoded = jwtDecode(session.IdToken);
    if (decodedIdToken["cognito:groups"]) {
      return decodedIdToken["cognito:groups"];
    }
  } catch (ignored) {}
}

export function isDriver(): boolean {
  const roles = getRoles();
  if (roles) {
    return roles.includes("driver");
  }
  return false;
}

export async function confirm(
  username: string,
  oldPassword: string,
  newPassword: string,
): Promise<boolean> {
  try {
    const response = await confirmFetch({ username, oldPassword, newPassword });
    setSession({
      AccessToken: response.accessToken,
      IdToken: response.idToken,
      RefreshToken: response.refreshToken,
    });
    return true;
  } catch (err) {
    console.error(err);
  }
  clearSession();
  return false;
}

export async function login(
  username: string,
  password: string,
): Promise<boolean> {
  try {
    const response = await loginFetch({ username, password });
    setSession({
      AccessToken: response.accessToken,
      IdToken: response.idToken,
      RefreshToken: response.refreshToken,
    });
    return true;
  } catch (err) {
    if (err instanceof ConfirmationError) {
      throw new ConfirmationError();
    }
    console.error(err);
  }
  clearSession();
  return false;
}

export async function logout(): Promise<boolean> {
  try {
    const session = getSession();
    await logoutFetch({ token: session.RefreshToken });
    clearSession();
    return true;
  } catch (err) {
    console.error(err);
  }
  clearSession();
  return false;
}

export async function refresh_token(): Promise<boolean> {
  try {
    const session = getSession();
    if (!isSessionValid(session)) {
      const data = await refreshTokenFetch({ token: session.RefreshToken });
      setSession({
        AccessToken: data.accessToken,
        IdToken: data.idToken,
        RefreshToken: session.RefreshToken,
      });
    }
    return true;
  } catch (err) {
    console.error(err);
  }
  clearSession();
  return false;
}
