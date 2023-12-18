"use client";

import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { useServerInsertedHTML } from "next/navigation";
import { useState } from "react";
import createCache from "@emotion/cache";
import { typography, breakpoints, palette } from "public/material";

export interface Options {
  key: string;
  prepend?: boolean;
}

type ThemeProviderProps = {
  children: React.ReactNode;
  options: Options;
};

const initState = (options: Options) => {
  const cache = createCache(options);
  cache.compat = true;
  const prevInsert = cache.insert;
  let inserted: string[] = [];
  cache.insert = (...args) => {
    const serialized = args[1];
    if (cache.inserted[serialized.name] === undefined) {
      inserted.push(serialized.name);
    }
    return prevInsert(...args);
  };
  const flush = () => {
    const prevInserted = inserted;
    inserted = [];
    return prevInserted;
  };
  return { cache, flush };
};

const theme = createTheme({
  palette,
  typography,
  breakpoints,
});

const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, options } = props;

  const [{ cache, flush }] = useState(initState(options));

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: options.prepend ? `@layer emotion {${styles}}` : styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
};

export default ThemeProvider;
