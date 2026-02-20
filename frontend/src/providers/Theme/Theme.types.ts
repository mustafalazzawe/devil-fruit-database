import { CSSProp, DefaultTheme } from "styled-components";
import { ButtonStyles } from "../../components/Button/Button.variants";
import { palettes } from "../../App.constants";
import { CheckboxStyles } from "../../components/Checkbox/Checkbox.variants";

export type IThemePalettes = typeof palettes;

export interface IThemeModes {
  light: {
    foreground: DefaultTheme;
    background: DefaultTheme;
    border: DefaultTheme;
    interactive: DefaultTheme;
  };
  dark: {
    foreground: DefaultTheme;
    background: DefaultTheme;
    border: DefaultTheme;
    interactive: DefaultTheme;
  };
}

export interface IThemeCommonColors {
  commonForeground: {
    "fg-white": string;
    "fg-disabled": string;
    "fg-placeholder": string;
  };
  commonBackground: {
    "bg-white": string;
    "bg-modal-overlay": string;
  };
  commonInteractive: {
    "interactive-primary": string;
    "interactive-primary-hover": string;
    "interactive-primary-active": string;
  };
  commonError: {
    "error-primary": string;
    "error-primary-hover": string;
    "error-primary-active": string;
  };
  legend: {
    awakened: string;
    artificial: string;
  };
}

export interface IThemeFonts {
  Rubik: CSSProp;
  FiraCode: CSSProp;
}

export interface IThemeTypography {
  headerLarge: CSSProp;
  headerMedium: CSSProp;
  headerSmall: CSSProp;
  headerExtraSmall: CSSProp;
  bodyLarge: CSSProp;
  bodyMedium: CSSProp;
  bodySmall: CSSProp;
  bodyExtraSmall: CSSProp;
  label: CSSProp;
  code: CSSProp;
}

export interface IThemeBreakpoints {
  mobile: {
    max: string;
  };
  tablet: {
    min: string;
    max: string;
  };
  desktop: {
    min: string;
  };
}

export interface IThemeCommonStyles {
  commonBorder: CSSProp;
  commonShadowSm: CSSProp;
  commonShadowMd: CSSProp;
  commonShadowLg: CSSProp;
}

// dont forget to update the themeVars const, when adding a new component
export interface IThemeComponents {
  buttons: typeof ButtonStyles;
  checkboxes: typeof CheckboxStyles;
}

export interface ITheme {
  palettes: IThemePalettes;
  modes: IThemeModes;
  commonColors: IThemeCommonColors;
  typography: IThemeTypography;
  breakpoints: IThemeBreakpoints;
  commonStyles: IThemeCommonStyles;
  components: IThemeComponents;
}

export type TModes = "light" | "dark";

export interface IThemeState {
  mode: TModes;
  toggleMode: () => void;
}
