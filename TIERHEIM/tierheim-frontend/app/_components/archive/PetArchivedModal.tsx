"use client";

import * as React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  useTheme,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useUIConfig } from "@/util/useUIConfig";
import PetArchivedTabs from "@/components/archive/PetArchivedTabs";
import { PetModals, OpenPetPayload } from "@/components/modals/petModals";
import SearchBar from "@/components/TabNavigation/SearchBar";
import { ARCHIVETEXTS } from "@/constants/texts/Texts";
import { AppointmentDTO } from "@app/_queries/appointments/GetAppointments";

type PetArchivedModalProps = {
  open: boolean;
  onClose: () => void;
  setPet?: (x: AppointmentDTO["referencedPet"]) => void;
  mode?: "archive" | "selectPet";
};

export function PetArchivedModal({ open, onClose, setPet, mode = "archive" }: PetArchivedModalProps) {
  const theme = useTheme();
  const {
    isMobile,
    isTablet,
    isTabletVertical,
    isTabletHorizontal,
    isDesktop,
    viewportWidth,
    screenWidth,
  } = useUIConfig();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [detailPet, setDetailPet] = React.useState<OpenPetPayload | null>(null);
  const [fixedSize, setFixedSize] = React.useState<{
    widthPx: number;
    heightPx: number;
  } | null>(null);

  React.useEffect(() => {
    if (!open) return;

    const screenW =
      typeof window !== "undefined" ? window.screen.width : screenWidth;
    const screenH = typeof window !== "undefined" ? window.screen.height : 0;

    const viewW =
      typeof window !== "undefined" ? window.innerWidth : viewportWidth;
    const viewH = typeof window !== "undefined" ? window.innerHeight : 0;

    const DESKTOP_WIDTH_RATIO = 0.5;
    const TAB_H_WIDTH_RATIO = 0.65;
    const TAB_V_WIDTH_RATIO = 0.8;
    const MOBILE_WIDTH_RATIO = 0.95;
    const HEIGHT_RATIO = 0.7;

    let widthPx: number;
    let heightPx: number;

    if (isDesktop) {
      widthPx = Math.round(screenW * DESKTOP_WIDTH_RATIO);
      heightPx = Math.round(screenH * HEIGHT_RATIO);
    } else if (isTabletHorizontal) {
      widthPx = Math.round(viewW * TAB_H_WIDTH_RATIO);
      heightPx = Math.round(viewH * HEIGHT_RATIO);
    } else if (isTabletVertical || isTablet) {
      widthPx = Math.round(viewW * TAB_V_WIDTH_RATIO);
      heightPx = Math.round(viewH * HEIGHT_RATIO);
    } else {
      widthPx = Math.round(viewW * MOBILE_WIDTH_RATIO);
      heightPx = Math.round(viewH * HEIGHT_RATIO);
    }

    const MIN_W = 320;
    const MIN_H = 420;
    const MAX_W = Math.max(360, Math.round(viewW * 0.98));
    const MAX_H = Math.max(480, Math.round(viewH * 0.9));

    setFixedSize({
      widthPx: Math.min(Math.max(widthPx, MIN_W), MAX_W),
      heightPx: Math.min(Math.max(heightPx, MIN_H), MAX_H),
    });
  }, [open]);

  if (open && !fixedSize) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth={false}
      sx={{
        "& .MuiDialog-container": { p: 0 },
        "& .MuiPaper-root": {
          m: 0,
          width: fixedSize ? `${fixedSize.widthPx}px` : undefined,
          height: fixedSize ? `${fixedSize.heightPx}px` : undefined,
          maxWidth: "100%",
          borderRadius: "25px",
          overflow: "hidden",
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        },
      }}
      PaperProps={{
        sx: {
          display: "flex",
          flexDirection: "column",
          height: 600,
          backgroundColor: theme.palette.petmodal.dialogVerticalDivLineColor,
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
          px: { xs: 3, sm: 4.5 },
          py: { xs: 1.3, sm: 2 },
        }}
      >
        <Typography variant="h6" component="div">
          {ARCHIVETEXTS.archive}
        </Typography>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: theme.palette.petmodal.dialogXColor,
            "&:hover": { color: theme.palette.petmodal.dialogXHoverColor },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          flex: 1,
          px: isMobile ? 1 : 3,
          py: 2,
          backgroundColor:
            theme.palette.archiveComponent.archiveContentBackgroundColor,
          color: theme.palette.archiveComponent.archiveContentBackgroundColor,
        }}
      >
        <PetArchivedTabs
          searchQuery={searchQuery}
          onOpenPetModal={(p) => setDetailPet(p)}
          modalWidthPx={fixedSize?.widthPx}
          mode={mode}
          setPet={setPet}
        />
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor:
            theme.palette.archiveComponent.archiveActionBackgroundColor,
          color: theme.palette.archiveComponent.archiveActionBackgroundColor,
          display: "flex",
          justifyContent: isMobile ? "center" : "flex-end",
          alignItems: "center",
          py: 2,
          px: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: isMobile ? "center" : "flex-end",
            alignItems: "center",
            width: isMobile ? "100%" : "auto",
            ...(!isMobile && { pr: 3 }),
          }}
        >
          <SearchBar
            onSearch={setSearchQuery}
            mobileMode="inline"
            debounceMs={120}
          />
        </Box>

        {detailPet && (
          <PetModals
            onOpen={true}
            onClose={() => setDetailPet(null)}
            pet={detailPet}
          />
        )}
      </DialogActions>
    </Dialog>
  );
}
