import styled from "styled-components";

export const SelectInput = styled.select`
  width: 100%;

  padding: 8px 36px 8px 16px;

  box-sizing: border-box;

  ${({ theme }) => theme.commonBorder};
  border-radius: 4px;

  background-color: ${({ theme }) => theme.background["bg-primary"]};

  color: ${({ theme }) => theme.foreground["fg-primary"]};

  ${({ theme }) => theme.bodySmall};

  cursor: pointer;

  appearance: none;
  -webkit-appearance: none;

  &:focus {
    outline: none;

    border: 1px solid
      ${({ theme }) => theme.commonInteractive["interactive-primary"]};
    box-shadow: 0px 0px 0px 2px
      ${({ theme }) => theme.interactive["interactive-focus"]};
  }
`;

export const SelectCaret = styled.div`
  position: absolute;
  right: 10px;

  pointer-events: none;

  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.foreground["fg-tertiary"]};

  transition: transform 150ms ease-in-out;
`;

export const SelectContainer = styled.div<{ $isOpen?: boolean }>`
  position: relative;

  flex: 1;

  display: flex;
  align-items: center;

  ${SelectCaret} {
    transform: ${({ $isOpen }) =>
      $isOpen ? "rotate(180deg)" : "rotate(0deg)"};
  }
`;
