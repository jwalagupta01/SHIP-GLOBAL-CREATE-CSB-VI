import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const token = useSelector((state: any) => state.auth.token);
  if (!token) return null;
  return (
    <div className="w-60 h-full fixed shadow-2xl bg-slate-900 shadow-black py-5">
      <ul className="flex flex-col gap-y-2 *:cursor-pointer *:font-semibold">
        <li className="flex">
          <NavLink
            to="/"
            className="h-13 w-full py-3 px-5 rounded-lg text-amber-200 hover:bg-white hover:text-black hover:scale-105 duration-300 transition-transform ease-in-out"
          >
            CREATE CSB ORDER
          </NavLink>
        </li>
        {/* <li className="flex items-center">
          <NavLink
          to="/addTodo"
          className="h-13 w-full px-5 py-3 rounded-lg text-amber-200 hover:bg-white hover:text-black hover:scale-105 duration-300 transition-transform"
          >
          ADD TODO
          </NavLink>
          </li>
          <li className="flex">
          <NavLink
          to="/alltodo"
          className="h-13 w-full py-3 px-5 rounded-lg text-amber-200 hover:bg-white hover:text-black hover:scale-105 duration-300 transition-transform ease-in-out"
          >
          ALL TODO
          </NavLink>
          </li>
          <li className="flex">
          <NavLink
          to="/userData"
          className="h-13 w-full py-3 px-5 rounded-lg text-amber-200 hover:bg-white hover:text-black hover:scale-105 duration-300 transition-transform ease-in-out"
          >
          USER DATA
          </NavLink>
          </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
