"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import { Button, Typography, useTheme, useMediaQuery } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { LOGINTEXTS } from "@/constants/texts/Texts";
import { CustomInputField } from "@/components/customInputFields";
import { FooterBox } from "@/components/footerBox";
import { CustomButton } from "@/components/customButton";
import { useRouter } from "next/navigation";
import { login, confirm } from "@app/_auth/Authentication";
import internalRedirect from "@/queries/RedirectManager";
import { ConfirmationError } from "@/constants/Error";
import { EPAGES } from "@/constants/Pages";
import { useContext } from "react";
import { UtilContext } from "@/components/context/contextFile";
import { CODE_TO_ALERT } from "@/constants/Alerts";

export function LoginCardComponent() {
  const router = useRouter();
  //const [show, setShow] = React.useState(false);
  const theme = useTheme();
  const palette = theme.palette.login;
  const isMobile = useMediaQuery("(max-width: 830px)");
  const { setAlert } = useContext(UtilContext);
  // Sollte ausdiskutiert werden, ob wir Schatten haben wollen oder nicht: Siehe Kommentar von Hossein3041 auf Jira
  //const flashShadowValue = "0 0.1px 0.1px rgba(0,0,0,0.1)";
  const [showPassword, setShowPassword] = React.useState(false);
  const [flashShadow, setFlashShadow] = React.useState(false);

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  const [isLoggingIn, setLoggingIn] = React.useState(false);
  const [isConfirmation, setConfirmation] = React.useState(false);
  const [isError, setError] = React.useState(false);
  const [isNewPasswordError, setNewPasswordError] = React.useState(false);
  const [helperText, setHelperText] = React.useState("");

  const defaultShadow = theme.shadows[1];
  const flashShadowValue = theme.shadows[1];
  const triggerFlash = () => {
    setFlashShadow(true);
    setTimeout(() => setFlashShadow(false), 200);
  };

  const validatePassword = (pw: string) => {
    if (pw.length < 8) throw new Error(LOGINTEXTS.validatePassword.minChar);
    if (!/[0-9]/.test(pw))
      throw new Error(LOGINTEXTS.validatePassword.minNumber);
    if (!/[a-z]/.test(pw))
      throw new Error(LOGINTEXTS.validatePassword.minLower);
    if (!/[A-Z]/.test(pw))
      throw new Error(LOGINTEXTS.validatePassword.minUpper);
    const special = /[^\w\s]|(?<=\S) (?=\S)/;
    if (!special.test(pw)) {
      throw new Error(LOGINTEXTS.validatePassword.minSpecial);
    }
  };

  const handleLogin = async () => {
    setLoggingIn(true);
    try {
      const result = await login(username, password);
      if (result) {
        setAlert(CODE_TO_ALERT[6]);
        internalRedirect(EPAGES.DASHBOARD, router);
      } else {
        setError(true);
        setAlert(CODE_TO_ALERT[5]);
      }
    } catch (err) {
      if (err instanceof ConfirmationError) {
        setConfirmation(true);
        setError(false);
      } else {
        setError(true);
      }
    } finally {
      setLoggingIn(false);
    }
  };

  const handleConfirm = async () => {
    setLoggingIn(true);
    try {
      validatePassword(newPassword);
      setNewPasswordError(false);
      setHelperText("");

      const result = await confirm(username, password, newPassword);
      if (result) {
        internalRedirect(EPAGES.DASHBOARD, router);
      } else {
        setError(true);
      }
    } catch (error) {
      const e = error as Error;
      setHelperText(e.message);
      setNewPasswordError(true);
      setError(false);
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <>
      <Card
        sx={{
          width: "380px",
          mx: isMobile ? 2 : "auto",
          backgroundColor: palette.loginCardOneColor,
          overflow: "hidden",
          borderRadius: 4,
          boxShadow: flashShadow ? flashShadowValue : defaultShadow,
          transition: "box-shadow 0.01s ease",
        }}
      >
        <CardContent sx={{ p: 3, px: isMobile ? "auto" : 6 }}>
          <Box
            sx={{
              textAlign: "center",
              mt: 2.5,
            }}
          >
            <Box
              component="img"
              src="./Tierheim_Logo_Mobil.svg"
              sx={{
                width: 100,
              }}
            />
          </Box>
          <Typography
            variant="h6"
            sx={{
              color: palette.loginGreetingColor,
              textAlign: "center",
              fontSize: "28px",
              width: "100%",
            }}
          >
            {LOGINTEXTS.loginGreeting}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              textAlign: "center",
              width: "100%",
              fontSize: ".8rem",
              whiteSpace: "pre-line",
            }}
          >
            {LOGINTEXTS.loginInstruction}
          </Typography>
          <br />
          <Divider
            sx={{
              mx: 4,
              my: 2,
            }}
          />
          <br />
          <Stack spacing={2}>
            <CustomInputField
              id="benutzername"
              label={LOGINTEXTS.loginUsername}
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              error={isError}
              onMouseEnter={triggerFlash}
              onMouseLeave={triggerFlash}
            />
            <CustomInputField
              id="password"
              label={
                isConfirmation
                  ? LOGINTEXTS.unlockPassword
                  : LOGINTEXTS.loginPassword
              }
              type="password"
              value={password}
              showPassword={showPassword}
              onToggleShow={() => setShowPassword(!showPassword)}
              onChange={(e) => setPassword(e.target.value)}
              error={isError}
              onMouseEnter={triggerFlash}
              onMouseLeave={triggerFlash}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  isConfirmation ? handleConfirm() : handleLogin();
                }
              }}
            />
            {isConfirmation && (
              <CustomInputField
                id="newpassword"
                label={LOGINTEXTS.newPassword}
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                error={isNewPasswordError}
                helperText={helperText}
                onMouseEnter={triggerFlash}
                onMouseLeave={triggerFlash}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    isConfirmation ? handleConfirm() : handleLogin();
                  }
                }}
              />
            )}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <CustomButton
                onClick={isConfirmation ? handleConfirm : handleLogin}
                width="40%"
                backgroundColor={palette.loginButtonBackgroundColor}
                hoverColor={palette.loginButtonHoverColor}
                disabled={isLoggingIn}
              >
                {isConfirmation ? LOGINTEXTS.unlock : LOGINTEXTS.loginButton}
              </CustomButton>
            </Box>
          </Stack>
        </CardContent>
        <FooterBox
          linkText={LOGINTEXTS.passwordReset}
          linkHref="#"
          onMouseEnter={triggerFlash}
          onMouseLeave={triggerFlash}
        />
      </Card>
    </>
  );
}
