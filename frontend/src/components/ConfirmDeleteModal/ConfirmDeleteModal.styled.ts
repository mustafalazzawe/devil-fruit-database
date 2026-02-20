import styled from "styled-components";

export const DeleteOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  width: 100%;
  height: 100%;

  background-color: ${({ theme }) =>
    theme.commonBackground["bg-modal-overlay"]};

  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    align-items: flex-end;
  }
`;

export const DeleteDialog = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  width: 100%;
  max-width: 440px;

  padding: 24px;

  ${({ theme }) => theme.commonBorder};
  border-radius: 4px;

  background-color: ${({ theme }) => theme.background["bg-primary"]};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    max-width: 100%;

    gap: 24px;

    border-radius: 4px 4px 0 0;
  }
`;

export const DeleteTextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const DeleteTitle = styled.h2`
  color: ${({ theme }) => theme.foreground["fg-primary"]};

  ${({ theme }) => theme.headerExtraSmall};
`;

export const DeleteBody = styled.p`
  color: ${({ theme }) => theme.foreground["fg-secondary"]};

  ${({ theme }) => theme.bodySmall};
`;

export const DeleteActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    border-top: 1px solid ${({ theme }) => theme.border["border-tertiary"]};
    padding-top: 12px;

    > * {
      flex: 1;
    }
  }
`;
