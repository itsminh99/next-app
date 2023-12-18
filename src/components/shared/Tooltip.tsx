"use client";

import { memo } from "react";
import {
  Tooltip as MuiTooltip,
  TooltipProps,
  Zoom,
  tooltipClasses,
} from "@mui/material";
import { typography } from "public/material";

const Tooltip = (props: TooltipProps) => {
  const { children, sx, ...rest } = props;

  return (
    <MuiTooltip
      placement="top"
      arrow
      TransitionComponent={Zoom}
      PopperProps={{
        sx: {
          [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: "background.paper",
            ...typography.caption,
            color: "common.white",
            px: 1.5,
            py: 0.75,
            borderRadius: 1,
            ...sx,
          },
          [`& .${tooltipClasses.arrow}`]: {
            color: "background.paper",
          },
        },
      }}
      enterTouchDelay={0}
      {...rest}
    >
      {children}
    </MuiTooltip>
  );
};

export default memo(Tooltip);
