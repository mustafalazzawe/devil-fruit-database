import styled from "styled-components";

const PageWrapper = styled.div`
  padding: 64px 128px 32px 128px;

  width: 100vw;
  height: 100vh;
  min-height: 100vh;

  overflow: hidden;

  @media (min-width: ${({ theme }) =>
      theme.breakpoints.tablet.min}) and (max-width: ${({ theme }) =>
      theme.breakpoints.tablet.max}) {
    padding: 64px 32px 32px 32px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile.max}) {
    padding: 32px 16px;
  }

  @media (max-width: ${({ theme }) =>
      theme.breakpoints.tablet.max}) and ((max-height: 600px)) {
    height: auto;
    min-height: 100vh;
    overflow-y: auto;
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
  }
`;

export default PageWrapper;
