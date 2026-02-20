import { css } from "styled-components";
import { IButtonStyles } from "./Button.types";

export const ButtonStyles: IButtonStyles = {
  Outline: css`
    background-color: ${({ theme }) => theme.background["bg-primary"]};
    ${({ theme }) => theme.commonBorder};

    &:hover {
      border-color: ${({ theme }) =>
        theme.commonInteractive["interactive-primary-hover"]};

      transition: border-color 100ms ease-in;
    }

    &:active {
      border-color: ${({ theme }) =>
        theme.commonInteractive["interactive-primary"]};

      transition: border-color 100ms ease-in;
    }

    &:disabled {
      cursor: not-allowed;

      opacity: 0.4;
    }
  `,
  Solid: css`
    background-color: ${({ theme }) =>
      theme.commonInteractive["interactive-primary"]};
    color: ${({ theme }) => theme.foreground["fg-primary-on-brand"]};

    border: none;

    &:hover {
      background-color: ${({ theme }) =>
        theme.commonInteractive["interactive-primary-hover"]};

      transition: background-color 100ms ease-in;
    }

    &:active {
      background-color: ${({ theme }) =>
        theme.commonInteractive["interactive-primary-active"]};

      transition: background-color 100ms ease-in;
    }

    &:disabled {
      cursor: not-allowed;

      opacity: 0.4;
    }
  `,
  Destructive: css`
    background-color: ${({ theme }) => theme.commonError["error-primary"]};
    color: ${({ theme }) => theme.foreground["fg-primary-on-brand"]};

    border: none;

    &:hover {
      background-color: ${({ theme }) => theme.commonError["error-primary-hover"]};

      transition: background-color 100ms ease-in;
    }

    &:active {
      background-color: ${({ theme }) => theme.commonError["error-primary-active"]};

      transition: background-color 100ms ease-in;
    }

    &:disabled {
      cursor: not-allowed;

      opacity: 0.4;
    }
  `,
  Text: css`
    background-color: transparent;
    border: none;

    color: ${({ theme }) => theme.commonInteractive["interactive-primary"]};

    &:hover {
      color: ${({ theme }) =>
        theme.commonInteractive["interactive-primary-hover"]};

      transition: color 100ms ease-in;
    }

    &:active {
      color: ${({ theme }) =>
        theme.commonInteractive["interactive-primary-active"]};

      transition: color 100ms ease-in;
    }

    &:disabled {
      cursor: not-allowed;

      opacity: 0.4;
    }
  `,
  TextDestructive: css`
    background-color: transparent;
    border: none;

    color: ${({ theme }) => theme.commonError["error-primary"]};

    &:hover {
      color: ${({ theme }) => theme.commonError["error-primary-hover"]};

      transition: color 100ms ease-in;
    }

    &:active {
      color: ${({ theme }) => theme.commonError["error-primary-active"]};

      transition: color 100ms ease-in;
    }

    &:disabled {
      cursor: not-allowed;

      opacity: 0.4;
    }
  `,
  IconOutline: css`
    background-color: ${({ theme }) => theme.background["bg-primary"]};
    ${({ theme }) => theme.commonBorder};

    padding: 8px;

    &:hover {
      border-color: ${({ theme }) =>
        theme.commonInteractive["interactive-primary-hover"]};

      transition: border-color 100ms ease-in;
    }

    &:active {
      border-color: ${({ theme }) =>
        theme.commonInteractive["interactive-primary"]};

      transition: border-color 100ms ease-in;
    }

    &:disabled {
      cursor: not-allowed;

      opacity: 0.4;
    }
  `,
  IconSolid: css`
    background-color: ${({ theme }) =>
      theme.commonInteractive["interactive-primary"]};
    color: ${({ theme }) => theme.foreground["fg-primary-on-brand"]};

    padding: 8px;

    border: none;

    &:hover {
      background-color: ${({ theme }) =>
        theme.commonInteractive["interactive-primary-hover"]};

      transition: background-color 100ms ease-in;
    }

    &:active {
      background-color: ${({ theme }) =>
        theme.commonInteractive["interactive-primary-active"]};

      transition: background-color 100ms ease-in;
    }

    &:disabled {
      cursor: not-allowed;

      opacity: 0.4;
    }
  `,
  IconDestructive: css`
    background-color: ${({ theme }) => theme.background["bg-primary"]};
    ${({ theme }) => theme.commonBorder};

    padding: 8px;

    svg {
      fill: ${({ theme }) => theme.commonError["error-primary"]};
    }

    &:hover {
      svg {
        fill: ${({ theme }) => theme.commonError["error-primary-hover"]};

        transition: fill 100ms ease-in;
      }
    }

    &:active {
      svg {
        fill: ${({ theme }) => theme.commonError["error-primary-active"]};

        transition: fill 100ms ease-in;
      }
    }

    &:disabled {
      cursor: not-allowed;

      opacity: 0.4;
    }
  `,
};
