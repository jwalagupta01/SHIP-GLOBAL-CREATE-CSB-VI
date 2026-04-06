import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DropDownComboBox } from "@/components/Element/DropDownComboBox";
import { useForm } from "react-hook-form";
import { LuBoxes } from "react-icons/lu";
import { TbBrandCodesandbox } from "react-icons/tb";

export function DashBoard() {
  const token = useSelector((state: any) => state.auth.token);
  const [dashboardData, setDashBoardData] = useState<any>({});
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
          "https://qa2.franchise.backend.shipgl.in/api/v1/dashboard",
          { payload },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setDashBoardData(res?.data?.data);
        console.log(res?.data?.data);
      } catch (error) {
        console.error(error);
      }
    }
    dashBoardDatacall();
  }, [selectedDate]);

  return (
    <div className="py-20 w-full h-full px-5 bg-gray-100">
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
      <div className="flex flex-row items-center justify-between mt-5">
        <div>sdfghjk</div>
        <div>ertyjk</div>
      </div>
    </div>
  );
}
