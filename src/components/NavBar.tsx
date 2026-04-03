import { useNavigate } from "react-router-dom";
import { BsStars } from "react-icons/bs";
import { NavProfileIcon } from "./Element/navProfileIcon";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.auth.token);

  if (!token) return null;
  return (
    <nav className="h-15 w-full bg-white fixed flex px-13 items-center justify-between shadow-2xl/10 shadow-black z-50">
      <img
        src="https://qa2.franchise.shipgl.in/logo.png"
        alt=""
        className="w-30 cursor-pointer hover:scale-105 transition-transform ease-in-out duration-300"
        onClick={() => navigate("/")}
      />
      <div className="flex items-center gap-x-3">
        <p className="flex items-center text-blue-800 gap-x-2 border-e px-2">
          <BsStars />
          <span className="hover:underline cursor-pointer">Quick Action</span>
        </p>
        <div className="flex gap-x-3 px-3 border-e">
          <img
            src="https://qa2.franchise.shipgl.in/assets/wallet-COmO1cnz.svg"
            alt=""
          />
          <p>₹ 9471.15</p>
          <p className="text-blue-800 font-medium hover:underline cursor-pointer">
            Recharge
          </p>
        </div>
        <NavProfileIcon />
      </div>
    </nav>
  );
};

export default Navbar;
