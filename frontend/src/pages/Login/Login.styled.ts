import styled from "styled-components";

export const LoginWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100vw;
  height: 100vh;
`;

export const LoginCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  width: 100%;
  max-width: 400px;

  padding: 32px;

  ${({ theme }) => theme.commonBorder};
  border-radius: 8px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile.max}) {
    padding: 24px 16px;
    margin: 0 16px;
  }
`;

export const LoginTitle = styled.h2`
  color: ${({ theme }) => theme.foreground["fg-primary"]};

  ${({ theme }) => theme.headerSmall};

  text-align: center;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
