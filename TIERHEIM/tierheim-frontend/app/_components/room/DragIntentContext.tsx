import React, { createContext, useContext, useRef, useState } from "react";

type DragIntent = "undecided" | "vert" | "horiz";

type Ctx = {
  intent: DragIntent;
  setIntent: (i: DragIntent) => void;
  startPtRef: React.MutableRefObject<{ x: number; y: number } | null>;
  gateUntilRef: React.MutableRefObject<number>;
  reset: () => void;
};

const DragIntentContext = createContext<Ctx | null>(null);

export function DragIntentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [intent, setIntent] = useState<DragIntent>("undecided");
  const startPtRef = useRef<{ x: number; y: number } | null>(null);
  const gateUntilRef = useRef(0);

  const reset = () => {
    setIntent("undecided");
    startPtRef.current = null;
    gateUntilRef.current = 0;
  };

  return (
    <DragIntentContext.Provider
      value={{ intent, setIntent, startPtRef, gateUntilRef, reset }}
    >
      {children}
    </DragIntentContext.Provider>
  );
}

export const useDragIntent = () => {
  const v = useContext(DragIntentContext);
  if (!v) throw new Error("DragIntentContext missing");
  return v;
};
