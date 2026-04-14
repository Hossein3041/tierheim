"use client";

import { createTheme } from "@mui/material";
import { deDE } from "@mui/x-data-grid/locales";
import { Ubuntu } from "next/font/google";
import "@mui/material/styles";
import { white } from "next/dist/lib/picocolors";
import { Visibility } from "@mui/icons-material";
import { palette } from "@mui/system";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["500"],
});

declare module "@mui/material/styles" {
  interface Palette {
    home: {
      icon: string;
      background: string;
      hover: string;
      onClick: string;
    };
    badge: {
      P: string;
      PBackground: string;
      PBorder: string;
      PText: string;
      R: string;
      RBackground: string;
      RBorder: string;
      RText: string;
      T: string;
      TBackground: string;
      TBorder: string;
      TText: string;
      alertBackground: string;
      alertBorder: string;
      alertText: string;
    };
    animalFile: {
      alert: string;
      tabBackground: string;
      bg2: string;
      tabHover: string;
      onClick: string;
      mobileTap: string;
      chipBg: string;
      tabActive: string;
      tabText: string;
      tabActiveText: string;
      fill: string;
      animalName: string;
      secondaryTexts: string;
      tabDisabledBackground: string;
      tabDisabledText: string;
      toolTipBg: string;
    };
    navigation: {
      tabActive: string;
      tabBackground: string;
      bg2: string;
      tabHover: string;
      tabText: string;
      tabActiveText: string;
      hover2: string;
      border: string;
      boxShadow: string;
    };
    searchbar: {
      background: string;
      searchicon: string;
      border: string;
      activeBg: string;
      hover: string;
      focusBorder: string;
    };
    login: {
      loginGreetingColor: string;
      loginCardOneColor: string;
      loginUsernameColor: string;
      loginPasswordColor: string;
      loginUsernameFieldColor: string;
      loginUsernameFieldHoverColor: string;
      loginPasswordFieldColor: string;
      loginPasswordFieldHoverColor: string;
      loginButtonBackgroundColor: string;
      loginButtonHoverColor: string;
      loginCard2BackgroundColor: string;
      loginLinkColor: string;
      loginLinkHoverColor: string;
      loginBorderColor: string;
      loginBackgroundColor: string;
      loginBackgroundFooterInformationColor: string;
      loginBrowserTextColor: string;
    };
    animalImage: {
      animalImageBackgroundColor: string;
      animalImagePetIconColor: string;
      animalImageColor: string;
      animalImageClickColor: string;
      overlayBackground: string;
      animalImageHoverColor: string;
    };
    petmodal: {
      dialogTitleColor: string;
      dialogXColor: string;
      dialogXHoverColor: string;
      dialogVerticalDivLineColor: string;
      dialogSwitchTrackColor: string;
      dialogSwitchCheckedTrackColorBlue: string;
      dialogSwitchCheckedTrackColorGreen: string;
      dialogSwitchLabelColor: string;
      dialogFieldInputColor: string;
      dialogSwitchThumbColor: string;
      dialogSwitchCheckedThumbColor: string;
      roomPetDetailsBackgroundWhite: string;
      roomPetDetailsBackgroundGrey: string;
    };
    appointmentcard: {
      labelOrNotesColro: string;
      petNameColor: string;
      petRaceColor: string;
      doneIconColor: string;
      doneIconBackgroundColor: string;
      appointmentCardHeaderCountBackgroundColor: string;
      appointmentCardHeaderShadow: string;
      appointmentCheckedInfo: string;
      appointmentOpenInfo: string;
    };
    archiveComponent: {
      archiveContentBackgroundColor: string;
      archiveActionBackgroundColor: string;
    };
  }

  interface Palette {
    inputfields: {
      inputTitleColor: string;
      inputTitleFieldColor: string;
      inputTitleFieldHoverColor: string;
    };
  }

  interface PaletteOptions {
    home?: Partial<Palette["home"]>;
    badge?: Partial<Palette["badge"]>;
    animalFile?: Partial<Palette["animalFile"]>;
    navigation?: Partial<Palette["navigation"]>;
    searchbar?: Partial<Palette["searchbar"]>;
    login?: Partial<Palette["login"]>;
    inputfields?: {
      inputTitleColor?: string;
      inputTitleFieldColor?: string;
      inputTitleFieldHoverColor?: string;
    };
    animalImage?: {
      animalImageBackgroundColor: string;
      animalImagePetIconColor: string;
      animalImageColor: string;
      animalImageClickColor: string;
      overlayBackground: string;
      animalImageHoverColor: string;
    };
    petmodal?: Partial<Palette["petmodal"]>;
    appointmentcard: {
      labelOrNotesColro: string;
      petNameColor: string;
      petRaceColor: string;
      doneIconColor: string;
      doneIconBackgroundColor: string;
      appointmentCardHeaderCountBackgroundColor: string;
      appointmentCardHeaderShadow: string;
      appointmentCheckedInfo: string;
      appointmentOpenInfo: string;
    };
    archiveComponent: {
      archiveContentBackgroundColor: string;
      archiveActionBackgroundColor: string;
    };
  }
}

const AppTheme = createTheme(
  {
    palette: {
      mode: "light",
      primary: {
        main: process.env.NEXT_PUBLIC_PRIMARY_COLOR || "#0A6E4B",
        contrastText: process.env.NEXT_PUBLIC_PRIMARY_TEXT_COLOR || "#ffffff",
      },
      secondary: {
        main: process.env.NEXT_PUBLIC_SECONDARY_COLOR || "#77cd00",
        contrastText: process.env.NEXT_PUBLIC_SECONDARY_TEXT_COLOR || "#ffffff",
      },
      home: {
        icon: "#B9BCC3",
        background: "#FAFAFA",
        hover: "#D4D6DA",
        onClick: "#6b7280",
      },
      badge: {
        P: "#B29DD9",
        PBackground: "#D7B6E2",
        PBorder: "#CDA4DB",
        PText: "#754785",
        R: "#C5D6F4",
        RBackground: "#B7C4E1",
        RBorder: "#A5B5D9",
        RText: "#475685",
        T: "#F9E79F",
        TBackground: "#E1D3B7",
        TBorder: "#D2BD93",
        TText: "#855247",
        alertBackground: "#A45166",
        alertBorder: "#B5697C",
        alertText: "#F8EEF0",
      },
      animalFile: {
        alert: "#f00",
        tabBackground: "#FAFAFA",
        bg2: "#F1F1F3",
        tabHover: "#D4D6DA",
        onClick: "#B9BCC3",
        mobileTap: "#ccc",
        chipBg: "#eee",
        tabActive: "#55669E",
        tabText: "#55669E",
        tabActiveText: "#ffffff",
        fill: "#E3E3E7",
        animalName: "#575A62",
        secondaryTexts: "#858893",
        tabDisabledBackground: "#E0E0E0",
        tabDisabledText: "#888888",
        toolTipBg: "#EEF1F8",
      },
      navigation: {
        tabActive: "#55669E",
        tabBackground: "#F1F1F3",
        bg2: "#ADB0B8",
        tabHover: "#D4D6DA",
        tabText: "#6E717A",
        tabActiveText: "#ffffff",
        hover2: "#6b7280",
        border: "#E3E3E7",
        boxShadow: "#D0D0D5",
      },
      searchbar: {
        background: "#F1F1F3",
        searchicon: "#A0A2AB",
        border: "#e0e0e0",
        activeBg: "#F1F1F3",
        hover: "#E3E3E7",
        focusBorder: "#7388BF",
      },
      login: {
        loginGreetingColor: "#55669E",
        loginCardOneColor: "#FAFAFA",
        loginButtonBackgroundColor: "#6DAB69",
        loginButtonHoverColor: "#7BC17A",
        loginCard2BackgroundColor: "#F1F1F3",
        loginLinkColor: "#c4c4c4",
        loginLinkHoverColor: "#888888",
        loginBackgroundColor: "#f5f5f5",
        loginBorderColor: "grey",
        loginBackgroundFooterInformationColor: "#b0b0b0",
        loginBrowserTextColor: "black",
      },
      inputfields: {
        inputTitleColor: "#b0b0b0",
        inputTitleFieldColor: "#F1F1F3",
        inputTitleFieldHoverColor: "#E0E0E0",
      },
      petmodal: {
        dialogTitleColor: "white",
        dialogXColor: "rgba(255,255,255,0.7)",
        dialogXHoverColor: "rgba(255,255,255,1)",
        dialogVerticalDivLineColor: "#E3E3E7",
        dialogSwitchTrackColor: "#ddd",
        dialogSwitchCheckedTrackColorBlue: "#55669E",
        dialogSwitchCheckedTrackColorGreen: "#72B16D",
        dialogSwitchLabelColor: "#55669E",
        dialogFieldInputColor: "#575A62",
        dialogSwitchThumbColor: "#B9BCC3",
        dialogSwitchCheckedThumbColor: "#F8FCF8",
        roomPetDetailsBackgroundWhite: "#F8F9FC",
        roomPetDetailsBackgroundGrey: "#F1F1F3",
      },
      animalImage: {
        animalImageBackgroundColor: "#F1F1F3",
        animalImagePetIconColor: "#A0A2AB",
        animalImageColor: "#666",
        animalImageClickColor: "#333333",
        overlayBackground: "rgba(255,255,255,0.4)",
        animalImageHoverColor: "rgba(255,255,255,0.4)",
      },
      appointmentcard: {
        labelOrNotesColro: "#575A62",
        petNameColor: "#575A62",
        petRaceColor: "#858893",
        doneIconColor: "#F8FCF8",
        doneIconBackgroundColor: "#72B16D",
        appointmentCardHeaderCountBackgroundColor: "#CDD6EA",
        appointmentCardHeaderShadow: "5px 0 5px 0 rgba(0,0,0,0.2)",
        appointmentCheckedInfo: "#697fc7",
        appointmentOpenInfo: "#f5f5f5",
      },
      archiveComponent: {
        archiveContentBackgroundColor: "#E3E3E7",
        archiveActionBackgroundColor: "#FAFAFA",
      },
    },
    typography: {
      allVariants: {
        ...ubuntu.style,
      },
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          multiline: {
            padding: "16px 24px !important",
          },
          root: {
            paddingLeft: "10px",
            minHeight: "50px",
            borderRadius: "1.5rem !important",
            backgroundColor: "#F1F1F3",
            color: "#575A62",
            fontSize: "0.8rem",
            "& fieldset": {
              borderColor: "rgba(0,0,0,0.12) !important",
              transition: "background-color 0.3s ease",
            },
            "&:hover fieldset": {
              backgroundColor: "rgba(0,0,0,0.05) !important",
            },
            "& fieldset legend span": {
              display: "none",
            },
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          icon: {
            right: "1rem",
          },
          root: {
            height: "50px",
            borderColor: "rgba(0,0,0,0.12) !important",
            border: "1px solid",
            paddingLeft: 24,
          },
        },
      },
      MuiInputLabel: {
        defaultProps: {
          shrink: true,
        },
        styleOverrides: {
          root: {
            fontSize: "0.85rem",
            letterSpacing: "0.1rem",
            transform: "translate(25px, -15px) scale(0.75)",
            color: "#b0b0b0",
            textTransform: "uppercase",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.size === "small" && {
              height: "2.5rem",
              borderRadius: "1.25rem",
              width: "11rem",
              padding: 0,
              boxShadow: "none",
            }),
          }),
        },
      },
    },
  },
  deDE,
);

export default AppTheme;
