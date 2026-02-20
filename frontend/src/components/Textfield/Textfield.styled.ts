import { css, styled } from "styled-components";
import { ITextfieldProps } from "./Textfield.types";

export const TextfieldContainer = styled.div`
  position: relative;

  width: 100%;

  cursor: text;
`;

export const TextfieldLeftIconContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;

  top: 50%;
  left: 8px;

  transform: translateY(-50%);

  padding: 4px;
`;

export const TextfieldRightIconContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;

  top: 50%;
  right: 8px;

  transform: translateY(-50%);

  padding: 4px;

  background: none;
  border: none;

  cursor: pointer;

  opacity: 0.6;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`;

const TextfieldInput = styled.input.attrs({ type: "text" })<ITextfieldProps>`
  background-color: ${({ theme }) => theme.background["bg-primary"]};

  width: 100%;

  ${({ $icon }) =>
    $icon?.hasIcon
      ? css`
          padding: 8px 42px;
        `
      : css`
          padding: 8px 42px 8px 16px;
        `}

  box-sizing: border-box;

  ${({ theme }) => theme.commonBorder};
  border-radius: 4px;

  color: ${({ theme }) => theme.foreground["fg-tertiary"]};

  ${({ theme }) => theme.bodySmall};

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &:focus {
    outline: none;

    color: ${({ theme }) => theme.foreground["fg-primary"]};

    border: 1px solid
      ${({ theme }) => theme.commonInteractive["interactive-primary"]};
    box-shadow: 0px 0px 0px 2px
      ${({ theme }) => theme.interactive["interactive-focus"]};
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px
      ${({ theme }) => theme.background["bg-primary"]} inset;
    -webkit-text-fill-color: ${({ theme }) => theme.foreground["fg-primary"]};
    caret-color: ${({ theme }) => theme.foreground["fg-primary"]};
    transition: background-color 5000s ease-in-out 0s;
  }
`;

export default TextfieldInput;
