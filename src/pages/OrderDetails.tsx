import { OrderDetailsProductDetails } from "@/components/Element/orderDetailsProductTable";
import { PrimaryBtn } from "@/components/Element/PrimaryBtn";
import ViewOrderDetails from "@/components/Element/ViewOrderDetails";
import { LuChevronRight } from "react-icons/lu";
import { TbReceiptRupeeFilled } from "react-icons/tb";
import { BsCheckCircleFill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

export function OrderDetails() {
  const token = useSelector((state: any) => state.auth.token);
  const [orderMsg, setOrderMsg] = useState<boolean>(false);
  const { OrderId } = useParams();
  const [orderDetails, setOrderDetails] = useState<any>({
    items: [],
    order_total: [],
  });
  const orderSteps = [
    { label: "Order Created", completed: true },
    { label: "Pickup Scheduled", completed: true },
    { label: "Received at Hub", completed: false },
    { label: "Flight Channel", completed: false },
    { label: "Shipment in Transit", completed: false },
    { label: "Last Mile", completed: false },
    { label: "Closed", completed: false },
  ];

  useEffect(() => {
    async function fetchOrderdetails() {
      try {
        const res = await axios.post(
          "https://qa3.franchise.backend.shipgl.in/api/v1/orders/get-order-details",
          { order_id: OrderId },
          { headers: { Authorization: `Bearer ${token}` } },
        );
        // console.log(res?.data?.data);
        setOrderDetails(res?.data?.data);
      } catch (error) {
        console.error(error);
        setOrderMsg(true);
      }
    }
    fetchOrderdetails();
  }, [OrderId]);

  return (
    <>
      {orderMsg ? (
        <p className="w-full h-full flex items-center justify-center text-2xl font-semibold">
          Enter Correct Order Number
        </p>
      ) : (
        <div className="flex flex-col pt-20 px-5 w-full h-full overflow-scroll bg-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-700 text-lg">
                View Order : SG32604095240307
              </p>
              <span className="flex items-center text-xs">
                <p className="cursor-pointer text-gray-500">Orders</p>
                <p className="text-gray-500">
                  <LuChevronRight />
                </p>
                <p>View</p>
              </span>
            </div>
            <div>
              <PrimaryBtn
                variant="default"
                text="Cancel Order"
                className="px-6 py-5 border border-blue-800 bg-transparent text-blue-800 hover:bg-blue-800 hover:text-white"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-x-3 ">
            <div className="w-2/3 flex flex-col gap-y-8">
              <ViewOrderDetails orderDetails={orderDetails} />
              <div className="bg-white py-8 px-4 rounded-lg flex flex-col gap-y-4">
                <div className="flex items-center gap-x-2">
                  <p className="text-red-500 p-2 rounded-full border-3 border-gray-300 bg-red-200 ">
                    <TbReceiptRupeeFilled />
                  </p>
                  <p>Billed Details</p>
                </div>
                <OrderDetailsProductDetails
                  orderDetails={orderDetails}
                  currency={orderDetails.currency_code}
                />
              </div>
            </div>
            <div className="w-1/3 flex flex-col gap-y-5">
              <div className="bg-orange-400/15 pt-4 rounded-lg flex flex-col gap-y-3">
                <p className="px-3 text-orange-400/70 font-semibold">Summary</p>
                <hr className="border border-orange-400/20" />
                <div>
                  {orderDetails?.order_total?.map(
                    (item: any, index: number) => (
                      <div
                        className="flex items-center justify-between px-4 pb-3"
                        key={index}
                      >
                        <span className="pt-2">
                          <p>{item.title}</p>
                        </span>
                        <span>
                          <p className="pt-2">
                            {item.value.toString().includes("Rs")
                              ? item.value
                              : `Rs. ${item.value}`}
                          </p>
                        </span>
                      </div>
                    ),
                  )}
                  <div className="flex items-center justify-between *:font-semibold bg-orange-400/30 px-4 py-3 rounded-b-lg">
                    <p>Total</p>
                    <p>Rs. {orderDetails.total}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white *:font-semibold rounded-lg px-4 py-6 flex flex-col gap-y-3">
                <p className="">Activity</p>
                <div>
                  {orderSteps?.map((step, index) => (
                    <div key={index}>
                      <span className="flex gap-x-4 items-center text-gray-500">
                        <p
                          className={`border rounded-full p-1 ${
                            step.completed
                              ? "border-green-500 text-green-500"
                              : "border-gray-300 text-gray-300"
                          }`}
                        >
                          <BsCheckCircleFill />
                        </p>

                        <p>{step.label}</p>
                      </span>
                      {index !== orderSteps.length - 1 && (
                        <div
                          className={`border-l-2 border-dotted h-10 ms-3 ${
                            step.completed
                              ? "border-green-500"
                              : "border-gray-300"
                          }`}
                        ></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
