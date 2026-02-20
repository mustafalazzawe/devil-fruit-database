import styled from "styled-components";
import { TableData } from "../../components/Table/Table.styled";

export const AdminBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  width: 100%;
  flex: 1;
  min-height: 0;

  overflow: hidden;
`;

export const AdminTopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;

  width: 100%;
  flex-shrink: 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const AdminSearchWrapper = styled.div`
  width: 320px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    width: 100%;
  }
`;

export const AdminBodyCard = styled.div`
  display: flex;
  flex-direction: column;

  flex: 1;
  min-height: 0;

  width: 100%;

  padding: 32px;

  ${({ theme }) => theme.commonBorder};
  border-radius: 4px;

  background-color: ${({ theme }) => theme.background["bg-primary"]};
`;

export const AdminActionsCell = styled(TableData)`
  vertical-align: middle;
`;

export const AdminActionsContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

