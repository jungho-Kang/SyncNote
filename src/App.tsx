import LoginPage from "@/pages/auth/LoginPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
        />
        <Route path="/auth" element={<LoginPage />} />
      </Routes>
    </Router>
  );
};

export default App;
