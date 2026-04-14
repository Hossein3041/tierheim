"use client";

import React, { useEffect, useMemo, useRef } from "react";
import { Box, Avatar, useTheme } from "@mui/material";
import PetsIcon from "@mui/icons-material/Pets";
import { useDragLayer } from "react-dnd";
import { createPortal } from "react-dom";
import { useDragIntent } from "@/components/room/DragIntentContext";

type DragItem = {
  imageUrl?: string | null;
  name?: string;
  size?: number;
};
type Point = { x: number; y: number } | null;

const LAYER_Z = 2147483647;

const ROOT_SCROLL_ID = "scroll-root";

function getDocScroller(): HTMLElement {
  return (
    (document.getElementById("scroll-root") as HTMLElement | null) ||
    document.documentElement ||
    document.body
  );
}

function isDocumentScroller(el: HTMLElement): boolean {
  const docEl = getDocScroller();
  return el === docEl || el.id === ROOT_SCROLL_ID;
}

function canScrollUp(el: HTMLElement) {
  if (isDocumentScroller(el)) {
    const doc = getDocScroller();
    return doc.scrollTop > 0;
  }
  return el.scrollTop > 0;
}

function canScrollDown(el: HTMLElement) {
  if (isDocumentScroller(el)) {
    const doc = getDocScroller();
    const max = doc.scrollHeight - doc.clientHeight;
    return doc.scrollTop < max - 1;
  }
  return el.scrollTop < el.scrollHeight - el.clientHeight - 1;
}

export function GlobalDragLayer({
  isTouch,
  isLongPress,
  longPressPoint,
}: {
  isTouch: boolean;
  isLongPress: boolean;
  longPressPoint: Point;
}) {
  const theme = useTheme();

  const { intent, setIntent, startPtRef, gateUntilRef } = useDragIntent();
  const intentRef = useRef(intent);
  useEffect(() => {
    intentRef.current = intent;
  }, [intent]);

  const touchEnv = useMemo(() => {
    if (typeof window === "undefined") return false;
    return (
      "ontouchstart" in window ||
      (navigator as any)?.maxTouchPoints > 0 ||
      (typeof window.matchMedia === "function" &&
        window.matchMedia("(pointer: coarse)").matches)
    );
  }, []);
  const renderOnThisDevice = Boolean(isTouch) || touchEnv;

  const { item, isDragging, clientOffset, sourceClientOffset } = useDragLayer(
    (m) => ({
      item: m.getItem() as DragItem | null,
      clientOffset: m.getClientOffset(),
      sourceClientOffset: m.getSourceClientOffset(),
      isDragging: m.isDragging(),
    }),
  );

  const lastOffsetRef = useRef<{ x: number; y: number } | null>(null);
  const liveOffset = clientOffset ?? sourceClientOffset ?? null;
  useEffect(() => {
    if (liveOffset) lastOffsetRef.current = liveOffset;
  }, [liveOffset]);

  useEffect(() => {
    if (renderOnThisDevice && isLongPress && !isDragging && longPressPoint) {
      lastOffsetRef.current = { ...longPressPoint };
    }
  }, [renderOnThisDevice, isLongPress, isDragging, longPressPoint]);

  const wasDragging = useRef(false);
  useEffect(() => {
    if (
      renderOnThisDevice &&
      isDragging &&
      !wasDragging.current &&
      longPressPoint
    ) {
      if (!lastOffsetRef.current) lastOffsetRef.current = { ...longPressPoint };
    }
    wasDragging.current = isDragging;
  }, [renderOnThisDevice, isDragging, longPressPoint]);

  const freezeRef = useRef<{ VH: number; VO: number } | null>(null);
  useEffect(() => {
    if (!isDragging) freezeRef.current = null;
  }, [isDragging]);

  useEffect(() => {
    if (!isDragging) return;

    const prevent = (e: TouchEvent) => e.preventDefault();
    document.addEventListener("touchmove", prevent, {
      passive: false,
      capture: true,
    });

    const scroller = getDocScroller();
    const step = 10;
    let rafId: number | null = null;

    const startAutoscroll = () => {
      const raf = () => {
        if (!isDragging || !clientOffset) return;

        const y = clientOffset.y;
        const vh = window.innerHeight;
        const threshold = vh * 0.1;

        if (y < threshold && canScrollUp(scroller)) {
          scroller.scrollTop -= step;
        } else if (y > vh - threshold && canScrollDown(scroller)) {
          scroller.scrollTop += step;
        }

        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    };

    const delayId = setTimeout(startAutoscroll, 30);

    return () => {
      document.removeEventListener("touchmove", prevent, {
        capture: true,
      } as any);
      if (rafId) cancelAnimationFrame(rafId);
      clearTimeout(delayId);
    };
  }, [isDragging, clientOffset]);

  const preventRef = useRef<((e: Event) => void) | null>(null);

  const blockerActiveRef = useRef(false);
  const prevScrollerWOSRef = useRef<string>("");
  const prevHtmlOBRef = useRef<string>("");
  const prevBodyOBRef = useRef<string>("");

  useEffect(() => {
    const forceUnblock = () => {
      if (!blockerActiveRef.current) return;

      const scroller = getDocScroller() as HTMLElement;

      if (preventRef.current) {
        try {
          document.removeEventListener(
            "touchmove",
            preventRef.current as any,
            { capture: true } as any,
          );
        } catch {}
      }

      (scroller.style as any).webkitOverflowScrolling =
        prevScrollerWOSRef.current || "touch";
      const html = document.documentElement as any;
      const body = document.body as any;
      html.style.overscrollBehavior = prevHtmlOBRef.current || "";
      body.style.overscrollBehavior = prevBodyOBRef.current || "";

      blockerActiveRef.current = false;
    };

    document.addEventListener("touchend", forceUnblock, { capture: true });
    document.addEventListener("touchcancel", forceUnblock, { capture: true });
    window.addEventListener("pagehide", forceUnblock);
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState !== "visible") forceUnblock();
    });

    return () => {
      document.removeEventListener("touchend", forceUnblock, {
        capture: true,
      } as any);
      document.removeEventListener("touchcancel", forceUnblock, {
        capture: true,
      } as any);
      window.removeEventListener("pagehide", forceUnblock);
      document.removeEventListener("visibilitychange", forceUnblock as any);
    };
  }, []);

  const showPreGhost =
    renderOnThisDevice &&
    isLongPress &&
    (!isDragging || !item) &&
    (longPressPoint || lastOffsetRef.current);

  if (showPreGhost) {
    const p = longPressPoint ?? lastOffsetRef.current!;
    const size = 75;
    const x = (p?.x ?? 40) - size / 2;
    const y = (p?.y ?? 40) - size / 2;

    const preGhost = (
      <div
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          transform: `translate3d(${x}px, ${y}px, 0)`,
          willChange: "transform",
          pointerEvents: "none",
          zIndex: LAYER_Z,
          width: size,
          height: size,
          borderRadius: "35%",
          outline: "3px solid rgba(0,174,239,.6)",
          background: "rgba(0,0,0,.08)",
          boxShadow: "0 6px 16px rgba(0,0,0,.2)",
        }}
      />
    );

    const layerRoot = (
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: LAYER_Z,
        }}
      >
        {preGhost}
      </Box>
    );

    return typeof document !== "undefined"
      ? createPortal(layerRoot, document.body)
      : null;
  }

  if (!renderOnThisDevice) return null;
  if (!isDragging || !item) return null;

  const pos = lastOffsetRef.current;
  const size = (item.size ?? 50) * 1.5;
  const x = (pos?.x ?? 40) - size / 2;
  const y = (pos?.y ?? 40) - size / 2;

  const ghost = (
    <div
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        transform: `translate3d(${x}px, ${y}px, 0)`,
        willChange: "transform",
        pointerEvents: "none",
        zIndex: LAYER_Z,
      }}
    >
      <Avatar
        src={item.imageUrl || undefined}
        alt={item.name || ""}
        sx={{
          width: size,
          height: size,
          borderRadius: "35%",
          boxShadow: 6,
          opacity: 0.95,
          border: `4px solid ${theme.palette.animalFile.tabActive}`,
          backgroundColor: (th) =>
            item.imageUrl
              ? "transparent"
              : th.palette.animalImage?.animalImageBackgroundColor,
          objectFit: "cover",
          "& img": {
            WebkitUserDrag: "none",
            pointerEvents: "none",
            userSelect: "none",
          },
        }}
      >
        {!item.imageUrl && <PetsIcon />}
      </Avatar>
    </div>
  );

  const layerRoot = (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: LAYER_Z,
      }}
    >
      {ghost}
    </Box>
  );

  return typeof document !== "undefined"
    ? createPortal(layerRoot, document.body)
    : null;
}
