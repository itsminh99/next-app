"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEventListener from "./useEventListener";

export interface Size {
  width?: number;
  height?: number;
}

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<Size>({});

  const isVertical = useMemo(() => {
    if (!windowSize?.width || !windowSize?.height) return;
    return windowSize.width < windowSize.height;
  }, [windowSize?.height, windowSize?.width]);

  const onWindowSize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEventListener("resize", onWindowSize);

  useEffect(() => {
    onWindowSize();
  }, [onWindowSize]);

  return { ...windowSize, isVertical };
};

export default useWindowSize;
