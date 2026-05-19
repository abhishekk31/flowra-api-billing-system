import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import LondingPage from "./Componets/LondingPage";
import ProviderDashboard from "./Componets/ProviderDashboard";
import ConsumerDashboard from "./Componets/ConsumerDashboard";
import AdminLayout from "./Componets/AdminLayout";

function App() {

  // 🔐 Better guard (checks token + role safely)
  const ProtectedRoute = ({ children, role }) => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");

    // not logged in
    if (!token || !userStr) {
      return <Navigate to="/" replace />;
    }

    let user;
    try {
      user = JSON.parse(userStr);
    } catch {
      return <Navigate to="/" replace />;
    }

    // wrong role
    if (role && user.role !== role) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  return (
    <Router>
      <Routes>

        {/* Landing */}
        <Route path="/" element={<LondingPage />} />

        {/* Provider */}
        <Route
          path="/dashboard/provider"
          element={
            <ProtectedRoute role="provider">
              <ProviderDashboard />
            </ProtectedRoute>
          }
        />

        {/* Consumer */}
        <Route
          path="/dashboard/consumer"
          element={
            <ProtectedRoute role="consumer">
              <ConsumerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Admin (single page with sidebar + dynamic content inside) */}
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout></AdminLayout>
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;