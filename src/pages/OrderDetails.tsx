import { OrderDetailsProductDetails } from "@/components/Element/orderdetailsProducttable";
import { PrimaryBtn } from "@/components/Element/PrimaryBtn";
import ViewOrderDetails from "@/components/Element/ViewOrderDetails";
import { LuChevronRight } from "react-icons/lu";
import { orderDetails } from "@/mock/OrderDetails";
import { TbReceiptRupeeFilled } from "react-icons/tb";

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
      <div className="mt-4">
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
        <div className="w-1/3">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
