import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

import { useAuthContext } from "../../providers/Auth/Auth.context";

const ProtectedRoute: FC<PropsWithChildren> = ({ children }) => {
  const { isAuthenticated } = useAuthContext();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
