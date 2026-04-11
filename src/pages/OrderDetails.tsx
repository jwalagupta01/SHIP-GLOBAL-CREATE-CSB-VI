import { OrderDetailsProductDetails } from "@/components/Element/orderdetailsProducttable";
import { PrimaryBtn } from "@/components/Element/PrimaryBtn";
import ViewOrderDetails from "@/components/Element/ViewOrderDetails";
import { LuChevronRight } from "react-icons/lu";
import { orderDetails } from "@/mock/OrderDetails";
import { TbReceiptRupeeFilled } from "react-icons/tb";
import { BsCheckCircleFill } from "react-icons/bs";

export function OrderDetails() {
  const productDetails = orderDetails.items;

  return (
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
          <ViewOrderDetails />
          <div className="bg-white py-8 px-4 rounded-lg flex flex-col gap-y-4">
            <div className="flex items-center gap-x-2">
              <p className="text-red-500 p-2 rounded-full border-3 border-gray-300 bg-red-200 ">
                <TbReceiptRupeeFilled />
              </p>
              <p>Billed Details</p>
            </div>
            <OrderDetailsProductDetails
              productDetails={productDetails}
              currency={orderDetails.currency_code}
            />
          </div>
        </div>
        <div className="w-1/3 flex flex-col gap-y-5">
          <div className="bg-orange-400/15 pt-4 rounded-lg flex flex-col gap-y-3">
            <p className="px-3 text-orange-400/70 font-semibold">Summary</p>
            <hr className="border border-orange-400/20" />
            <div className="flex items-center justify-between px-4">
              <span className="flex flex-col gap-y-3">
                <p>Logistic Fee</p>
                <p>Global Disruption Adjustment</p>
                <p>GST</p>
              </span>
              <span className="flex flex-col gap-y-3">
                <p>Rs. 1956.00</p>
                <p>Rs. 150.00</p>
                <p>Rs. 379.08</p>
              </span>
            </div>
            <div className="flex items-center justify-between *:font-semibold bg-orange-400/30 px-4 py-3 rounded-b-lg">
              <p>Total</p>
              <p>Rs. 2485.08</p>
            </div>
          </div>
          <div className="bg-white *:font-semibold rounded-lg px-4 py-6 flex flex-col gap-y-3">
            <p className="">Activity</p>
            <div>
              <span className="flex gap-x-4 items-center text-gray-500">
                <p className="border rounded-full p-1 border-green-400 text-green-400">
                  <BsCheckCircleFill />
                </p>
                <p>Order Created</p>
              </span>
              <div className="border-l-2 border-dotted border-green-500 h-10 ms-3"></div>
              <span className="flex gap-x-4 items-center text-gray-500">
                <p className="border rounded-full p-1 border-green-500 text-green-500">
                  <BsCheckCircleFill />
                </p>
                <p>Pickup Scheduled</p>
              </span>
              <div className="border-l-2 border-dotted h-10 ms-3 border-green-500"></div>
              <span className="flex gap-x-4 items-center text-gray-500">
                <p className="border rounded-full p-1">
                  <BsCheckCircleFill />
                </p>
                <p>Received at Hub</p>
              </span>
              <div className="border-l-2 border-dotted h-10 ms-3"></div>
              <span className="flex gap-x-4 items-center text-gray-500">
                <p className="border rounded-full p-1">
                  <BsCheckCircleFill />
                </p>
                <p>Flight Channel</p>
              </span>
              <div className="border-l-2 border-dotted h-10 ms-3"></div>
              <span className="flex gap-x-4 items-center text-gray-500">
                <p className="border rounded-full p-1">
                  <BsCheckCircleFill />
                </p>
                <p>Shipment in Transit</p>
              </span>
              <div className="border-l-2 border-dotted h-10 ms-3"></div>
              <span className="flex gap-x-4 items-center text-gray-500">
                <p className="border rounded-full p-1">
                  <BsCheckCircleFill />
                </p>
                <p>Last Mile</p>
              </span>
              <div className="border-l-2 border-dotted h-10 ms-3"></div>
              <span className="flex gap-x-4 items-center text-gray-500">
                <p className="border rounded-full p-1">
                  <BsCheckCircleFill />
                </p>
                <p>Closed</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
