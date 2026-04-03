import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { FaArrowsTurnToDots } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="h-15 w-full bg-slate-900 fixed flex px-13 items-center justify-between *:text-emerald-200 shadow-2xl/10 shadow-black z-50">
      <p
        className="flex items-center gap-x-2 text-2xl font-semibold hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      >
        TODO
        <span>
          <FaArrowsTurnToDots />
        </span>
      </p>
      <p className="flex flex-row *:text-amber-200 items-center gap-x-2 *:cursor-pointer">
        <span className="text-3xl">
          <FaUserCircle />
        </span>
        <span className="text-xl hover:rotate-180 transition-transform duration-300 ease-in-out">
          <IoIosArrowDown />
        </span>
      </p>
    </nav>
  );
};

export default Navbar;
