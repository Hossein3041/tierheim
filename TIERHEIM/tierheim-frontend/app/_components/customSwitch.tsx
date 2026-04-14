import React from "react";
import { styled } from "@mui/material/styles";
import Switch, { SwitchProps } from "@mui/material/Switch";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export type CustomSwitchProps = Omit<
  FormControlLabelProps,
  "control" | "label"
> & {
  label: string;
  labelColor?: string;
  trackColor?: string;
  checkedTrackColor?: string;
  thumbColor?: string;
  checkedThumbColor?: string;
  sx?: SxProps<Theme>;
  checked?: boolean;
  onChange?: SwitchProps["onChange"];
  isMobileBoolean?: boolean;
};

type StyledSwitchExtraProps = {
  trackColor?: string;
  checkedTrackColor?: string;
  thumbColor?: string;
  checkedThumbColor?: string;
  isMobileBoolean?: boolean;
};

const DURATION = 300;

const StyledSwitch = styled(Switch, {
  shouldForwardProp: (prop) =>
    ![
      "trackColor",
      "checkedTrackColor",
      "thumbColor",
      "checkedThumbColor",
      "isMobileBoolean",
    ].includes(String(prop)),
})<StyledSwitchExtraProps>((props) => {
  const {
    theme,
    trackColor,
    checkedTrackColor,
    thumbColor,
    checkedThumbColor,
  } = props as typeof props & { theme: Theme };

  const isChecked = Boolean((props as any).ownerState?.checked);

  return {
    width: 42,
    height: 26,
    padding: 0,

    "& .MuiSwitch-root": {
      transform: `scale(0.8)`,
    },

    "& .MuiSwitch-switchBase": {
      padding: 1,
      transform: isChecked ? "translateX(16px)" : "translateX(0)",
      transition: `transform ${DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,

      "& + .MuiSwitch-track": {
        backgroundColor: isChecked ? checkedTrackColor : trackColor,
        opacity: 1,
        transition: `background-color ${DURATION}ms ease`,
      },

      "& .MuiSwitch-thumb": {
        backgroundColor: isChecked ? checkedThumbColor : thumbColor,
        transition: `background-color ${DURATION}ms ease, filter 0.3s ease`,
      },

      // Hover-Effekte abhängig vom Zustand
      "&:hover + .MuiSwitch-track": {
        filter: "brightness(1.3)",
        transition: "filter 0.3s ease",
      },
      "&:hover .MuiSwitch-thumb": {
        filter: isChecked ? "brightness(1.0)" : "brightness(1.1)",
        transition: "filter 0.3s ease",
      },
    },

    "& .MuiSwitch-thumb": {
      width: 24,
      height: 24,
    },

    "& .MuiSwitch-track": {
      borderRadius: 13,
      backgroundColor: isChecked ? checkedTrackColor : trackColor,
      opacity: 1,
      border: `1px solid ${trackColor}`,
      transition: `background-color ${DURATION}ms ease, filter 0.3s ease`,
    },
  };
});

export const CustomSwitch: React.FC<CustomSwitchProps> = ({
  label,
  labelColor,
  trackColor,
  checkedTrackColor,
  thumbColor,
  checkedThumbColor,
  checked = false,
  onChange,
  disabled,
  sx,
  isMobileBoolean = false,
  ...rest
}) => {
  const theme = useTheme();
  const pm = theme.palette.petmodal;

  const switchTrackColor = trackColor ?? pm.dialogSwitchTrackColor;
  const switchCheckedTrackColor =
    checkedTrackColor ?? pm.dialogSwitchCheckedTrackColorBlue;
  const switchThumbColor = thumbColor ?? pm.dialogSwitchThumbColor;
  const switchCheckedThumbColor =
    checkedThumbColor ?? pm.dialogSwitchCheckedThumbColor;
  const switchLabelColor = labelColor ?? pm.dialogSwitchLabelColor;

  return (
    <FormControlLabel
      {...rest}
      control={
        <StyledSwitch
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          trackColor={switchTrackColor}
          checkedTrackColor={switchCheckedTrackColor}
          thumbColor={switchThumbColor}
          checkedThumbColor={switchCheckedThumbColor}
        />
      }
      label={
        <Typography
          component="span"
          sx={{
            color: switchLabelColor || "inherit",
            fontSize: "0.6rem",
            ...(isMobileBoolean
              ? { mt: 0.5, textAlign: "center" }
              : { ml: 1, textAlign: "left" }),
          }}
        >
          {label}
        </Typography>
      }
      labelPlacement={isMobileBoolean ? "bottom" : "end"}
      sx={{
        display: "flex",
        flexDirection: isMobileBoolean ? "column" : "row",
        alignItems: "center",
        m: 0,
        ...sx,
      }}
    />
  );
};

export default CustomSwitch;
