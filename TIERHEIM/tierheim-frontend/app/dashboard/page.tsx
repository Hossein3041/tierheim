"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function Dashboard() {
  const router = useRouter();
  React.useEffect(() => {
    router.replace("/dashboard/animals");
  }, [router]);

  return null;
}

// import { useEffect, useRef, useState } from "react";
// import { Stack, useTheme } from "@mui/material";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { TouchBackend } from "react-dnd-touch-backend";
// import {
//   MultiBackend,
//   MouseTransition,
//   TouchTransition,
// } from "react-dnd-multi-backend";

// import LogoutIcon from "@mui/icons-material/Logout";
// import type { Theme } from "@mui/material/styles";
// import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
// import CircleIconButton from "@/components/circleIconButton";
// import AnimalTabView from "@/components/TabView/AnimalTabView";
// import { logout } from "@app/_auth/Authentication";
// import internalRedirect from "@app/_queries/RedirectManager";
// import { useRouter } from "next/navigation";
// import { useUIConfig } from "@/util/useUIConfig";
// import { GlobalDragLayer } from "@/components/room/GlobalDragLayer";
// import {
//   DragIntentProvider,
//   useDragIntent,
// } from "@/components/room/DragIntentContext";
// import { useDragLayer } from "react-dnd";
// import Box from "@mui/material/Box";
// import { PetArchivedModal } from "@/components/archive/PetArchivedModal";

// const LONG_PRESS_MS = 500;

// function DashboardInner() {
//   const [tabsEnabled, setTabsEnabled] = useState(false);
//   const [activeTab, setActiveTab] = useState(1);
//   const [searchQuery, setSearchQuery] = useState("");

//   const { isMobile, isTouch } = useUIConfig();
//   const theme = useTheme();
//   const palette = theme.palette.home;
//   const router = useRouter();

//   const [isLongPress, setIsLongPress] = useState(false);
//   const [longPressPoint, setLongPressPoint] = useState<{
//     x: number;
//     y: number;
//   } | null>(null);
//   const longPressTO = useRef<number | null>(null);
//   const activeTouchId = useRef<number | null>(null);

//   const { startPtRef, gateUntilRef, reset: resetIntent } = useDragIntent();
//   const { isDragging } = useDragLayer((m) => ({ isDragging: m.isDragging() }));

//   useEffect(() => {
//     setTabsEnabled(true);
//   }, []);

//   useEffect(() => {
//     if (!isTouch) return;

//     const opts: AddEventListenerOptions = { passive: true, capture: true };

//     const onTouchStart = (e: TouchEvent) => {
//       const t = e.touches[0];
//       if (!t) return;

//       startPtRef.current = { x: t.clientX, y: t.clientY };
//       gateUntilRef.current = performance.now() + 220;

//       activeTouchId.current = t.identifier ?? null;
//       setLongPressPoint({ x: t.clientX, y: t.clientY });

//       if (longPressTO.current) clearTimeout(longPressTO.current);
//       longPressTO.current = window.setTimeout(() => {
//         setIsLongPress(true);
//       }, LONG_PRESS_MS) as unknown as number;
//     };

//     const onTouchMove = (e: TouchEvent) => {
//       const id = activeTouchId.current;
//       const t =
//         id == null
//           ? e.touches[0]
//           : Array.from(e.touches).find((tt) => tt.identifier === id);
//       if (t) setLongPressPoint({ x: t.clientX, y: t.clientY });
//     };

//     const resetAll = () => {
//       if (longPressTO.current) {
//         clearTimeout(longPressTO.current);
//         longPressTO.current = null;
//       }
//       setIsLongPress(false);
//       activeTouchId.current = null;

//       if (!isDragging) {
//         resetIntent();
//       }
//     };

//     document.addEventListener("touchstart", onTouchStart, opts);
//     document.addEventListener("touchmove", onTouchMove, opts);
//     document.addEventListener("touchend", resetAll, opts);
//     document.addEventListener("touchcancel", resetAll, opts);

//     return () => {
//       document.removeEventListener("touchstart", onTouchStart, opts);
//       document.removeEventListener("touchmove", onTouchMove, opts);
//       document.removeEventListener("touchend", resetAll, opts);
//       document.removeEventListener("touchcancel", resetAll, opts);
//       if (longPressTO.current) clearTimeout(longPressTO.current);
//     };
//   }, [isTouch, startPtRef, gateUntilRef, resetIntent, isDragging]);

//   const logUserOut = async () => {
//     await logout();
//     internalRedirect("/login", router);
//   };

//   const handleSearch = (q: string) => {
//     setSearchQuery(q);
//   };

//   const [archivedOpen, setArchivedOpen] = useState(false);

//   return (
//     <Stack
//       minHeight="100%"
//       px={!isMobile ? "5rem" : 0}
//       justifyContent="center"
//       alignItems="stretch"
//       sx={{ overflowX: "hidden", bgcolor: palette.background }}
//     >
//       {/* <Header
//         tabsEnabled={tabsEnabled}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         onSearch={handleSearch}
//       /> */}

//       <AnimalTabView
//         activeTab={activeTab}
//         onLogout={logUserOut}
//         searchQuery={searchQuery}
//       />

//       {!isMobile && (
//         <Box
//           sx={{
//             position: "fixed",
//             left: 8,
//             bottom: 20,
//             zIndex: (t: Theme) => t.zIndex.tooltip + 1,
//           }}
//         >
//           <CircleIconButton
//             onClick={logUserOut}
//             sx={{
//               bgcolor: (t) => t.palette.common.white,
//               "& svg": { color: (t) => t.palette.grey[600] },
//               "&:hover svg": { color: (t) => t.palette.action.active },
//             }}
//           >
//             <LogoutIcon
//               fontSize="small"
//               sx={{ color: (t) => t.palette.grey[600] }}
//             />
//           </CircleIconButton>
//         </Box>
//       )}

//       {!isMobile && (
//         <Box
//           sx={{
//             position: "fixed",
//             right: 8,
//             bottom: 20,
//             zIndex: 999999,
//           }}
//         >
//           <CircleIconButton
//             onClick={() => setArchivedOpen(true)}
//             sx={{
//               bgcolor: (t) => t.palette.common.white,
//               "& svg": { color: (t) => t.palette.grey[600] },
//               "&:hover svg": { color: (t) => t.palette.action.active },
//             }}
//           >
//             <Inventory2OutlinedIcon
//               fontSize="small"
//               sx={{ color: (t) => t.palette.grey[600] }}
//             />
//           </CircleIconButton>

//           <PetArchivedModal
//             open={archivedOpen}
//             onClose={() => setArchivedOpen(false)}
//           />
//         </Box>
//       )}

//       <GlobalDragLayer
//         isTouch={isTouch}
//         isLongPress={isLongPress}
//         longPressPoint={longPressPoint}
//       />
//     </Stack>
//   );
// }

// export default function Dashboard() {
//   const { isTouch } = useUIConfig();
//   const BACKENDS = {
//     backends: [
//       {
//         id: "touch",
//         backend: TouchBackend,
//         options: {
//           delayTouchStart: LONG_PRESS_MS,
//           touchSlop: 16,
//           enableMouseEvents: true,
//           ignoreContextMenu: true,
//         },
//         preview: isTouch ? true : false,
//         transition: TouchTransition,
//       },
//       {
//         id: "html5",
//         backend: HTML5Backend,
//         preview: isTouch ? true : false,
//         transition: MouseTransition,
//       },
//     ],
//   };

//   useEffect(() => {
//     const html = document.documentElement;
//     const body = document.body;
//     const prevHtmlOverflow = html.style.overflow;
//     const prevBodyOverflow = body.style.overflow;
//     const prevHtmlOB = html.style.overscrollBehavior;
//     const prevBodyOB = body.style.overscrollBehavior;

//     return () => {
//       html.style.overflow = prevHtmlOverflow;
//       body.style.overflow = prevBodyOverflow;
//       html.style.overscrollBehavior = prevHtmlOB;
//       body.style.overscrollBehavior = prevBodyOB;
//     };
//   }, []);

//   return (
//     <DndProvider backend={MultiBackend} options={BACKENDS}>
//       <DragIntentProvider>
//         <div
//           id="scroll-root"
//           style={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             right: 0,
//             bottom: 0,
//             height: "100%",
//             overflowY: "auto",
//             overscrollBehavior: "contain",
//             WebkitOverflowScrolling: "auto",
//           }}
//         >
//           <DashboardInner />
//         </div>
//       </DragIntentProvider>
//     </DndProvider>
//   );
// }
