"use client";

import React, { useMemo, useState } from "react";
import { Box, Stack, useTheme, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchPetOverview } from "@app/_queries/pets/GetOverview";
import { CategorizedPetOverview, PetData } from "@/constants/pets/pets";
import { PETS, ANIMALTABVIEW } from "@/constants/texts/Texts";
import TabButton from "@/components/TabView/TabButton";
import { useUIConfig } from "@/util/useUIConfig";
import PetArchivedDetails from "@/components/archive/PetArchivedDetails";
import { OpenPetPayload } from "@/components/modals/petModals";
import { AppointmentDTO } from "@app/_queries/appointments/GetAppointments";

type Props = {
  searchQuery?: string;
  onOpenPetModal?: (p: OpenPetPayload) => void;
  modalWidthPx?: number;
  mode?: "archive" | "selectPet";
  setPet?: (x: AppointmentDTO["referencedPet"]) => void;
};

export default function PetArchivedTabs({
  searchQuery = "",
  onOpenPetModal,
  modalWidthPx,
  mode = "archive",
  setPet,
}: Props) {
  const theme = useTheme();
  const palette = theme.palette.animalFile;
  const { isMobile, isDesktop, isTabletVertical } = useUIConfig();

  const [selectedTab, setSelectedTab] = useState(0);

  const { data, isLoading, isFetching } = useQuery<CategorizedPetOverview>({
    queryKey: ["pet-overview", { archived: true }],
    queryFn: () => fetchPetOverview({ archived: true }),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    initialData: { categorizedPets: [] },
  });

  const animalTabs = useMemo(
    () => [PETS.all, ...data.categorizedPets.map((c) => c.category)],
    [data.categorizedPets],
  );

  const { visibleTabs, overflowTabs } = useMemo(() => {
    const allTabs = animalTabs;
    const maxTabs = isMobile ? 4 : Number.POSITIVE_INFINITY;

    if (allTabs.length <= maxTabs)
      return { visibleTabs: allTabs, overflowTabs: [] };

    const alwaysVisible = allTabs.slice(0, maxTabs - 1);
    const overflow = allTabs.slice(maxTabs - 1);
    return {
      visibleTabs: [...alwaysVisible, PETS.other],
      overflowTabs: overflow,
    };
  }, [animalTabs, isMobile]);

  React.useEffect(() => {
    if (selectedTab >= visibleTabs.length) setSelectedTab(0);
  }, [visibleTabs.length, selectedTab]);

  const currentCategory = visibleTabs[selectedTab] ?? PETS.all;
  const categorizedPets = data?.categorizedPets ?? [];

  const petsToDisplayBase: PetData[] = useMemo(() => {
    if (currentCategory === PETS.all)
      return categorizedPets.flatMap((g) => g.pets);
    if (currentCategory === PETS.other) {
      return categorizedPets
        .filter((g) => overflowTabs.includes(g.category))
        .flatMap((g) => g.pets);
    }
    return (
      categorizedPets.find((g) => g.category === currentCategory)?.pets ?? []
    );
  }, [categorizedPets, currentCategory, overflowTabs]);

  const q = searchQuery.trim().toLowerCase();
  const petsToDisplay = useMemo(
    () =>
      q.length === 0
        ? petsToDisplayBase
        : petsToDisplayBase.filter((p) =>
            (p.name ?? "").toLowerCase().includes(q),
          ),
    [petsToDisplayBase, q],
  );

  const MOBILE_GAP_PX = 8;

  const measureRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const [tabWidthPx, setTabWidthPx] = React.useState<number | null>(null);
  const desktopFontSize = isDesktop ? 12 : isTabletVertical ? 12 : 14;
  const EXTRA_HORIZONTAL_PADDING = 22;

  const DESKTOP_TAB_FONT_SIZE = 13;
  const DESKTOP_TAB_MIN_HEIGHT = 38;
  const DESKTOP_TAB_PADDING_Y = 0.6;
  const DESKTOP_TAB_RADIUS = 18;

  React.useEffect(() => {
    if (isMobile) {
      setTabWidthPx(null);
      return;
    }
    const t = requestAnimationFrame(() => {
      const widths = measureRefs.current.map(
        (el) => el?.getBoundingClientRect().width ?? 0,
      );
      const max = widths.length ? Math.max(...widths) : 0;
      const maxWidth = isDesktop ? 80 : isTabletVertical ? 60 : 80;
      setTabWidthPx(
        Math.min(Math.ceil(max) + EXTRA_HORIZONTAL_PADDING, maxWidth),
      );
    });
    return () => cancelAnimationFrame(t);
  }, [visibleTabs, isMobile, desktopFontSize, isDesktop]);

  const handleOpenPetModal = (p: OpenPetPayload) => {
    onOpenPetModal?.(p);
  };

  const tabCount = visibleTabs.length || 1;
  const proportionalTabWidth = React.useMemo(() => {
    if (!modalWidthPx) return null;

    const totalPadding = isDesktop ? 15 : 40;
    const availableWidth = modalWidthPx - totalPadding;

    const widthPerTab = availableWidth / tabCount;
    return isDesktop ? Math.floor(widthPerTab * 1.1) : Math.floor(widthPerTab);
  }, [isDesktop, modalWidthPx, tabCount]);

  return (
    <Box sx={{ mt: 2, width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "center", pt: 1, mb: 0 }}>
        <Stack
          direction="row"
          spacing={isDesktop ? 0.25 : isMobile ? 0 : 0.5}
          flexWrap={isMobile || isDesktop ? "nowrap" : "wrap"}
          justifyContent={isMobile ? "flex-start" : "center"}
          sx={{
            width: "100%",
            gap: isMobile ? `${MOBILE_GAP_PX}px` : undefined,
          }}
        >
          {visibleTabs.length === 0 ? (
            <TabButton
              title={ANIMALTABVIEW.noCategories}
              isActive={false}
              disabled
              key="no-categories"
            />
          ) : (
            visibleTabs.map((title, index) => (
              <Box
                key={title + index}
                sx={
                  isMobile
                    ? {
                        flex: `0 0 calc((100% - ${3 * MOBILE_GAP_PX}px) / 4)`,
                        width: `calc((100% - ${3 * MOBILE_GAP_PX}px) / 4)`,
                      }
                    : { flex: "1 1 0", minWidth: 0 }
                }
              >
                <TabButton
                  title={title}
                  onClick={() => setSelectedTab(index)}
                  isActive={selectedTab === index}
                  isArchived
                  sx={{
                    width: `${proportionalTabWidth ?? 100}px`,
                    fontSize: isDesktop
                      ? `${DESKTOP_TAB_FONT_SIZE}px`
                      : `${desktopFontSize}px`,
                    lineHeight: 1.15,
                    minHeight: 28,
                    height: "auto",
                    px: isMobile ? 0 : 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderTopRightRadius: "15px",
                    borderTopLeftRadius: "15px",
                    textAlign: "center",
                    overflowWrap: "anywhere",
                    wordBreak: "break-word",
                    overflow: "hidden",
                    whiteSpace: "normal",
                    textOverflow: "ellipsis",
                    transition: "width 0.2s ease-out",
                  }}
                />
              </Box>
            ))
          )}
        </Stack>

        {!isMobile && (
          <Box
            sx={{
              position: "absolute",
              visibility: "hidden",
              pointerEvents: "none",
              height: 0,
              overflow: "hidden",
            }}
          >
            {visibleTabs.map((title, i) => (
              <span
                key={`m-${title}-${i}`}
                ref={(el) => {
                  measureRefs.current[i] = el;
                }}
                style={{
                  fontWeight: 600,
                  fontSize: `${desktopFontSize}px`,
                  lineHeight: "1.1",
                  padding: "0 8px",
                  display: "inline-block",
                }}
              >
                {title}
              </span>
            ))}
          </Box>
        )}
      </Box>

      <Box
        sx={{
          backgroundColor: palette.tabActiveText,
          borderTop: `20px solid ${palette.tabText}`,
          borderTopLeftRadius: isMobile ? "0px" : "5px",
          borderTopRightRadius: isMobile ? "0px" : "5px",
          borderBottomLeftRadius: "25px",
          borderBottomRightRadius: "25px",
          overflowX: "hidden",
        }}
      >
        {isLoading || isFetching ? (
          Array.from({ length: 10 }).map((_, idx) => (
            <PetArchivedDetails
              key={`sk-${idx}`}
              loading
              bgWhite={idx % 2 === 0}
              borderRadiusTop={idx === 0}
              borderRadiusBottom={idx === 5}
              onOpenPetModal={() => {}}
            />
          ))
        ) : petsToDisplay.length === 0 ? (
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary, px: 1, py: 2 }}
          >
            Keine archivierten Tiere in dieser Kategorie.
          </Typography>
        ) : (
          petsToDisplay.map((p, idx) => {
            return (
              <PetArchivedDetails
                key={p.id}
                pet={p}
                bgWhite={idx % 2 === 0}
                borderRadiusTop={idx === 0}
                borderRadiusBottom={idx === petsToDisplay.length - 1}
                onOpenPetModal={handleOpenPetModal}
                mode={mode}
                setPet={setPet}
              />
            );
          })
        )}
      </Box>
    </Box>
  );
}
