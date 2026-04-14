"use client";

import React, { useMemo, useState } from "react";
import {
  Box,
  GlobalStyles,
  Paper,
  Stack,
  Theme,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import TabButton from "@/components/TabView/TabButton";
import { ARCHIVETEXTS, PETS } from "@/constants/texts/Texts";
import MobileLogoutButton from "./MobileLogoutButton";
import { PetArchivedModal } from "../archive/PetArchivedModal";
import { logout } from "@app/_auth/Authentication";
import internalRedirect from "@app/_queries/RedirectManager";
import { useRouter } from "next/navigation";
import AppTheme from "@app/_styles/appTheme";
import CircleIconButton from "../circleIconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { useScreenSize } from "@app/_util/useScreenSize";

type AnimalTabViewProps = {
  children: React.ReactNode;
  tabs?: string[];
};

export const TabContext = React.createContext<{
  selectedTab: number;
  setSelectedTab: (index: number) => void;
  overflowTabs?: string[];
  selectedRace?: string;
}>({
  selectedTab: 0,
  setSelectedTab: () => {},
  overflowTabs: [],
  selectedRace: undefined,
});

export default function PetsTabs({
  children,
  tabs = [PETS.all],
}: AnimalTabViewProps) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const { isMobile, isDesktop, isTablet } = useScreenSize();

  const { visibleTabs, overflowTabs } = useMemo(() => {
    if (isDesktop) {
      return { visibleTabs: tabs, overflowTabs: [] };
    }

    const maxTabs = isTablet ? 4 : 4;

    if (tabs.length <= maxTabs) {
      return { visibleTabs: tabs, overflowTabs: [] };
    }

    const alwaysVisible = tabs.slice(0, maxTabs - 1);
    const overflow = tabs.slice(maxTabs - 1);

    return {
      visibleTabs: [...alwaysVisible, PETS.other],
      overflowTabs: overflow,
    };
  }, [tabs, isMobile, isTablet, isDesktop]);

  const activeTab = visibleTabs[selectedTab] ?? PETS.all;

  React.useEffect(() => {
    if (selectedTab >= visibleTabs.length) {
      setSelectedTab(0);
    }
  }, [visibleTabs.length, selectedTab]);

  const router = useRouter();

  const theme = useTheme();
  const palette = theme.palette.animalFile;

  const logUserOut = async () => {
    await logout();
    internalRedirect("/login", router);
  };

  return (
    <ThemeProvider theme={AppTheme}>
      <GlobalStyles
        styles={{
          img: {
            WebkitUserDrag: "none",
            userSelect: "none",
            WebkitTouchCallout: "none",
          },
          ".MuiAvatar-img": {
            WebkitUserDrag: "none",
            pointerEvents: "none",
            userSelect: "none",
          },
        }}
      />

      <Paper
        elevation={0}
        sx={{
          mt: isMobile ? 0 : 2,
          borderRadius: isMobile ? 0 : "25px 25px 0 0",
          px: isMobile ? 1 : 3,
          pt: 2,
          pb: !isDesktop ? 10 : 20,
          backgroundColor: palette.fill,
          display: "flex",
          flexDirection: "column",
          minHeight: "calc(100vh - 32px)",
          position: "relative",
          boxShadow: "inset 0px 25px 20px -10px rgba(0, 0, 0, 0.15)",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", pt: 1 }}>
          <Stack
            direction="row"
            spacing={isMobile ? 0.5 : 1}
            flexWrap="nowrap"
            justifyContent="center"
            sx={{ overflowX: "auto" }}
          >
            {visibleTabs.map((title, index) => (
              <TabButton
                key={title + index}
                title={title}
                onClick={() => setSelectedTab(index)}
                isActive={selectedTab === index}
              />
            ))}
          </Stack>
        </Box>
        <TabContext.Provider
          value={{
            selectedTab,
            setSelectedTab,
            overflowTabs,
            selectedRace: activeTab,
          }}
        >
          {children}
        </TabContext.Provider>
        {isMobile && (
          <Box
            sx={{
              mt: 3,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              gap: 1.5,
              zIndex: 2,
            }}
          >
            <MobileLogoutButton onClick={logUserOut}>
              {ARCHIVETEXTS.logout}
            </MobileLogoutButton>
            <MobileLogoutButton onClick={() => setArchiveOpen(true)}>
              {ARCHIVETEXTS.archive}
            </MobileLogoutButton>
          </Box>
        )}
        {!isMobile && (
          <Box
            sx={{
              position: "fixed",
              left: 8,
              bottom: 20,
              zIndex: (t: Theme) => t.zIndex.tooltip + 1,
            }}
          >
            <CircleIconButton
              onClick={logUserOut}
              sx={{
                bgcolor: (t) => t.palette.common.white,
                "& svg": { color: (t) => t.palette.grey[600] },
                "&:hover svg": { color: (t) => t.palette.action.active },
              }}
            >
              <LogoutIcon
                fontSize="small"
                sx={{ color: (t) => t.palette.grey[600] }}
              />
            </CircleIconButton>
          </Box>
        )}

        {!isMobile && (
          <Box
            sx={{
              position: "fixed",
              right: 8,
              bottom: 20,
              zIndex: 999999,
            }}
          >
            <CircleIconButton
              onClick={() => setArchiveOpen(true)}
              sx={{
                bgcolor: (t) => t.palette.common.white,
                "& svg": { color: (t) => t.palette.grey[600] },
                "&:hover svg": { color: (t) => t.palette.action.active },
              }}
            >
              <Inventory2OutlinedIcon
                fontSize="small"
                sx={{ color: (t) => t.palette.grey[600] }}
              />
            </CircleIconButton>
          </Box>
        )}
        {archiveOpen && (
          <PetArchivedModal
            open={archiveOpen}
            onClose={() => setArchiveOpen(false)}
          />
        )}
      </Paper>
    </ThemeProvider>
  );
}
