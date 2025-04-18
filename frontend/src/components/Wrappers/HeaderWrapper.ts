import { styled } from "styled-components";

const HeaderWrapper = styled.div`
  display: flex;

  width: 100%;

  flex-direction: row;
  align-items: center;
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet.max}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export default HeaderWrapper;
