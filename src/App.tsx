import LoginPage from "@/pages/auth/LoginPage";
import MainPage from "@/pages/MainPage";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import MainLayout from "@/layout/MainLayout";
import RoomLayout from "./layout/RoomLayout";
import RoomPage from "./pages/RoomPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<LoginPage />} />

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
          <Route path="/room" element={<RoomPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
