import React, {
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDrag } from "react-dnd";
import { getEmptyImage } from "react-dnd-html5-backend";
import { DRAGANDDROP } from "@/constants/texts/Texts";
import { useUIConfig } from "@/util/useUIConfig";
import {
  AnimalImage,
  AnimalImageProps,
} from "@/components/animalFile/AnimalImage";

type DragItem = {
  petId: number;
  fromSectionId: number;
  imageUrl: string | null;
  name: string;
  size: number;
};

interface DragAndDropProps {
  petId?: number;
  sectionId?: number;
  imageUrl?: string | null;
  name: string;
  size: number;
  children: React.ReactElement<AnimalImageProps>;
  longPressMs?: number;
}

export default function DragAndDrop({
  petId,
  sectionId,
  imageUrl,
  name,
  size,
  children,
  longPressMs = 500,
}: DragAndDropProps) {
  const { isTouch, isDesktop } = useUIConfig();
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: DRAGANDDROP.item_type as string,
      item: (): DragItem => {
        const payload = {
          petId: petId!,
          fromSectionId: sectionId!,
          imageUrl: imageUrl ?? null,
          name,
          size,
        };
        return payload;
      },
      canDrag: sectionId != null && petId != null && imageUrl !== undefined,
      collect: (m) => ({ isDragging: m.isDragging() }),
    }),
    [petId, sectionId, imageUrl, name, size],
  );

  const [longPressActive, setLongPressActive] = useState(false);
  const [isFingerDown, setIsFingerDown] = useState(false);
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const longPressMs_Mini = longPressMs - 150;
  const handleTouchStart = () => {
    setIsFingerDown(true);
    pressTimerRef.current = setTimeout(() => {
      if (isFingerDown) setLongPressActive(true);
    }, longPressMs_Mini);
  };

  const handleTouchEnd = () => {
    setIsFingerDown(false);
    setLongPressActive(false);
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  useEffect(() => {
    if (!isDragging) {
      setLongPressActive(false);
      if (pressTimerRef.current) {
        clearTimeout(pressTimerRef.current);
      }
    }
  }, [isDragging]);

  const setDragRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (node) drag(node);
    },
    [drag],
  );

  const isDraggingForTouch = isTouch && isDragging;
  const highlightActive = longPressActive && isFingerDown;
  const GHOST_MULTIPLIER = 1.5;

  let content = children;
  if (React.isValidElement<AnimalImageProps>(children)) {
    const prevHighlight = children.props.highlight ?? false;
    content = React.cloneElement<AnimalImageProps>(children, {
      highlight: prevHighlight || highlightActive,
    });
  }

  return (
    <div
      ref={setDragRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      draggable={false}
      style={{
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
        WebkitTapHighlightColor: "transparent",
        opacity: isDragging ? 0.5 : 1,
        //touchAction: isTouch ? "none" : "manipulation",
        //touchAction: isDragging ? "none" : "manipulation",
        touchAction: isTouch ? "pan-y" : "manipulation",
        transform: highlightActive ? `scale(${GHOST_MULTIPLIER})` : "none",
        cursor: "grab",
        transition: isDraggingForTouch
          ? "transform 40ms ease-out"
          : "transform 120ms ease",

        transformOrigin: "center center",
        willChange: "transform",
        position: isDraggingForTouch ? "relative" : "static",
        filter: isTouch && isDragging ? "brightness(1.15)" : "none",

        //pointerEvents: isTouch ? "none" : "auto",
      }}
    >
      {isTouch ? (
        <AnimalImage
          name={name}
          alt={name}
          imageUrl={imageUrl ?? null}
          size={size}
          isDesktop={isDesktop}
          highlight={highlightActive}
        />
      ) : (
        content
      )}
    </div>
  );
}
