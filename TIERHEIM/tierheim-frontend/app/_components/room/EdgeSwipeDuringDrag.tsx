"use client";

import React, { useEffect, useRef } from "react";
import { useDragLayer } from "react-dnd";

type Zone = "left" | "right" | "none";

type Props = {
  scrollerRef: React.RefObject<HTMLElement>;
  enabled: boolean;
  dwellMs?: number;
  cooldownMs?: number;
  hotMin?: number;
  hotMax?: number;
  hotFrac?: number;
  vPad?: number;
  onDwell: (dir: "left" | "right") => void;
  onZoneChange?: (zone: Zone) => void;
  isDirAllowed?: (dir: "left" | "right") => boolean;
};

export default function EdgeSwipeDuringDrag({
  scrollerRef,
  enabled,
  dwellMs = 500,
  cooldownMs = 350,
  hotMin = 64,
  hotMax = 160,
  hotFrac = 0.24,
  vPad = 0,
  onDwell,
  onZoneChange,
  isDirAllowed,
}: Props) {
  const { isDragging, clientOffset } = useDragLayer((m) => ({
    isDragging: m.isDragging(),
    clientOffset: m.getClientOffset(),
  }));

  const leftTimer = useRef<number | null>(null);
  const rightTimer = useRef<number | null>(null);
  const cooling = useRef(false);
  const lastZoneRef = useRef<Zone>("none");

  const clearTimers = () => {
    if (leftTimer.current) {
      window.clearTimeout(leftTimer.current);
      leftTimer.current = null;
    }
    if (rightTimer.current) {
      window.clearTimeout(rightTimer.current);
      rightTimer.current = null;
    }
  };

  useEffect(() => () => clearTimers(), []);

  useEffect(() => {
    if (!enabled || !isDragging) {
      clearTimers();
      lastZoneRef.current = "none";
      onZoneChange?.("none");
    }
  }, [enabled, isDragging]);

  useEffect(() => {
    if (!enabled || !isDragging) return;

    const host = scrollerRef.current;
    const p = clientOffset;
    if (!host || !p) return;

    const rect = host.getBoundingClientRect();
    const hot = Math.max(hotMin, Math.min(rect.width * hotFrac, hotMax));

    const inLeft =
      p.x <= rect.left + hot &&
      p.y >= rect.top + vPad &&
      p.y <= rect.bottom - vPad;
    const inRight =
      p.x >= rect.right - hot &&
      p.y >= rect.top + vPad &&
      p.y <= rect.bottom - vPad;
    const zone: Zone = inLeft ? "left" : inRight ? "right" : "none";

    if (zone !== lastZoneRef.current) {
      lastZoneRef.current = zone;
      onZoneChange?.(zone);
    }

    if (cooling.current) return;

    if (zone === "left") {
      if (isDirAllowed && !isDirAllowed("left")) {
        clearTimers();
        return;
      }
      if (rightTimer.current) {
        window.clearTimeout(rightTimer.current);
        rightTimer.current = null;
      }
      if (!leftTimer.current) {
        leftTimer.current = window.setTimeout(() => {
          leftTimer.current = null;
          onDwell("left");
          cooling.current = true;
          window.setTimeout(() => (cooling.current = false), cooldownMs);
        }, dwellMs) as unknown as number;
      }
    } else if (zone === "right") {
      if (isDirAllowed && !isDirAllowed("right")) {
        clearTimers();
        return;
      }
      if (leftTimer.current) {
        window.clearTimeout(leftTimer.current);
        leftTimer.current = null;
      }
      if (!rightTimer.current) {
        rightTimer.current = window.setTimeout(() => {
          rightTimer.current = null;
          onDwell("right");
          cooling.current = true;
          window.setTimeout(() => (cooling.current = false), cooldownMs);
        }, dwellMs) as unknown as number;
      }
    } else {
      clearTimers();
    }
  }, [enabled, isDragging, clientOffset, isDirAllowed]);

  return null;
}
