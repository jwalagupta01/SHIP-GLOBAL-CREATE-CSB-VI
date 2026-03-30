import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import Csbform from "./pages/Csbform";

const App = () => {
  return (
    <div className="flex flex-col h-screen w-screen bg-white">
      <NavBar />
      <div className="flex h-full mt-15 flex-row justify-between">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Csbform />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
