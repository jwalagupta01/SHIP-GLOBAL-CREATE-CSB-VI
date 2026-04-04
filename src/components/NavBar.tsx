import { useNavigate } from "react-router-dom";
import { BsStars } from "react-icons/bs";
import { NavProfileIcon } from "./Element/navProfileIcon";
import { useDispatch, useSelector } from "react-redux";
import { LuBoxes, LuPackagePlus } from "react-icons/lu";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  addProfileDetails,
  // deleteProfileDetails,
  addBalance,
} from "@/Redux/HomeData.ts/ProfileDetails";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const balance = useSelector((state: any) => state.profileDetails.balance);
  const profileDetails = useSelector(
    (state: any) => state.profileDetails.personalDetail,
  );
  console.log(profileDetails);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const token = useSelector((state: any) => state.auth.token);
  const [quickShow, setQuickShow] = useState<boolean>(false);
  const quickAction = [
    { label: "Add Order", to: "/add-order", icon: <LuPackagePlus /> },
    { label: "Add Multiorder", to: "/add-multibox", icon: <LuBoxes /> },
    { label: "Add CSB-v Order", to: "", icon: <LuPackagePlus /> },
    { label: "Rate Calculator", to: "", icon: <LuPackagePlus /> },
  ];

  //  outSide the box click
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setQuickShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // fetch balance
  useEffect(() => {
    if (token == "") return;

    const fetchBalance = async () => {
      try {
        const res = await axios.get(
          "https://qa2.franchise.backend.shipgl.in/api/v1/wallet/balance",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        dispatch(addBalance(res?.data?.data?.wallet_balance));
      } catch (error) {
        console.error(error);
      }
    };
    fetchBalance();
  }, [token]);

  // fetch profile Details
  useEffect(() => {
    if (token == "") return;

    async function profileDetails() {
      try {
        const res = await axios.get(
          "https://qa2.franchise.backend.shipgl.in/api/v1/auth/get-profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        dispatch(addProfileDetails(res?.data?.data));
      } catch (error) {
        console.error(error);
      }
    }
    profileDetails();
  }, [token]);

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
        <div className="relative">
          <p
            className="flex items-center text-blue-800 gap-x-2 border-e px-2"
            onClick={() => {
              setQuickShow(!quickShow);
            }}
          >
            <BsStars />
            <span className="hover:underline cursor-pointer">Quick Action</span>
          </p>
          {quickShow && (
            <div
              className="absolute top-10 right-0 px-8 py-4 flex items-center gap-x-3 bg-white shadow transition-all easy-in-out duration-300 animate-[fadeIn_0.3s_ease-out]"
              ref={boxRef}
            >
              {quickAction.map((items, index) => (
                <div
                  className="flex flex-col items-center justify-center w-28 h-28 px-3 bg-blue-200/30 rounded *:text-center cursor-pointer"
                  key={index}
                  onClick={() => {
                    navigate(items.to);
                    setQuickShow(false);
                  }}
                >
                  <span className="px-1 py-1 bg-white rounded text-blue-600 text-2xl">
                    {items.icon}
                  </span>
                  <p>{items.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="flex gap-x-3 px-3 border-e">
          <img
            src="https://qa2.franchise.shipgl.in/assets/wallet-COmO1cnz.svg"
            alt=""
          />
          <p>₹ {balance}</p>
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
