"use client";

import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import { FooterBox } from "@/components/footerBox";
import { CustomButton } from "@/components/customButton";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { PETMODALTEXTS } from "@/constants/texts/Texts";
import { useScreenSize } from "@app/_util/useScreenSize";
import { useState } from "react";

interface PetModalsProps {
  onOpen: boolean;
  title: string;
  onClose: () => void;
  handleSave: () => void;
  children: React.ReactNode;
  size?: "small" | "large";
  disabled?: boolean;
  saveButtonText?: string;
  hideHistoryButton?: boolean;
  onHistoryClick?: () => void;
}

export function ModalLayout({
  onOpen,
  title,
  onClose,
  handleSave,
  children,
  size = "large",
  disabled,
  hideHistoryButton = false,
  saveButtonText = PETMODALTEXTS.fieldSaveButtonInputText,
  onHistoryClick,
}: PetModalsProps) {
  const theme = useTheme();
  const loginPalette = theme.palette.login;
  const inputfieldsPalette = theme.palette.inputfields;

  const { isMobile, isDesktop } = useScreenSize();

  const dialogWidth = size === "large" ? 640 : 480;

  return (
    <>
      <Dialog
        open={onOpen}
        onClose={onClose}
        maxWidth={false}
        PaperProps={{
          sx: {
            width: isDesktop
              ? dialogWidth + "px !important"
              : isMobile
                ? "90vw !important"
                : "80vw !important",
            maxWidth: "100%",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: theme.palette.petmodal.dialogSwitchCheckedTrackColorBlue,
            color: theme.palette.petmodal.dialogTitleColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 3,
            py: 1.5,
          }}
        >
          <Typography variant="body1" component="div">
            {title}
          </Typography>
          <IconButton
            onClick={onClose}
            size="small"
            sx={{
              color: theme.palette.petmodal.dialogXColor,
              transition: "color 0.3s ease",
              "&:hover": { color: theme.palette.petmodal.dialogXHoverColor },
              cursor: "pointer",
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 3,
          }}
        >
          {children}
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "0px",
          }}
        >
          <CustomButton
            onClick={onClose}
            width={isDesktop ? "100px" : "40%"}
            backgroundColor={inputfieldsPalette.inputTitleFieldColor}
            color={inputfieldsPalette.inputTitleColor}
            booleanBoxShadow={false}
            sx={{
              fontSize: "0.8rem",
            }}
          >
            {PETMODALTEXTS.fieldCancelationButtonInputText}
          </CustomButton>
          <CustomButton
            disabled={disabled}
            onClick={handleSave}
            width={isDesktop ? "100px" : "40%"}
            backgroundColor={theme.palette.petmodal.dialogSwitchLabelColor}
            color={loginPalette.loginCardOneColor}
            booleanBoxShadow={false}
            sx={{
              fontSize: "0.8rem",
            }}
          >
            {saveButtonText}
          </CustomButton>
        </DialogActions>
        <Box sx={{ height: (theme) => theme.spacing(0) }} />
        <FooterBox
          linkText={hideHistoryButton ? "" : PETMODALTEXTS.footerBoxLinkText}
          linkHref="#"
          onClick={onHistoryClick}
        />
      </Dialog>
    </>
  );
}
