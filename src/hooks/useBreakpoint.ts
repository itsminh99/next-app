"use client";

import { useCallback, useEffect, useState } from "react";
import useEventListener from "./useEventListener";
import { Breakpoint, useTheme } from "@mui/material";

type SmallerBreakpoint = { [x: string]: boolean };

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint | undefined>();
  const { breakpoints } = useTheme();

  const [dataSmaller, setDataSmaller] = useState<SmallerBreakpoint>({});

  const onGetBreakpoint = useCallback(() => {
    const currentBreakpoint = getCurrentBreakpoint(breakpoints.values) || "xs";
    const _dataSmaller = breakpoints.keys.reduce(
      (out: SmallerBreakpoint, key) => {
        out[`is${key.slice(0, 1).toUpperCase()}${key.slice(1)}Smaller`] =
          window?.matchMedia(breakpoints.down(key).replace(/^@media( ?)/m, ""))
            .matches;
        return out;
      },
      {},
    );
    setDataSmaller(_dataSmaller);
    setBreakpoint(currentBreakpoint);
  }, [breakpoints]);

  useEventListener("resize", onGetBreakpoint);

  useEffect(() => {
    onGetBreakpoint();
  }, [onGetBreakpoint]);

  return {
    breakpoint,
    ...dataSmaller,
  };
};

export default useBreakpoint;

const getCurrentBreakpoint = (breakpoints: { [key: string]: number }) => {
  if (typeof window === "undefined") return;
  let currentBreakpoint: Breakpoint | undefined;
  let biggestBreakpointValue = 0;
  for (const breakpoint of Object.keys(breakpoints)) {
    const breakpointValue = breakpoints[breakpoint];

    if (
      breakpointValue > biggestBreakpointValue &&
      window.innerWidth >= breakpointValue
    ) {
      biggestBreakpointValue = breakpointValue;
      currentBreakpoint = breakpoint as Breakpoint;
    }
  }

  return currentBreakpoint;
};
