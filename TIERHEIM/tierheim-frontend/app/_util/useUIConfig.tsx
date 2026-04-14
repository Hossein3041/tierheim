import { useState, useEffect } from "react";
import { useMediaQuery } from "@mui/material";
import { usePathname } from "next/navigation";
import { EPAGES } from "@app/_constants/Pages";

export const MAX_MOBILE_WIDTH = 430;
export const MAX_TABLET_WIDTH_VERTICAL = 840;
export const MAX_TABLET_WIDTH_HORIZONTAL = 1200;
export const MIN_DESKTOP_WIDTH = 1201;

export const INPUT_HEIGHT = 45;
export const INPUT_SPECIAL_HEIGHT = "90px";
export const BUTTON_FONT_SIZE = "0.8rem";

export enum DeviceType {
  Mobile = "mobile",
  Tablet = "tablet",
  Desktop = "desktop",
}

export interface UIConfig {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouch: boolean;
  isTouchDevice: boolean;
  deviceType: DeviceType;
  isTabletVertical: boolean;
  isTabletHorizontal: boolean;
  isMobileLayout: boolean;
  isTabletLayout: boolean;
  isDesktopLayout: boolean;
  isLandscape: boolean;
  inputHeight: number;
  inputSpecialHeight: string;
  labelFontSize: string;
  inputFontSize: string;
  buttonFontSize: string;
  screenWidth: number;
  viewportWidth: number;
}

export const useUIConfig = () => {
  const [screenWidth, setScreenWidth] = useState(
    typeof window != "undefined" ? window.screen.width : 0,
  );

  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  // useEffect(() => {    
  //   const handleResize = () => {
  //     setScreenWidth(window.screen.width);
  //     setViewportWidth(window.innerWidth);
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  const isTouchDevice =
    typeof window !== "undefined"
      ? navigator.maxTouchPoints > 0 ||
        window.matchMedia("(pointer: coarse)").matches
      : false;

  const isMobileDevice = screenWidth < MAX_MOBILE_WIDTH && isTouchDevice;
  const isTabletDevice =
    screenWidth > MAX_MOBILE_WIDTH &&
    screenWidth <= MAX_TABLET_WIDTH_HORIZONTAL &&
    isTouchDevice;
  const isTabletDeviceVertical =
    screenWidth > MAX_MOBILE_WIDTH &&
    screenWidth <= MAX_TABLET_WIDTH_VERTICAL &&
    isTouchDevice;
  const isTabletDeviceHorizontal =
    screenWidth > MAX_TABLET_WIDTH_VERTICAL &&
    screenWidth <= MAX_TABLET_WIDTH_HORIZONTAL &&
    isTouchDevice;
  const isDesktopDevice =
    screenWidth > MAX_TABLET_WIDTH_HORIZONTAL || !isTouchDevice;

  const isMobileLayout = useMediaQuery(`(max-width:${MAX_MOBILE_WIDTH}px)`);

  const isTabletLayout = useMediaQuery(
    `(min-width:${MAX_MOBILE_WIDTH}px) and (max-width:${MAX_TABLET_WIDTH_HORIZONTAL}px)`,
  );

  const isDesktopLayout = useMediaQuery(`(min-width:${MIN_DESKTOP_WIDTH}px)`);

  const isLandscape = useMediaQuery("(orientation: landscape)");

  const labelFontSize = isDesktopLayout ? "0.8rem" : "0.7rem";
  const inputFontSize = isDesktopLayout ? "0.8rem" : "0.7rem";

  const deviceType: DeviceType = isDesktopDevice
    ? DeviceType.Desktop
    : isTabletDevice
      ? DeviceType.Tablet
      : DeviceType.Mobile;

  return {
    isMobile: isMobileDevice,
    isTablet: isTabletDevice,
    isTouch: isMobileDevice || isTabletDevice,
    isTabletVertical: isTabletDeviceVertical && !isLandscape,
    isTabletHorizontal: isTabletDeviceHorizontal && isLandscape,
    isDesktop: isDesktopDevice,
    isTouchDevice,
    isMobileLayout,
    isTabletLayout,
    isDesktopLayout,
    inputHeight: INPUT_HEIGHT,
    inputSpecialHeight: INPUT_SPECIAL_HEIGHT,
    labelFontSize,
    inputFontSize,
    buttonFontSize: BUTTON_FONT_SIZE,
    isLandscape,
    screenWidth,
    viewportWidth,
    deviceType,
  };
};
