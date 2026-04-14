import { Button, ButtonProps, LinearProgress } from "@mui/material";
import React, { ReactNode } from "react";

type TProps = ButtonProps & {
  isLoading: boolean;
  children?: ReactNode;
};

export default function LoadingButton({
  isLoading,
  children,
  ...muiButtonProps
}: TProps) {
  if (isLoading) {
    return (
      <Button {...muiButtonProps} disabled={true}>
        <LinearProgress color={"inherit"} sx={{ width: "50%" }} />
      </Button>
    );
  }
  return (
    <Button {...muiButtonProps} disabled={muiButtonProps.disabled}>
      {children}
    </Button>
  );
}
