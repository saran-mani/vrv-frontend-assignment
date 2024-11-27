import { useEffect } from "react";
import "./App.css";
import LoginPage from "./pages/Login";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Blogs from "./pages/Blogs";
import ProtectedRoute from "./components/ProtectRoutes";
import SignUpPage from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

function AppRoutes() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Blogs />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
