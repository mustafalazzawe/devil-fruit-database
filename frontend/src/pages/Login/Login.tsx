import { FC, FormEvent, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { useAuthContext } from "../../providers/Auth/Auth.context";

import { LoginWrapper, LoginCard, LoginTitle, LoginForm } from "./Login.styled";

import Textfield from "../../components/Textfield/Textfield";
import Button from "../../components/Button/Button";

const Login: FC = () => {
  const { login, isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  const [apiKey, setApiKey] = useState<string>("");

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (apiKey.trim()) {
      login(apiKey.trim());
      navigate("/admin", { replace: true });
    }
  };

  return (
    <LoginWrapper>
      <LoginCard>
        <LoginTitle>Admin Login</LoginTitle>
        <LoginForm onSubmit={handleSubmit}>
          <Textfield
            id="api-key"
            type="password"
            placeholder="Enter API key"
            value={apiKey}
            handleInputChange={(e) => setApiKey(e.target.value)}
          />
          <Button
            type="submit"
            $variant={{ variantName: "Solid" }}
            $minwidth="100%"
            $icon={{
              hasIcon: true,
              iconStyle: { iconName: "Login" },
            }}
          >
            Login
          </Button>
        </LoginForm>
      </LoginCard>
    </LoginWrapper>
  );
};

export default Login;
