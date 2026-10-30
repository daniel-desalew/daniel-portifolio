import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";
import AboutPage from "./pages/AboutPage";
import AdminDashboard from "./pages/AdminDashboard";
import ContactPage from "./pages/ContactPage";
import AdminLogin from "./pages/AdminLogin";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/project/:id" element={<ProjectDetail />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/projects" element={<AdminDashboard />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
