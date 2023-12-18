import { ForwardedRef, forwardRef, memo, useMemo } from "react";
import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
  Palette,
  TooltipProps,
} from "@mui/material";
import Tooltip from "./Tooltip";

type CoreIconButtonProps = MuiIconButtonProps & {
  color?: Palette | string | MuiIconButtonProps["color"];
  noPadding?: boolean;
};

export type IconButtonProps = CoreIconButtonProps & {
  tooltip?: TooltipProps["title"];
  tooltipProps?: Partial<TooltipProps>;
};

const IconButton = (props: IconButtonProps) => {
  const { tooltip, tooltipProps, ...rest } = props;

  if (tooltip) {
    return (
      <Tooltip title={tooltip} {...tooltipProps}>
        <span>
          <CoreIconButton {...rest} />
        </span>
      </Tooltip>
    );
  }

  return <CoreIconButton {...rest} />;
};

const CoreIconButton = forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: CoreIconButtonProps, ref: ForwardedRef<any>) => {
    const { sx, noPadding, color, ...rest } = props;

    const defaultPadding = useMemo(
      () => (noPadding ? { p: 0 } : {}),
      [noPadding],
    );

    return (
      <MuiIconButton
        sx={{
          width: "fit-content",
          ...defaultPadding,
          ...sx,
        }}
        ref={ref}
        color={color as MuiIconButtonProps["color"]}
        aria-label="icon_button"
        {...rest}
      />
    );
  },
);

CoreIconButton.displayName = "CoreIconButton";

export default memo(IconButton);
