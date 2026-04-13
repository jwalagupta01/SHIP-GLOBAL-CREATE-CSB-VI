import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { PrimaryBtn } from "./Element/PrimaryBtn";
import { Calculator } from "lucide-react";

interface geetingsProps {
  alldata: any;
  setAllData: any;
  steper: number;
  setSteper: any;
  multiOrder?: boolean;
  shiperRates: any;
  calculator?: boolean;
}

function ShippingPartner({
  alldata,
  setAllData,
  steper,
  setSteper,
  multiOrder,
  shiperRates,
}: geetingsProps) {
  const shippingPartnerData = useForm({
    mode: "onChange",
  });

  function shippingPartDataSubmit(data: any): void {
    try {
      console.log(data);
      setAllData((prev: any) => ({ ...prev, shippingPartner: data }));
      setSteper(4);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="border border-gray-400 rounded w-full h-auto mb-5">
      {!Calculator && (
        <div className="flex items-center justify-between h-13 border-b border-gray-400 bg-blue-50 px-4">
          <div className="flex items-center gap-x-2">
            {Object.keys(alldata?.shippingPartner || {}).length > 0 ? (
              <p className="bg-green-600 px-1 py-1 rounded text-white">
                <FaCheck />
              </p>
            ) : (
              <p
                className={`px-2 rounded ${steper !== 4 ? "bg-gray-300 text-black" : "bg-black text-white"}`}
              >
                4
              </p>
            )}
            <p className="font-semibold text-lg">Select Shipping Partner</p>
          </div>
        </div>
      )}
      {steper == 4 && (
        <form
          action=""
          onSubmit={shippingPartnerData.handleSubmit(shippingPartDataSubmit)}
        >
          <div className="bg-white">
            {!multiOrder && (
              <div className="flex items-center justify-center gap-x-5 py-10">
                <div className="flex flex-col border w-auto px-5 py-2 items-center rounded-lg bg-gray-100/50">
                  <p className="font-semibold text-gray-600">
                    {shiperRates?.package_weight / 1000} KG
                  </p>
                  <p className="text-xs text-gray-600">Dead Weight</p>
                </div>
                <div className="flex flex-col border w-auto px-5 py-2 items-center rounded-lg bg-gray-100/50">
                  <p className="font-semibold text-gray-600">
                    {shiperRates?.volume_weight / 1000} KG
                  </p>
                  <p className="text-xs text-gray-600">Volumetric Weight</p>
                </div>
                <div className="flex flex-col border border-orange-400 text-orange-400 w-auto px-5 py-2 items-center rounded-lg bg-orange-400/20">
                  <p className="font-semibold">
                    {shiperRates?.bill_weight / 1000} KG
                  </p>
                  <p className="text-xs">Billed Weight</p>
                </div>
              </div>
            )}
            <p className="font-bold my-5 px-4">
              Showing {shiperRates?.length} Results
            </p>
            <div className="border border-gray-400 rounded flex justify-between items-center px-8 mx-4 py-3 bg-gray-100">
              <p className="w-[25%]">Courier Partner</p>
              <p>Delivery Time</p>
              <p>Shipment Rate</p>
              {!Calculator && <p>Select</p>}
            </div>
            {shiperRates?.rate?.map((items: any, index: number) => (
              <div
                className="border border-gray-400 my-4 rounded cursor-pointer mx-4 shadow-xl hover:shadow-xl/30 hover:scale-101 transition-all duration-500 ease-in-out"
                key={index}
              >
                <p className="bg-blue-200/50 text-red-500 px-5 text-sm">
                  Duties will be charged, if applicable.
                </p>
                <div className="flex justify-between items-center px-8 py-5 ">
                  <p className="w-[25%]">{items.display_name}</p>
                  <p>{items.transit_time}</p>
                  <p>Rs. {items.rate}</p>
                  {!Calculator && (
                    <span className="text-2xl">
                      <IoIosCheckmarkCircle />
                    </span>
                  )}
                </div>
              </div>
            ))}
            {!Calculator && (
              <div className="flex justify-end items-end pb-5 mx-4">
                <PrimaryBtn
                  text="Pay And Order"
                  variant="default"
                  className="bg-blue-800 hover:bg-blue-600 px-6 py-5"
                />
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
}

export default ShippingPartner;
