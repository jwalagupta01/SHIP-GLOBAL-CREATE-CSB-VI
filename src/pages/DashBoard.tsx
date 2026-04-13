import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DropDownComboBox } from "@/components/Element/DropDownComboBox";
import { useForm } from "react-hook-form";
import {
  LuBoxes,
  LuTicketCheck,
  LuTicketSlash,
  LuTicketX,
} from "react-icons/lu";
import { TbBrandCodesandbox } from "react-icons/tb";

export function DashBoard() {
  const token = useSelector((state: any) => state.auth.token);
  const [dashboardData, setDashBoardData] = useState<any>({});
  const [walletActive, setWalletActive] = useState<any>([]);
  const dashCard = [
    {
      name: "All Orders",
      icon: <LuBoxes />,
      orders: dashboardData?.total_orders,
      colorClass: "from-blue-400/30 border-blue-400/30",
      Iconcolor: "bg-blue-400",
    },
    {
      name: "Drafted Orders",
      icon: <TbBrandCodesandbox />,
      orders: dashboardData?.drafted_orders,
      colorClass: "from-orange-400/30 border-orange-400/30",
      Iconcolor: "bg-orange-400",
    },
    {
      name: "Pending For Label",
      icon: <LuBoxes />,
      orders: dashboardData?.pending_label_orders,
      colorClass: "from-yellow-400/30 border-yellow-400/30",
      Iconcolor: "bg-yellow-400",
    },
    {
      name: "Packed Orders",
      icon: <LuBoxes />,
      orders: dashboardData?.packed_orders,
      colorClass: "from-green-400/30 border-green-400/30",
      Iconcolor: "bg-green-400",
    },
    {
      name: "Dispatched Orders",
      icon: <LuBoxes />,
      orders: dashboardData?.dispatch_orders,
      colorClass: "from-purple-400/30 border-purple-400/30",
      Iconcolor: "bg-purple-400",
    },
  ];

  const actionCard = [
    {
      name: "KYC Approval Pending",
      icon: <LuTicketCheck />,
      number: dashboardData?.kyc_csb4_pending,
      className: "bg-blue-300/30 text-blue-600",
    },
    {
      name: "CSB-V Approval Pending",
      icon: <LuTicketSlash />,
      number: dashboardData?.kyc_csb5_pending,
      className: "bg-violet-400/30 text-violet-800",
    },
    {
      name: "Disputed Orders",
      icon: <LuTicketX />,
      number: dashboardData?.dispute_orders,
      className: "bg-red-300/30 text-red-600",
    },
    {
      name: "On Hold Orders",
      icon: <LuTicketCheck />,
      number: dashboardData?.onhold_orders,
      className: "bg-green-300/30 text-green-600",
    },
  ];
  const colors = [
    "border-orange-400",
    "border-violet-400",
    "border-green-400",
    "border-blue-400",
    "border-pink-400",
    "border-yellow-400",
  ];

  const walletCard = walletActive?.map((items: any, index: number) => {
    return {
      details: items?.Description,
      time_date: items?.["Transaction Date"],
      className: colors[index % colors.length],
    };
  });

  const dashBoardForm = useForm({
    mode: "onChange",
    defaultValues: {
      dashboardDate: "Last 7 Days",
    },
  });
  const DashBoardDate = ["Last 7 Days", "Last 30 Days"].map((dates: any) => ({
    dates,
  }));

  const selectedDate = dashBoardForm.watch("dashboardDate");

  function getDateRange(option: string) {
    const to_date = new Date();
    const from_date = new Date();

    if (option === "Last 7 Days") {
      from_date.setDate(to_date.getDate() - 7);
    } else if (option === "Last 30 Days") {
      from_date.setDate(to_date.getDate() - 30);
    }

    const format = (date: Date) => date.toISOString().split("T")[0]; // "YYYY-MM-DD"

    return {
      from_date: format(from_date),
      to_date: format(to_date),
    };
  }

  useEffect(() => {
    async function dashBoardDatacall() {
      try {
        const payload = getDateRange(selectedDate);
        const res = await axios.post(
          "https://qa3.franchise.backend.shipgl.in/api/v1/dashboard",
          { payload },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setDashBoardData(res?.data?.data);
      } catch (error) {
        console.error(error);
      }
    }
    dashBoardDatacall();
  }, [selectedDate]);

  // wallet active fetch api
  useEffect(() => {
    async function WalletActive() {
      try {
        const res = await axios.post(
          "https://qa3.franchise.backend.shipgl.in/api/v1/wallet",
          {},
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          },
        );
        setWalletActive(res?.data?.data?.data);
      } catch (error) {
        console.error(error);
      }
    }
    WalletActive();
  }, [token]);

  return (
    <div className="py-20 w-full h-full px-5 bg-gray-100 overflow-scroll">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-medium">Dashboard</p>
        <div className="w-50">
          <DropDownComboBox
            valueKey="dates"
            labelKey="dates"
            list={DashBoardDate}
            placeholder="Select a date range"
            name="dashboardDate"
            form={dashBoardForm}
            label="Date Range"
            labelDisabled={false}
          />
        </div>
      </div>
      <div className="bg-white grid grid-cols-5 gap-x-5 mt-2 py-5 px-3 rounded">
        {dashCard.map((items: any, index: number) => (
          <div
            className={`py-3 flex flex-col gap-y-2 items-center justify-center bg-linear-to-b ${items.colorClass} border  to-white rounded cursor-pointer`}
            key={index}
          >
            <p
              className={`${items.Iconcolor} px-2 py-2 rounded text-white text-2xl`}
            >
              <LuBoxes />
            </p>
            <p className="text-sm">{items.name}</p>
            <p className="text-3xl font-medium  ">{items.orders}</p>
            <p className="text-sm font-medium">View</p>
          </div>
        ))}
      </div>
      <div className="flex flex-row items-start justify-between mt-5 gap-x-3 *:px-5">
        <div className="bg-white w-2/3 py-5 rounded-lg">
          <p className="font-semibold pb-4 ">Action Required</p>
          <div className="grid grid-cols-3 gap-x-10 gap-y-4">
            {actionCard.map((items, index) => (
              <div
                className="flex flex-col gap-y-3 border rounded-md py-5 ps-3"
                key={index}
              >
                <span className="flex items-center gap-x-3">
                  <p className={`text-2xl ${items.className} p-2 rounded`}>
                    {items.icon}
                  </p>
                  <p className="text-2xl">{items.number}</p>
                </span>
                <p className="text-gray-400 text-sm">{items.name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/3 bg-white rounded-lg py-5 h-80 overflow-scroll">
          <p className="my-3 font-semibold text-gray-800">Wallet Activity</p>
          <div className="flex flex-col gap-y-3">
            {walletCard.map((items: any, index: number) => (
              <div
                className="border rounded-lg px-4 py-3 flex flex-row"
                key={index}
              >
                <div className={`${items.className} border-s-6 py-3 *:px-2`}>
                  <p className="text-sm">{items.details}</p>
                  <p className="text-gray-400 font-semibold">
                    {items.time_date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
