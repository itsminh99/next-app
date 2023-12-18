"use client";

import { ForwardedRef, forwardRef, memo, useMemo } from "react";
import { Breakpoint, Typography, TypographyProps } from "@mui/material";
import Tooltip from "./Tooltip";
import { Variant } from "@mui/material/styles/createTypography";
import useBreakpoint from "hooks/useBreakpoint";
import { breakpoints } from "public/material";

type CoreTextProps = Omit<TypographyProps, "variant"> & {
  // variant?: Variant | { [key in Breakpoint]: Variant };
  variant?: Variant | { [key: string]: Variant } | "inherit";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: any;
};

export type TextProps = CoreTextProps & {
  tooltip?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Text = forwardRef((props: TextProps, ref: ForwardedRef<any>) => {
  const { tooltip, ...rest } = props;

  if (tooltip) {
    return (
      <Tooltip title={tooltip}>
        <CoreText ref={ref} {...rest} />
      </Tooltip>
    );
  }

  return <CoreText ref={ref} {...rest} />;
});

Text.displayName = "Text";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CoreText = forwardRef((props: CoreTextProps, ref: ForwardedRef<any>) => {
  const { variant: variantProps = "body1", children, ...rest } = props;
  const { breakpoint } = useBreakpoint();

  const variant = useMemo(() => {
    if (typeof variantProps === "object") {
      if (breakpoint) {
        return getActiveBreakpoint(breakpoint, variantProps) ?? "body1";
      }
      return;
    }
    return variantProps ?? "body1";
  }, [variantProps, breakpoint]) as Variant | "inherit";

  if (!breakpoint) return null;

  return (
    <Typography ref={ref} variant={variant} color="text.primary" {...rest}>
      {children}
    </Typography>
  );
});

CoreText.displayName = "CoreText";

export default memo(Text);

/**
 * DEFAULT: ["xs", "sm", "md", "lg", "xl"]
 * SORTED_BY_WIDTH: ["xl", "lg", "md", "sm", "xs"]
 */

const breakpointKeysPriority = Object.entries(breakpoints.values)
  .map(([key, value]) => ({ key, value }))
  .sort((a, b) => b.value - a.value)
  .map((item) => item.key);

const getActiveBreakpoint = (
  currentRatio: Breakpoint,
  options: { [key: string]: string },
  indexPriority?: number,
) => {
  const exactRatio = options[currentRatio] as string | undefined;

  if (exactRatio) return exactRatio;

  if (!indexPriority) {
    // Index closest smaller of current ratio.
    indexPriority =
      breakpointKeysPriority.findIndex((key) => key === currentRatio) + 1;
  }

  // Index out of range
  if (indexPriority > breakpointKeysPriority.length - 1) return;

  const key = breakpointKeysPriority[indexPriority];

  return (
    options[key] ??
    getActiveBreakpoint(currentRatio, options, indexPriority + 1)
  );
};
