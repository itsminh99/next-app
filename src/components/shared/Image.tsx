import { memo } from "react";
import NextImage, { ImageProps as NextImageProps } from "next/image";
import { Box, BoxProps } from "@mui/material";

export type ImageProps = NextImageProps & {
  aspectRatio?: number;
  size?: number | string | { [key: string]: number | string };
  containerProps?: BoxProps;
  sizeBy?: "width" | "height";
};

const Image = (props: ImageProps) => {
  const {
    aspectRatio,
    size,
    containerProps = {},
    sizeBy = "width",
    ...rest
  } = props;
  const { sx: sxContainer, ...restContainerProps } = containerProps;

  if (aspectRatio) {
    return (
      <Box
        sx={{
          position: "relative",
          aspectRatio,
          ...getProps(sizeBy, size),
          ...sxContainer,
        }}
        {...restContainerProps}
      >
        <NextImage fill {...rest} />
      </Box>
    );
  }

  return <NextImage {...rest} />;
};

export default memo(Image);

const getProps = (sizeBy: ImageProps["sizeBy"], size: ImageProps["size"]) => {
  if (sizeBy === "width") {
    return {
      maxWidth: size,
      width: "100%",
    };
  }
  return {
    maxHeight: size,
    height: "100%",
  };
};
