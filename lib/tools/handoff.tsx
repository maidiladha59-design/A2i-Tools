"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { useRouter } from "@/i18n/navigation";

type PendingLaunch = {
  tool: string;
  files: File[];
};

type HandoffContextValue = {
  launch: (tool: string, files: File[]) => void;
  take: (tool: string) => File[] | null;
};

const HandoffContext = createContext<HandoffContextValue | null>(null);

export function useHandoff(): HandoffContextValue {
  const context = useContext(HandoffContext);
  if (!context) throw new Error("useHandoff must be used inside ToolHandoffProvider");
  return context;
}

export function ToolHandoffProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pending = useRef<PendingLaunch | null>(null);

  const launch = useCallback(
    (tool: string, files: File[]) => {
      pending.current = { tool, files };
      router.push(tool);
    },
    [router]
  );

  const take = useCallback((tool: string) => {
    if (pending.current?.tool !== tool) return null;
    const files = pending.current.files;
    pending.current = null;
    return files;
  }, []);

  const value = useMemo(() => ({ launch, take }), [launch, take]);

  return (
    <HandoffContext.Provider value={value}>{children}</HandoffContext.Provider>
  );
}
