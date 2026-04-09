import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { LuLayers3, LuLayoutDashboard, LuWallet } from "react-icons/lu";
import { LuBox } from "react-icons/lu";
import { RxDashboard } from "react-icons/rx";
import { FaRegHandshake, FaUserFriends } from "react-icons/fa";
import { BsCalculator } from "react-icons/bs";
import { IoDocumentsOutline, IoSettingsOutline } from "react-icons/io5";
import { LuPin } from "react-icons/lu";
import { LuPinOff } from "react-icons/lu";
import { useState } from "react";

const Sidebar = () => {
  const token = useSelector((state: any) => state.auth.token);
  const [sidepin, setSidePin] = useState<boolean>(false);
  const [hovered, setHovered] = useState(false);

  const sidemenu = [
    { to: "/dashboard", label: "Dashboard", icon: <LuLayoutDashboard /> },
    { to: "/add-order", label: "Orders", icon: <LuBox /> },
    { to: "/addTodo", label: "Multibox", icon: <RxDashboard /> },
    { to: "/alltodo", label: "Customers", icon: <FaUserFriends /> },
    { to: "/userData", label: "Rate Calculator", icon: <BsCalculator /> },
    { to: "/userData", label: "Wallet", icon: <LuWallet /> },
    { to: "/userData", label: "Bulk Report", icon: <LuLayers3 /> },
    { to: "/userData", label: "Documents", icon: <IoDocumentsOutline /> },
    { to: "/userData", label: "Agreement Center", icon: <FaRegHandshake /> },
    { to: "/userData", label: "Settings", icon: <IoSettingsOutline /> },
  ];

  if (!token) return null;

  const isExpanded = sidepin || hovered;

  return (
    <div
      className={`w-auto pt-25 h-full relative shadow-2xl bg-white border-e py-5 px-4 transition-all duration-500 ease-in-out ${isExpanded ? "max-w-[240px]" : "max-w-[70px]"}`}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <ul className="flex flex-col gap-y-1 *:cursor-pointer *:font-semibold">
        {sidemenu.map((items, index) => (
          <li className="flex items-center" key={index}>
            <NavLink
              to={items.to}
              className="w-full px-5 py-3 rounded-lg flex items-center justify-start gap-x-3 text-gray-500 font-medium"
            >
              <span className="">{items.icon}</span>
              <span
                className={`whitespace-nowrap transition-all duration-300
                ${
                  isExpanded
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-2"
                }`}
              >
                {items.label}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
      <div
        className="absolute top-18 right-4 text-gray-600 text-lg cursor-pointer"
        onClick={() => {
          setSidePin(!sidepin);
        }}
      >
        {isExpanded && <>{!sidepin ? <LuPin /> : <LuPinOff />} </>}
      </div>
    </div>
  );
};

export default Sidebar;
