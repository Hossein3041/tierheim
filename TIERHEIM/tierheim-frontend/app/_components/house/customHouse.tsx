import React, { useEffect, useRef, useState, useCallback } from "react";
import { Box, SxProps, Theme } from "@mui/material";
import { useUIConfig } from "@/util/useUIConfig";
import HouseHeader from "./houseHeader";
import RoomOverview from "@/components/room/roomOverview";
import { RoomConfig } from "./types";
import { PETS } from "@/constants/texts/Texts";
import EdgeSwipeDuringDrag from "@/components/room/EdgeSwipeDuringDrag";
import { useDragLayer } from "react-dnd";

interface CustomHouseProps {
  title: string;
  rooms: RoomConfig[];
  onOpenPetModal: (pet: {
    name: string;
    breed: string;
    id: number;
    imageUrl: string;
    group: string;
  }) => void;
  searchQuery?: string;
  houseTotalCount: number;
  houseTotalMax: number;
}

const SCROLL_SETTLE_MAX_MS = 800;
const SCROLL_EPS = 2;
const SCROLL_STABLE_FRAMES = 2;
const DROP_PAUSE_MS = 420;
const MAX_AUTO_STEPS = 6;

export default function CustomHouse({
  title,
  rooms,
  onOpenPetModal,
  searchQuery,
  houseTotalCount,
  houseTotalMax,
}: CustomHouseProps) {
  const { isMobile, isTabletVertical, isTabletHorizontal } = useUIConfig();

  const { isDragging } = useDragLayer((m) => ({ isDragging: m.isDragging() }));

  const handleOpenPet = (pet: any) => {
    onOpenPetModal({
      name: pet.name,
      breed:
        typeof pet.breed === "string"
          ? pet.breed
          : pet.breed?.name || PETS.unknown,
      id: pet.id,
      imageUrl: pet.image || "",
      group: pet.locationUnit || "",
    });
  };

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [edgeZone, setEdgeZone] = useState<"left" | "right" | "none">("none");

  const activeIndexRef = useRef(0);
  const loopDirRef = useRef<null | "left" | "right">(null);
  const loopStepRef = useRef(0);
  const runningLoopRef = useRef(false);
  const mountedRef = useRef(true);
  const edgeZoneRef = useRef<"left" | "right" | "none">("none");

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const stopAutoLoop = useCallback(() => {
    loopDirRef.current = null;
    loopStepRef.current = 0;
    runningLoopRef.current = false;
  }, []);

  const getTargetLeft = useCallback((index: number) => {
    const el = containerRef.current;
    if (!el) return 0;
    const children = Array.from(el.children) as HTMLElement[];
    const target = children[index];
    if (!target) return 0;
    const gapCompensation = 0;
    const centerLeft =
      target.offsetLeft -
      (el.clientWidth - target.clientWidth) / 2 +
      gapCompensation;
    const maxLeft = el.scrollWidth - el.clientWidth;
    return Math.max(0, Math.min(centerLeft, maxLeft));
  }, []);

  const alignToIndex = useCallback(
    (index: number) => {
      const el = containerRef.current;
      if (!el) return;
      el.scrollTo({ left: getTargetLeft(index), behavior: "auto" });
    },
    [getTargetLeft],
  );

  const computeActive = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const left = el.scrollLeft;
    let best = 0;
    let bestDist = Number.POSITIVE_INFINITY;
    const children = Array.from(el.children) as HTMLElement[];
    for (let i = 0; i < children.length; i++) {
      const tLeft = getTargetLeft(i);
      const d = Math.abs(left - tLeft);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    }
    setActiveIndex((prev) => (prev !== best ? best : prev));
  }, [getTargetLeft]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        computeActive();
        ticking = false;
      });
    };

    computeActive();
    el.addEventListener("scroll", onScroll, { passive: true });
    const ro = new ResizeObserver(() => computeActive());
    ro.observe(el);

    return () => {
      el.removeEventListener("scroll", onScroll as any);
      ro.disconnect();
    };
  }, [rooms.length, computeActive]);

  const canSwipeLeft = useCallback(() => activeIndexRef.current > 0, []);
  const canSwipeRight = useCallback(
    () => activeIndexRef.current < rooms.length - 1,
    [rooms.length],
  );

  const smoothToIndex = useCallback(
    (index: number) => {
      const el = containerRef.current;
      if (!el) return;
      el.scrollTo({ left: getTargetLeft(index), behavior: "smooth" });
    },
    [getTargetLeft],
  );

  const waitForSettle = useCallback(
    (index: number): Promise<void> => {
      const el = containerRef.current;
      if (!el) return Promise.resolve();
      const targetLeft = getTargetLeft(index);
      let framesStable = 0;
      const start = performance.now();
      return new Promise<void>((resolve) => {
        const tick = () => {
          const diff = Math.abs(el.scrollLeft - targetLeft);
          framesStable = diff <= SCROLL_EPS ? framesStable + 1 : 0;
          if (
            framesStable >= SCROLL_STABLE_FRAMES ||
            performance.now() - start >= SCROLL_SETTLE_MAX_MS
          )
            resolve();
          else requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    [getTargetLeft],
  );

  const doOneStep = useCallback(
    (dir: "left" | "right"): number | null => {
      const cur = activeIndexRef.current;
      if (dir === "left") {
        if (!canSwipeLeft()) return null;
        const next = cur - 1;
        smoothToIndex(next);
        return next;
      } else {
        if (!canSwipeRight()) return null;
        const next = cur + 1;
        smoothToIndex(next);
        return next;
      }
    },
    [canSwipeLeft, canSwipeRight, smoothToIndex],
  );

  const stepThenMaybeRepeat = useCallback(
    async (dir: "left" | "right") => {
      if (!isMobile || !mountedRef.current) return;

      if (
        (dir === "left" && !canSwipeLeft()) ||
        (dir === "right" && !canSwipeRight())
      ) {
        alignToIndex(activeIndexRef.current);
        stopAutoLoop();
        return;
      }

      const nextIndex = doOneStep(dir);
      if (nextIndex == null) {
        alignToIndex(activeIndexRef.current);
        stopAutoLoop();
        return;
      }

      await waitForSettle(nextIndex);
      if (!mountedRef.current) return;

      alignToIndex(nextIndex);
      setActiveIndex((prev) => (prev !== nextIndex ? nextIndex : prev));
      activeIndexRef.current = nextIndex;

      await new Promise<void>((res) => setTimeout(res, DROP_PAUSE_MS));
      if (!mountedRef.current) return;

      if (edgeZoneRef.current !== dir) {
        stopAutoLoop();
        return;
      }

      if (loopStepRef.current >= MAX_AUTO_STEPS) {
        stopAutoLoop();
        return;
      }

      loopStepRef.current += 1;
      await stepThenMaybeRepeat(dir);
    },
    [
      isMobile,
      canSwipeLeft,
      canSwipeRight,
      doOneStep,
      waitForSettle,
      alignToIndex,
      stopAutoLoop,
    ],
  );

  const handleEdgeDwell = useCallback(
    (dir: "left" | "right") => {
      if (!isMobile || runningLoopRef.current) return;

      if (
        (dir === "left" && !canSwipeLeft()) ||
        (dir === "right" && !canSwipeRight())
      ) {
        alignToIndex(activeIndexRef.current);
        return;
      }

      runningLoopRef.current = true;
      loopDirRef.current = dir;
      loopStepRef.current = 0;

      stepThenMaybeRepeat(dir).finally(() => {
        runningLoopRef.current = false;
      });
    },
    [isMobile, canSwipeLeft, canSwipeRight, alignToIndex, stepThenMaybeRepeat],
  );

  const preventWhileDrag = isMobile && isDragging;

  const strictBlockHandlers = {};

  const isLooping = !!loopDirRef.current;

  const DEAD_ANIMALS_SECTION_ID = 43;
  const deadAnimalsRoomOverride = {
    [`& > #-${DEAD_ANIMALS_SECTION_ID}`]: {
      flex: "0 0 100%",
      maxWidth: "100%",
    },
  } as const;

  const roomStyles: SxProps<Theme> = isMobile
    ? {
        mt: 2,
        pb: 3,
        display: "flex",
        flexWrap: "nowrap",

        overflowX: preventWhileDrag ? "hidden" : "auto",
        columnGap: 3,
        scrollSnapType: preventWhileDrag || isLooping ? "none" : "x mandatory",

        touchAction: preventWhileDrag ? "pan-y" : "pan-x",
        WebkitOverflowScrolling: "touch",
        "& > div": {
          scrollSnapAlign: preventWhileDrag ? "none" : "center",
          flex: "0 0 85%",
          maxWidth: "85%",
          flexShrink: 0,
        },
        ...deadAnimalsRoomOverride,
      }
    : isTabletVertical
      ? {
          mt: 2,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignItems: "stretch",
          gap: 4,
          "& > div": {
            flex: "0 0 47.1%",
            maxWidth: "47.1%",
            flexShrink: 0,
          },
          ...deadAnimalsRoomOverride,
        }
      : isTabletHorizontal
        ? {
            mt: 2,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "stretch",
            gap: 4,
            "& > div": {
              flex: "0 0 31.04121%",
              maxWidth: "31.04121%",
              flexShrink: 0,
            },
            ...deadAnimalsRoomOverride,
          }
        : {
            pt: "20px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            alignItems: "stretch",
            alignContent: "stretch",
            gap: 4,
            "& > div": {
              flex: "0 0 360px",
              maxWidth: 360,
              flexShrink: 0,
            },
            ...deadAnimalsRoomOverride,
          };

  const isDirAllowed = useCallback(
    (dir: "left" | "right") =>
      dir === "left" ? canSwipeLeft() : canSwipeRight(),
    [canSwipeLeft, canSwipeRight],
  );

  return (
    <Box
      id={"custom-house-" + title}
      sx={{ width: "100%", px: isMobile ? 1 : 3, boxSizing: "border-box" }}
    >
      <HouseHeader
        title={title}
        count={houseTotalCount}
        max={houseTotalMax}
        sx={{ width: "100%" }}
      />

      <Box
        id={"custom-house-container-" + title}
        ref={containerRef}
        sx={roomStyles}
        {...strictBlockHandlers}
      >
        {rooms.map((room, index) => (
          <RoomOverview
            key={room.id}
            houseTitle={title}
            room={room}
            onOpenPetModal={handleOpenPet}
            isActiveRoom={index === activeIndex}
            edgeZone={edgeZone}
            searchQuery={searchQuery}
          />
        ))}
      </Box>

      <EdgeSwipeDuringDrag
        scrollerRef={containerRef as React.RefObject<HTMLElement>}
        enabled={isMobile && isDragging}
        dwellMs={500}
        cooldownMs={350}
        hotMin={80}
        hotMax={220}
        hotFrac={0.32}
        vPad={24}
        onDwell={handleEdgeDwell}
        onZoneChange={(z) => {
          setEdgeZone(z);
          edgeZoneRef.current = z;

          if (z === "left" && !canSwipeLeft()) {
            alignToIndex(activeIndexRef.current);
            stopAutoLoop();
          }
          if (z === "right" && !canSwipeRight()) {
            alignToIndex(activeIndexRef.current);
            stopAutoLoop();
          }

          if (z === "none" && loopDirRef.current) stopAutoLoop();
          if (loopDirRef.current && z !== loopDirRef.current) stopAutoLoop();
        }}
        isDirAllowed={isDirAllowed}
      />
    </Box>
  );
}
