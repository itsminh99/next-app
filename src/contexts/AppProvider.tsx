"use client";

import { memo, useCallback, useEffect } from "react";
import ThemeProvider from "./ThemeProvider";
import HashProvider from "./HashProvider";
import useEventListener from "hooks/useEventListener";

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = (props: AppProviderProps) => {
  const { children } = props;

  const onSetViewHeight = useCallback(() => {
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  useEventListener("resize", onSetViewHeight);

  useEffect(() => {
    onSetViewHeight();
  }, [onSetViewHeight]);

  return (
    <ThemeProvider options={{ key: "mui" }}>
      <HashProvider>{children}</HashProvider>
    </ThemeProvider>
  );
};

export default memo(AppProvider);
