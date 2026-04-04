import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import Csbform from "./pages/Csbform";
import { Login } from "./components/Login";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const App = () => {
  const token = useSelector((state: any) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="flex flex-col h-screen w-screen bg-white">
      <NavBar />
      <div className="flex h-screen w-screen flex-row justify-between">
        <Sidebar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/csbIVForm" element={<Csbform />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
