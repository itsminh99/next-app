import { memo } from "react";
import { InputBase, InputBaseProps } from "@mui/material";
import { typography } from "public/material";

const Input = (props: InputBaseProps) => {
  const { sx: sxInput, ...rest } = props;

  return <InputBase fullWidth sx={{ ...sx.input, ...sxInput }} {...rest} />;
};

export default memo(Input);

const sx = {
  input: {
    "& input": {
      borderRadius: 1,

      backgroundColor: "background.paper",
      px: 1.5,
      py: 1.125,
      ...typography.body2,
      color: "common.white",
      "&:placeholder": {
        color: "grey.A400",
      },
    },
  },
};
