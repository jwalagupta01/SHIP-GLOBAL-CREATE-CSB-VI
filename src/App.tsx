import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import Csbform from "./pages/Csbform";
import { Login } from "./components/Login";

const App = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-white">
      <NavBar />
      <div className="flex h-screen w-screen flex-row justify-between">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/csbIVForm" element={<Csbform />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
