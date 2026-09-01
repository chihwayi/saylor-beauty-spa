"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { captureUtmParams } from "@/lib/analytics";

const UtmContext = createContext<string | null>(null);

export function UtmProvider({ children }: { children: React.ReactNode }) {
  const [utm, setUtm] = useState<string | null>(null);

  useEffect(() => {
    // Deferred to a client-only effect on purpose: UTM params come from window.location,
    // which isn't available during SSR, so this can't be computed during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUtm(captureUtmParams());
  }, []);

  return <UtmContext.Provider value={utm}>{children}</UtmContext.Provider>;
}

export function useUtm() {
  return useContext(UtmContext);
}
