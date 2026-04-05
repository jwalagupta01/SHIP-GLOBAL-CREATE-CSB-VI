import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import Csbform from "./pages/AddOrder";
import { Login } from "./pages/Login";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { DashBoard } from "./pages/DashBoard";
import { Multiorder } from "./pages/Multiorder";

const App = () => {
  const token = useSelector((state: any) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="flex flex-col h-screen w-screen bg-white relative">
      <NavBar />
      <div className="flex h-screen w-screen flex-row justify-between">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-order" element={<Csbform />} />
          <Route path="/add-multibox" element={<Multiorder />} />
        </Routes>
      </div>
      
    </div>
  );
};

export default App;
