"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { NAVIGATIONTABS } from "@app/_constants/Tabs";
import NavigationTab from "@/components/TabNavigation/NavigationTab";
import { useScreenSize } from "@app/_util/useScreenSize";

const tabEntries = Object.entries(NAVIGATIONTABS);

type TabNavigationProps = {
  tabsEnabled: boolean;
  activeTab: number;
  onTabClick?: (key: string) => void;
};

export default function TabNavigation({
  tabsEnabled,
  activeTab,
  onTabClick,
}: TabNavigationProps) {
  const theme = useTheme();
  const { isMobile, isTablet } = useScreenSize();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLElement | null)[]>([]);
  const palette = theme.palette;

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const activeEl = tabRefs.current[activeTab];
    const containerEl = containerRef.current;

    if (activeEl && containerEl) {
      const rect = activeEl.getBoundingClientRect();
      const containerRect = containerEl.getBoundingClientRect();
      setIndicatorStyle({
        left: rect.left - containerRect.left,
        width: rect.width,
      });
    }
  }, [activeTab]);

  const componentWidth =  "auto";

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        display="flex"
        justifyContent="center"
        width={componentWidth}
      >
        <Box
          ref={containerRef}
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: palette.navigation.tabBackground,
            borderRadius: "9999px",
            border: `1px solid ${palette.navigation.border}`,
            gap: isMobile ? 0.5 : 1.25,
            padding: isMobile ? "2px" : "2px",
            overflow: "hidden",
            width: isMobile ? "100%" : componentWidth,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 2,
              bottom: 2,
              left: indicatorStyle.left,
              width: indicatorStyle.width,
              backgroundColor: palette.navigation.tabActive,
              borderRadius: "9999px",
              transition: "left 0.3s ease, width 0.3s ease",
              zIndex: 1,
            }}
          />

          {tabEntries.map(([key, label], index) => {
            const isActive = index === activeTab;
            const isDisabled =
              !tabsEnabled && label === NAVIGATIONTABS.APPOINTMENTS;

            const isFirst = index === 0;
            const isLast = index === tabEntries.length - 1;

            return (
              <NavigationTab
                key={key}
                label={label}
                isActive={isActive}
                disabled={isDisabled}
                onClick={() => onTabClick?.(key)}
                setRef={(el: unknown) => {
                  tabRefs.current[index] = el as HTMLElement | null;
                }}
                isFirst={isFirst}
                isLast={isLast}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
