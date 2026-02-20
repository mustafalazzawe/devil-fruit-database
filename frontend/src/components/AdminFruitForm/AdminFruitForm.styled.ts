import styled from "styled-components";
import { ModalContainer } from "../Modal/Modal.styled";

export const AdminFruitFormOverlay = styled(ModalContainer)``;

export const AdminFruitFormContainer = styled.div`
  display: flex;
  flex-direction: column;

  width: 80%;
  height: 80%;

  padding: 24px;

  ${({ theme }) => theme.commonBorder};
  border-radius: 4px;

  background-color: ${({ theme }) => theme.background["bg-primary"]};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet.min}) {
    max-width: 932px;
    max-height: 776px;

    min-height: 256px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile.max}) {
    width: 100%;
    height: 100%;
  }
`;

export const AdminFruitFormHeader = styled.div`
  flex-shrink: 0;

  display: flex;
  align-items: center;

  padding-bottom: 16px;

  border-bottom: 1px solid ${({ theme }) => theme.border["border-primary"]};
`;

export const AdminFruitFormTitle = styled.h2`
  flex: 1;

  color: ${({ theme }) => theme.foreground["fg-primary"]};

  ${({ theme }) => theme.headerExtraSmall};
`;

export const AdminFruitFormBody = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1 0 0;
  min-height: 0;

  padding: 0 4px;

  overflow-y: auto;

  scrollbar-gutter: auto;

  &::-webkit-scrollbar {
    width: 12px;
    height: 12px;
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 16px 16px
      ${({ theme }) => theme.background["bg-tertiary"]};
    border: 3px solid ${({ theme }) => theme.background["bg-primary"]};

    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 16px 16px
      ${({ theme }) => theme.background["bg-secondary"]};
    border: solid 3px ${({ theme }) => theme.background["bg-primary"]};

    border-radius: 8px;
  }

  &::-webkit-scrollbar-corner {
    background: transparent;
  }
`;

export const AdminFruitFormFooter = styled.div`
  flex-shrink: 0;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;

  padding-top: 16px;

  border-top: 1px solid ${({ theme }) => theme.border["border-primary"]};
`;

export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  padding: 24px 0;
`;

export const SectionDivider = styled.hr`
  margin: 0;

  border: none;
  border-top: 1px solid ${({ theme }) => theme.border["border-tertiary"]};
`;

export const SectionLabel = styled.span`
  color: ${({ theme }) => theme.foreground["fg-primary"]};

  ${({ theme }) => theme.label};
`;

export const SubSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const FormFieldLabel = styled.label`
  color: ${({ theme }) => theme.foreground["fg-secondary"]};

  ${({ theme }) => theme.bodySmall};
`;

export const RepeatableList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RepeatableRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  width: 100%;
`;

export const AddFieldButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  width: 100%;
  min-height: 40px;

  padding: 8px 16px;

  border: 1px dashed ${({ theme }) => theme.border["border-primary"]};
  border-radius: 4px;

  background-color: transparent;

  color: ${({ theme }) => theme.commonInteractive["interactive-primary"]};

  ${({ theme }) => theme.bodySmall};

  cursor: pointer;

  svg {
    fill: ${({ theme }) => theme.commonInteractive["interactive-primary"]};
  }

  &:hover {
    border-color: ${({ theme }) =>
      theme.commonInteractive["interactive-primary-hover"]};
    color: ${({ theme }) =>
      theme.commonInteractive["interactive-primary-hover"]};

    svg {
      fill: ${({ theme }) =>
        theme.commonInteractive["interactive-primary-hover"]};
    }

    transition: border-color 100ms ease-in, color 100ms ease-in;
  }
`;

export const UserEntryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const AwakeningRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const AwakeningLabel = styled.span`
  color: ${({ theme }) => theme.foreground["fg-tertiary"]};

  ${({ theme }) => theme.label};
`;

export const AwakeningCheckboxes = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  height: 40px;
`;

export const ErrorMessage = styled.span`
  flex: 1;

  color: ${({ theme }) => theme.commonError["error-primary"]};

  ${({ theme }) => theme.bodySmall};
`;
