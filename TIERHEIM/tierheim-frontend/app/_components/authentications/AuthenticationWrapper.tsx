"use client";

import { refresh_token } from "@app/_auth/Authentication";
import { usePathname, useRouter } from "next/navigation";
import { Container, LinearProgress, Stack, Typography } from "@mui/material";
import React, { ReactNode, useEffect, useState } from "react";
import internalRedirect from "@/queries/RedirectManager";
import Image from "next/image";
import { EPAGES } from "@/constants/Pages";

const privateRoutes: string[] = [EPAGES.DASHBOARD, EPAGES.ANIMALS, EPAGES.OCCUPANCY, EPAGES.APPOINTMENTS];
const publicRoutes: string[] = [EPAGES.LOGIN, "/"];

type TProps = {
  onLoad?: () => void;
  children: ReactNode | ReactNode[];
};

export default function AuthenticationWrapper({ onLoad, children }: TProps) {
  const router = useRouter();
  const [isAuthenticating, setAuthorizing] = useState(false);
  let path = usePathname();
  useEffect(() => {
    refresh_token()
      .then((isAuthenticated) => {
        path = path.replaceAll("index.html", "");
        path = path.replaceAll(".html", "");
        const isPrivateRoute = privateRoutes.includes(path);
        const isPublicRoute = publicRoutes.includes(path);

        if (isPrivateRoute && !isAuthenticated) {
          internalRedirect("/login", router);
        } else if (isPublicRoute && isAuthenticated) {
          internalRedirect(EPAGES.DASHBOARD, router);
        } else {
          setAuthorizing(false);
        }
      })
      .catch(() => {
        internalRedirect("/login", router);
        setAuthorizing(false);
      });
  }, []);

  if (isAuthenticating) {
    return (
      <>
        <Container maxWidth={"xs"} sx={{ height: "100dvh" }}>
          <Stack height={"100%"} justifyContent={"space-around"}>
            <Stack
              justifyContent={"center"}
              alignItems={"center"}
              height={"100%"}
              gap={"5rem"}
            >
              <Image
                src={
                  "/" +
                  process.env.NEXT_PUBLIC_APP_NAME +
                  "/" +
                  process.env.NEXT_PUBLIC_LOGO_FILE
                }
                alt={"Logo"}
                width={0}
                height={0}
                sizes="2.5rem"
                style={{
                  width: "50rem",
                  height: "20rem",
                  maxHeight: "30%",
                  maxWidth: "calc(100vw - 5rem)",
                }}
              />
              <Stack width={"100%"} alignItems={"center"} gap={"2rem"}>
                <Typography variant={"h5"}>
                  Nutzer wird authentifiziert
                </Typography>
                <LinearProgress color={"primary"} sx={{ width: "50%" }} />
              </Stack>
            </Stack>
            <Stack height={"100%"}></Stack>
          </Stack>
        </Container>
      </>
    );
  }
  if (onLoad) {
    onLoad();
  }
  return <>{children}</>;
}
