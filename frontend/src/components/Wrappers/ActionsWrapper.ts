import { styled } from "styled-components";

const ActionsWrapper = styled.div`
  display: flex;

  justify-content: flex-end;
  align-items: center;
  gap: 8px;

  @media (max-width: 768px) {
    width: 100%;

    justify-content: space-between;
  }
`;

export default ActionsWrapper;
