"use client";

import { useEffect, useState, SyntheticEvent } from "react";
import { SnackbarCloseReason, ThemeProvider } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LicenseInfo } from "@mui/x-license";

import AppTheme from "@/styles/appTheme";
import QueryClientWrapper from "@/queries/QueryClientWrapper";
import { UtilContext } from "@/components/context/contextFile";
import { TAlert } from "@/constants/Alerts";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { CustomErrorComponent } from "@/components/error/CustomErrorComponent";
import CopySnackbar from "@/components/error/CopySnackbar";

import "react-toastify/dist/ReactToastify.css";
import AuthenticationWrapper from "./_components/authentications/AuthenticationWrapper";
require("dayjs/locale/de");

if (process.env.NEXT_PUBLIC_MUI_X_LICENSE_KEY) {
  LicenseInfo.setLicenseKey(process.env.NEXT_PUBLIC_MUI_X_LICENSE_KEY!);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setStateAlert] = useState<TAlert>({
    message: "",
    errorMessage: "",
    type: "success",
    stackTrace: "",
  });

  const [title, setTitle] = useState<string>(
    process.env.NEXT_PUBLIC_TITLE ?? "App",
  );

  const [trigger, setTrigger] = useState<number>(0);

  const setAlert = (a: TAlert) => {
    setStateAlert(a);
    setTrigger((t) => t + 1);
  };

  const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? "/tierheim";

  useEffect(() => {
    if (alert.message !== "") {
      setIsOpen(true);
    }
  }, [trigger, alert.message]);

  useEffect(() => {
    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register(`${bp}/sw.js`).catch(() => {});
    }
  }, [bp]);

  const handleClose = (
    _event?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") return;
    setIsOpen(false);
  };

  return (
    <html lang="de">
      <head>
        <title>{title}</title>
        <link rel="icon" type="image/png" href={`${bp}/tierheim_favicon.png`} />
        <link rel="manifest" href={`${bp}/manifest.json`} />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${bp}/pwa-icons/apple-touch-icon-180.png?v=2`}
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href={`${bp}/pwa-icons/apple-touch-icon-167.png?v=2`}
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href={`${bp}/pwa-icons/apple-touch-icon-152.png?v=2`}
        />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="apple-mobile-web-app-title"
          content={process.env.NEXT_PUBLIC_TITLE ?? "App"}
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body
        style={{
          height: "100%",
          margin: 0,
          padding: 0,
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <ThemeProvider theme={AppTheme}>
          <AppRouterCacheProvider>
            <QueryClientWrapper>
              <UtilContext.Provider
                value={{ alert, setAlert, title, setTitle }}
              >
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  adapterLocale="de"
                >
                  <ErrorBoundary
                    fallbackComponent={<CustomErrorComponent />}
                    setAlert={setAlert}
                  >
                    <AuthenticationWrapper>{children}</AuthenticationWrapper>
                  </ErrorBoundary>
                  <CopySnackbar
                    isOpen={isOpen}
                    handleClose={handleClose}
                    alert={alert}
                  />
                </LocalizationProvider>
              </UtilContext.Provider>
            </QueryClientWrapper>
          </AppRouterCacheProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
