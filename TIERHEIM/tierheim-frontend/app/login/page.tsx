"use client";

import { Typography, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import { LoginCardComponent } from "./loginCardComponent";
import { LOGINTEXTS } from "@/constants/texts/Texts";

export default function LoginPage() {
  const theme = useTheme();
  const palette = theme.palette.login;
  const footerInfoColor = palette.loginBackgroundFooterInformationColor;
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: palette.loginBackgroundColor,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <LoginCardComponent />
      </Box>
      <Box
        mt="auto"
        sx={{
          py: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="caption"
          color={footerInfoColor}
          textAlign="center"
        >
          {LOGINTEXTS.organisationName}
        </Typography>
        <Typography
          variant="caption"
          color={footerInfoColor}
          textAlign="center"
        >
          {LOGINTEXTS.organisationAddress}
        </Typography>
        <Typography
          variant="caption"
          color={footerInfoColor}
          textAlign="center"
        >
          {LOGINTEXTS.organisationEmail}
        </Typography>
      </Box>
    </Box>
  );
}
