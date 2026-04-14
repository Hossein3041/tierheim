import React, { createContext, ReactNode, useContext, useState } from "react";
import { DRAGANDDROP } from "@/constants/texts/Texts";

interface DragItem {
  imageUrl?: string | null;
  name?: string;
  size?: number;
  isLongPress?: boolean;
  touchPosition?: { x: number; y: number } | null;
}

interface DragContextType {
  dragItem: DragItem | null;
  setDragItem: (item: DragItem | null) => void;
}

const DragContext = createContext<DragContextType | undefined>(undefined);

export const DragProvider = ({ children }: { children: ReactNode }) => {
  const [dragItem, setDragItem] = useState<DragItem | null>(null);

  return (
    <DragContext.Provider value={{ dragItem, setDragItem }}>
      {children}
    </DragContext.Provider>
  );
};

export const useDragContext = () => {
  const context = useContext(DragContext);
  if (!context) {
    throw new Error(DRAGANDDROP.dragContextError);
  }
  return context;
};
