import { forwardRef } from "react";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import MuiLink, { LinkProps as MuiLinkProps } from "@mui/material/Link";
import { Tooltip } from "./shared";
import { TooltipProps } from "@mui/material";

type CoreLinkProps = Omit<MuiLinkProps, "href"> & {
  href: NextLinkProps["href"];
};

export type LinkProps = CoreLinkProps & {
  tooltip?: TooltipProps["title"];
  placement?: TooltipProps["placement"];
};

const CoreLink = forwardRef(
  (props: CoreLinkProps, ref: MuiLinkProps["ref"]) => {
    return (
      <MuiLink component={NextLink} ref={ref} underline="none" {...props} />
    );
  },
);

CoreLink.displayName = "CoreLink";

const Link = forwardRef((props: LinkProps, ref: MuiLinkProps["ref"]) => {
  const { tooltip, placement, ...rest } = props;
  if (tooltip) {
    return (
      <Tooltip title={tooltip} placement={placement}>
        <CoreLink ref={ref} {...rest} />
      </Tooltip>
    );
  }
  return <CoreLink ref={ref} {...rest} />;
});

Link.displayName = "Link";

export default Link;
