import * as React from "react";
import { Box, SxProps, Theme, useTheme } from "@mui/material";
import { useDrop } from "react-dnd";
import { DRAGANDDROP } from "@/constants/texts/Texts";
import { useUIConfig } from "@/util/useUIConfig";

type DragItem = {
  petId: number;
  fromSectionId: number;
};

interface DropZoneProps {
  toSectionId: number;
  onDropPet: (payload: {
    petId: number;
    fromSectionId: number;
    toSectionId: number;
  }) => void;
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  isActiveRoom: boolean;
  edgeZone?: "left" | "right" | "none";
}

export default function DropZone({
  toSectionId,
  onDropPet,
  sx,
  children,
  isActiveRoom,
  edgeZone = "none",
}: DropZoneProps) {
  const theme = useTheme();
  const { isMobile } = useUIConfig();

  const [{ isOver, canDrop }, drop] = useDrop<
    DragItem,
    void,
    { isOver: boolean; canDrop: boolean }
  >(
    () => ({
      accept: DRAGANDDROP.item_type as string,

      canDrop: () => (isMobile ? isActiveRoom && edgeZone === "none" : true),

      drop: (item, monitor) => {
        if (!monitor.isOver({ shallow: true })) return;
        if (isMobile && edgeZone !== "none") return;
        onDropPet?.({
          petId: item.petId,
          fromSectionId: item.fromSectionId,
          toSectionId,
        });
      },

      collect: (monitor) => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop(),
      }),
    }),
    [toSectionId, isActiveRoom, isMobile, edgeZone],
  );

  const pointerBlocked = isMobile && edgeZone !== "none";
  const showHighlight = isOver && canDrop && !pointerBlocked;

  const setDropRef: React.RefCallback<HTMLDivElement> = (node) => {
    if (node) drop(node);
  };

  return (
    <Box
      ref={setDropRef}
      sx={{
        border: showHighlight
          ? `2px dashed ${theme.palette.primary.main}`
          : "none",
        backgroundColor: showHighlight ? theme.palette.badge.R : "transparent",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: isOver ? 24 : 0,
        borderBottomRightRadius: isOver ? 24 : 0,
        height: "100%",
        pointerEvents: pointerBlocked ? "none" : "auto",
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}
