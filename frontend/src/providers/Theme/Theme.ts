import { css } from "styled-components";

import { palettes } from "../../App.constants";
import {
  ITheme,
  IThemeBreakpoints,
  IThemeCommonColors,
  IThemeCommonStyles,
  IThemeFonts,
  IThemeModes,
  IThemeTypography,
} from "./Theme.types";
import { ButtonStyles } from "../../components/Button/Button.variants";
import { CheckboxStyles } from "../../components/Checkbox/Checkbox.variants";

const modes: IThemeModes = {
  light: {
    foreground: {
      "fg-primary": palettes.grayscale[950],
      "fg-primary-on-brand": palettes.grayscale[50],
      "fg-secondary": palettes.grayscale[800],
      "fg-tertiary": palettes.grayscale[700],
      "fg-quaternary": palettes.grayscale[500],
      "fg-white": palettes.base.white,
      "fg-disabled": palettes.grayscale[500],
      "fg-placeholder": palettes.grayscale[500],
    },
    background: {
      "bg-primary": palettes.grayscale[50],
      "bg-secondary": palettes.grayscale[100],
      "bg-tertiary": palettes.grayscale[200],
      "bg-base": palettes.base.white,
    },
    border: {
      "border-primary": palettes.grayscale[300],
      "border-secondary": palettes.grayscale[400],
      "border-tertiary": palettes.grayscale[200],
      "border-disabled": palettes.grayscale[300],
    },
    interactive: {
      "interactive-focus": palettes.primary[200],
    },
  },
  dark: {
    foreground: {
      "fg-primary": palettes.grayscale[50],
      "fg-primary-on-brand": palettes.grayscale[50],
      "fg-secondary": palettes.grayscale[300],
      "fg-tertiary": palettes.grayscale[400],
      "fg-quaternary": palettes.grayscale[400],
      "fg-white": palettes.base.white,
      "fg-disabled": palettes.grayscale[500],
      "fg-placeholder": palettes.grayscale[500],
    },
    background: {
      "bg-primary": palettes.grayscale[950],
      "bg-secondary": palettes.grayscale[900],
      "bg-tertiary": palettes.grayscale[800],
      "bg-base": palettes.grayscale[950],
    },
    border: {
      "border-primary": palettes.grayscale[600],
      "border-secondary": palettes.grayscale[700],
      "border-tertiary": palettes.grayscale[800],
      "border-disabled": palettes.grayscale[600],
    },
    interactive: {
      "interactive-focus": palettes.primary[900],
    },
  },
};

const commonColors: IThemeCommonColors = {
  commonForeground: {
    "fg-white": palettes.base.white,
    "fg-disabled": palettes.grayscale[500],
    "fg-placeholder": palettes.grayscale[500],
  },
  commonBackground: {
    "bg-white": palettes.base.white,
    "bg-modal-overlay": palettes.alpha.modal,
  },
  commonInteractive: {
    "interactive-primary": palettes.primary[500],
    "interactive-primary-hover": palettes.primary[400],
    "interactive-primary-active": palettes.primary[300],
  },
  commonError: {
    "error-primary": palettes.error[600],
    "error-primary-hover": palettes.error[500],
    "error-primary-active": palettes.error[500],
  },
  legend: {
    awakened: palettes.legend.amber,
    artificial: palettes.legend.purple,
  },
};

const fonts: IThemeFonts = {
  Rubik: css`
    font-family: "Rubik", sans-serif;
  `,
  FiraCode: css`
    font-family: "Fira Code", monospace;
  `,
};

const typography: IThemeTypography = {
  headerLarge: css`
    ${fonts.Rubik}
    font-size: 2.25rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2.5rem;
  `,
  headerMedium: css`
    ${fonts.Rubik}
    font-size: 1.875rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2.25rem;
  `,
  headerSmall: css`
    ${fonts.Rubik}
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 500;
    line-height: 2rem;
  `,
  headerExtraSmall: css`
    ${fonts.Rubik}
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1.75rem;
  `,
  bodyLarge: css`
    ${fonts.Rubik}
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.75rem;
  `,
  bodyMedium: css`
    ${fonts.Rubik}
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.5rem;
  `,
  bodySmall: css`
    ${fonts.Rubik}
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem;
  `,
  bodyExtraSmall: css`
    ${fonts.Rubik}
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1rem;
  `,
  label: css`
    ${fonts.Rubik}
    font-size: 0.75rem;
    font-style: normal;
    font-weight: 500;
    line-height: 1rem;
    text-transform: uppercase;
  `,
  code: css`
    ${fonts.FiraCode}
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 400;
    line-height: 1.25rem;
  `,
};

const breakpoints: IThemeBreakpoints = {
  mobile: {
    max: "29.938em",
  },
  tablet: {
    min: "30em",
    max: "61.938em",
  },
  desktop: {
    min: "62em",
  },
};

const commonStyles: IThemeCommonStyles = {
  commonBorder: css`
    border: 1px solid ${({ theme }) => theme.border["border-primary"]};
  `,
  commonShadowSm: css`
    box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
      0px 1px 2px 0px rgba(0, 0, 0, 0.06);
  `,
  commonShadowMd: css`
    box-shadow: 0px 4px 8px -2px rgba(0, 0, 0, 0.1),
      0px 2px 4px -2px rgba(0, 0, 0, 0.06);
  `,
  commonShadowLg: css`
    box-shadow: 0px 12px 16px -4px rgba(0, 0, 0, 0.08),
      0px 4px 6px -2px rgba(0, 0, 0, 0.03);
  `,
};

export const themeVars: ITheme = {
  palettes: { ...palettes },
  modes,
  commonColors,
  typography,
  breakpoints,
  components: { buttons: ButtonStyles, checkboxes: CheckboxStyles },
  commonStyles,
};
