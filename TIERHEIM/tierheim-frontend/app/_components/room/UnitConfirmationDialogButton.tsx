import React from "react";
import { CustomButton } from "@/components/customButton";
import { useTheme } from "@mui/material";
import { DRAGANDDROP } from "@/constants/texts/Texts";
import { useUIConfig } from "@/util/useUIConfig";

interface UnitConfirmationDialogButtonProps {
  isFullRoom: boolean;
  pendingMove: {
    petId: number;
    fromSectionId: number;
    toSectionId: number;
  } | null;
  selectedUnitId: string | null;
  setSelectedUnitId: (id: string | null) => void;
  onClose: () => void;
  onOpenRoomModal?: () => void;
  handleConfirm: () => void;
}

export function UnitConfirmationDialogButton({
  isFullRoom,
  pendingMove,
  selectedUnitId,
  setSelectedUnitId,
  onClose,
  onOpenRoomModal,
  handleConfirm,
}: UnitConfirmationDialogButtonProps) {
  const { isDesktop, isTablet, buttonFontSize } = useUIConfig();
  const theme = useTheme();

  if (isFullRoom || !pendingMove) {
    return (
      <>
        <CustomButton
          onClick={() => {
            setSelectedUnitId(null);
            onClose();
          }}
          width={isDesktop ? "40%" : "45%"}
          backgroundColor={theme.palette.inputfields.inputTitleFieldColor}
          color={theme.palette.inputfields.inputTitleColor}
          booleanBoxShadow={true}
          sx={{ fontSize: buttonFontSize }}
        >
          {DRAGANDDROP.closeText}
        </CustomButton>
        <CustomButton
          onClick={() => {
            onClose();
            onOpenRoomModal?.();
          }}
          width={isDesktop ? "40%" : "45%"}
          backgroundColor={theme.palette.petmodal.dialogSwitchLabelColor}
          color={theme.palette.login.loginCardOneColor}
          booleanBoxShadow={true}
          sx={{ fontSize: buttonFontSize }}
        >
          {DRAGANDDROP.roomDetailsText}
        </CustomButton>
      </>
    );
  }

  return (
    <>
      <CustomButton
        onClick={() => {
          setSelectedUnitId(null);
          onClose();
        }}
        width={isDesktop ? "40%" : "45%"}
        backgroundColor={theme.palette.inputfields.inputTitleFieldColor}
        color={theme.palette.inputfields.inputTitleColor}
        booleanBoxShadow={true}
        sx={{ fontSize: buttonFontSize }}
      >
        {DRAGANDDROP.cancelText}
      </CustomButton>
      <CustomButton
        onClick={handleConfirm}
        width={isDesktop ? "40%" : "45%"}
        backgroundColor={theme.palette.petmodal.dialogSwitchLabelColor}
        color={theme.palette.login.loginCardOneColor}
        booleanBoxShadow={true}
        disabled={!selectedUnitId || isFullRoom}
        sx={{ fontSize: buttonFontSize }}
      >
        {DRAGANDDROP.saveText}
      </CustomButton>
    </>
  );
}
