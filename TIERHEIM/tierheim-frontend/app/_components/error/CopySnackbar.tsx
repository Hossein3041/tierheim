import React, { SyntheticEvent, useMemo, useState } from "react";
import {
  Alert,
  AlertTitle,
  IconButton,
  Snackbar,
  SnackbarCloseReason,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slide,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Close, ContentCopy, ExpandMore } from "@mui/icons-material";
import { TAlert } from "@/constants/Alerts";

type TProps = {
  isOpen: boolean;
  handleClose: (
    event?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => void;
  alert: TAlert;
};

function TransitionLeft(props: any) {
  return <Slide {...props} direction="left" />;
}

export default function CopySnackbar({ isOpen, handleClose, alert }: TProps) {
  const [copied, setCopied] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const timestamp = useMemo(() => new Date().toISOString(), []);

  const handleCopy = () => {
    const textToCopy =
      `Date: ${timestamp}\n` +
      `Message: ${alert?.message}\n` +
      `ErrorMessage: ${alert?.errorMessage}\n` +
      `Error: ${alert?.stackTrace}`;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const autoHideDuration =
    alert?.durationMs ??
    (alert?.type === "success"
      ? Number(process.env.NEXT_PUBLIC_ALERT_FADE_OUT)
      : undefined);

  const onClose = (
    event?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === "clickaway") return;
    handleClose(event, reason);
  };

  return (
    <Snackbar
      key={`${alert?.type}-${alert?.message}-${timestamp}`}
      open={isOpen}
      autoHideDuration={autoHideDuration}
      onClose={onClose}
      anchorOrigin={{
        vertical: isMobile ? "bottom" : "bottom",
        horizontal: isMobile ? "center" : "left",
      }}
      TransitionComponent={TransitionLeft}
      sx={{ p: 1 }}
    >
      <Alert
        severity={alert?.type}
        variant="filled"
        onClose={onClose}
        sx={{
          width: "min(340px, 42vw)",
          borderRadius: 3,
          boxShadow: 3,
          alignItems: "flex-start",
          "& .MuiAlert-message": {
            width: "70%",
          },
          ...(alert?.type === "success" && {
            backgroundColor: theme.palette.login.loginButtonBackgroundColor,
          }),
        }}
        action={
          <>
            <Tooltip title={copied ? "Kopiert" : "In Zwischenablage"}>
              <IconButton
                size="small"
                aria-label="copy"
                color="inherit"
                onClick={handleCopy}
              >
                <ContentCopy fontSize="small" />
              </IconButton>
            </Tooltip>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={onClose}
            >
              <Close fontSize="small" />
            </IconButton>
          </>
        }
      >
        <AlertTitle sx={{ mb: 0.5 }}>
          {alert?.type === "success"
            ? "Erfolg"
            : alert?.type === "error"
              ? "Fehler"
              : alert?.type === "warning"
                ? "Warnung"
                : "Info"}
        </AlertTitle>
        <div
          style={{
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            lineHeight: 1.35,
            marginBottom: alert?.errorMessage || alert?.stackTrace ? 6 : 0,
          }}
        >
          <div
            style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              opacity: 0.85,
              fontSize: 12,
            }}
          >
            {timestamp}
          </div>
          {alert?.message}
        </div>
        {(alert?.errorMessage || alert?.stackTrace) && (
          <Accordion
            elevation={0}
            disableGutters
            square
            expanded={showDetails}
            onChange={(_, e) => setShowDetails(e)}
            sx={{
              mt: 0.5,
              bgcolor: "transparent",
              "&:before": { display: "none" },
              borderRadius: 2,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore htmlColor="inherit" />}
              sx={{
                minHeight: 36,
                "& .MuiAccordionSummary-content": { my: 0.5 },
                px: 0,
                color: "inherit",
                opacity: 0.9,
                textDecoration: "underline",
                textUnderlineOffset: "3px",
                cursor: "pointer",
              }}
            >
              Details anzeigen
            </AccordionSummary>
            <AccordionDetails
              sx={{
                px: 0,
                pt: 0,
                maxHeight: 200,
                overflow: "auto",
                fontFamily:
                  "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                fontSize: 12,
                opacity: 0.95,
              }}
            >
              {alert?.errorMessage && (
                <>
                  <strong>ErrorMessage:</strong>
                  <br />
                  {alert.errorMessage}
                  <br />
                  <br />
                </>
              )}
              {alert?.stackTrace && (
                <>
                  <strong>StackTrace:</strong>
                  <br />
                  <pre
                    style={{
                      margin: 0,
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-word",
                    }}
                  >
                    {alert.stackTrace}
                  </pre>
                </>
              )}
            </AccordionDetails>
          </Accordion>
        )}
        {copied && (
          <div
            style={{
              marginTop: 6,
              fontSize: 12,
              opacity: 0.85,
            }}
          >
            Kopiert!
          </div>
        )}
      </Alert>
    </Snackbar>
  );
}
