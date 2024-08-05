import { styled } from "styled-components";

const Header = styled.h1`
  display: flex;

  color: ${({ theme }) => theme.fgRegular};

  min-width: 132px;
  box-sizing: border-box;

  flex: 1 0 0;
  align-items: center;
  align-self: stretch;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  ${({ theme }) => theme.sectionTitle}
`;

export default Header;