import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import MainLayout from "@/layout/MainLayout";
import RoomLayout from "@/layout/RoomLayout";

import MainPage from "@/pages/MainPage";
import RoomPage from "@/pages/RoomPage";
import LoginPage from "@/pages/auth/LoginPage";
import CheckEmailPage from "@/pages/auth/CheckEmailPage";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import EmailVerificationPage from "@/pages/auth/EmailVerificationPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<LoginPage />} />
        <Route path="/auth/email" element={<CheckEmailPage />} />
        <Route
          path="/auth/email-verification"
          element={<EmailVerificationPage />}
        />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<MainPage />} />
        </Route>

        {/* 방 영역 */}
        <Route
          element={
            <ProtectedRoute>
              <RoomLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/room/:id" element={<RoomPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
