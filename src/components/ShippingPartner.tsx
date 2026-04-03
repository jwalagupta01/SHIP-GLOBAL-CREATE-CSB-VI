import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { PrimaryBtn } from "./Element/PrimaryBtn";
import { useEffect } from "react";
import axios from "axios";

interface geetingsProps {
  alldata: any;
  setAllData: any;
  steper: number;
  setSteper: any;
}

function ShippingPartner({
  alldata,
  setAllData,
  steper,
  setSteper,
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

//   useEffect(() => {
//     if (!alldata.ShipmentData) return;
//     const fetchState = async () => {
//       try {
//         const res = await axios.post(
//           "https://qa2.franchise.backend.shipgl.in/api/v1/orders/get-shipper-rates",
//           {
//             add_order: {
//               customer_shipping_postcode: "787878",
//               customer_shipping_country_code: "AL",
//               package_weight: 1,
//               package_length: 10,
//               package_breadth: 10,
//               package_height: 10,
//               csbv: 0,
//               vendor_order_item: [
//                 {
//                   vendor_order_item_id: "id-1775134775411-ud2bu04",
//                   vendor_order_item_name: "fvdfvf",
//                   vendor_order_item_sku: "",
//                   vendor_order_item_quantity: 1,
//                   vendor_order_item_unit_price: 7,
//                   vendor_order_item_hsn: "87654321",
//                   vendor_order_item_tax_rate: "0",
//                 },
//               ],
//               currency_code: "INR",
//               state_id: "607",
//             },
//           },
//         );
//         console.log(res);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchState();
//   }, [alldata]);

  return (
    <div className="border border-gray-400 rounded w-full h-auto *:px-4 mb-5">
      <div className="flex items-center justify-between h-13 border-b border-gray-400">
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
      {steper == 4 && (
        <form
          action=""
          onSubmit={shippingPartnerData.handleSubmit(shippingPartDataSubmit)}
        >
          <div className="bg-white">
            <div className="flex items-center justify-center gap-x-5 py-10">
              <div className="flex flex-col border w-auto px-5 py-2 items-center rounded-lg bg-gray-100/50">
                <p className="font-semibold text-gray-600">1 KG</p>
                <p className="text-xs text-gray-600">Dead Weight</p>
              </div>
              <div className="flex flex-col border w-auto px-5 py-2 items-center rounded-lg bg-gray-100/50">
                <p className="font-semibold text-gray-600">0.016 KG</p>
                <p className="text-xs text-gray-600">Volumetric Weight</p>
              </div>
              <div className="flex flex-col border w-auto px-5 py-2 items-center rounded-lg bg-gray-100/50">
                <p className="font-semibold text-gray-600">1 KG</p>
                <p className="text-xs text-gray-600">Billed Weight</p>
              </div>
            </div>
            <p className="font-bold my-5">Showing 3 Results</p>
            <div className="border border-gray-400 rounded flex justify-between items-center px-8 py-3 bg-gray-100">
              <p>Courier Partner</p>
              <p>Delivery Time</p>
              <p>Shipment Rate</p>
              <p>Select</p>
            </div>
            <div className="border border-gray-400 my-4 rounded">
              <p className="bg-blue-200/50 text-red-500 px-5 text-sm">
                Duties will be charged, if applicable.
              </p>
              <div className="flex justify-between items-center px-8 py-5">
                <p>Fedex</p>
                <p>4 - 7 Days</p>
                <p>Rs. 8,525</p>
                <p>
                  <IoIosCheckmarkCircle />
                </p>
              </div>
            </div>
            <div className="flex justify-end items-end mb-5">
              <PrimaryBtn
                text="Pay And Order"
                variant="default"
                className="bg-blue-800 hover:bg-blue-600 px-6 py-5"
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default ShippingPartner;
