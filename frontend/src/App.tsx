import { FC } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Admin from "./pages/Admin/Admin";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const App: FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </HashRouter>
  );
};

export default App;
