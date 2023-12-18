"use client";

import {
  createContext,
  memo,
  useCallback,
  useEffect,
  useState,
  ReactNode,
} from "react";

type HashProviderProps = {
  children: ReactNode;
};

export const HashContext = createContext<string>("");

const HashProvider = ({ children }: HashProviderProps) => {
  const [hash, setHash] = useState<string>("");

  const onHashStored = useCallback(() => {
    if (typeof window === "undefined") return;
    setHash(window.location.hash ? window.location.hash.slice(1) : "");
  }, []);

  useEffect(() => {
    onHashStored();

    let interval: NodeJS.Timeout | null = null;
    if (interval) clearInterval(interval);
    interval = setInterval(() => {
      onHashStored();
    }, 100);
  }, [onHashStored]);

  return <HashContext.Provider value={hash}>{children}</HashContext.Provider>;
};

export default memo(HashProvider);
