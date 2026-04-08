import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { PrimaryBtn } from "./Element/PrimaryBtn";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

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
  const token = useSelector((state: any) => state.auth.token);
  const [shiperRates, setShiperRates] = useState<any>({});
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

  useEffect(() => {
    if (!alldata.ShipmentData) return;
    if (!alldata?.ShipmentData?.products) return;
    const fetchState = async () => {
      const products = alldata.ShipmentData.products || [];
      console.log(products);

      const vendorItems = products.map((item: any, index: number) => ({
        vendor_order_item_id: `id-${Date.now()}-${index}`,
        vendor_order_item_name: item.item_name,
        vendor_order_item_sku: item.item_sku,
        vendor_order_item_quantity: item.item_qty,
        vendor_order_item_unit_price: item.item_unit_price,
        vendor_order_item_hsn: item.item_hsn,
        vendor_order_item_tax_rate: item.item_igst,
      }));

      try {
        const res = await axios.post(
          "https://qa2.franchise.backend.shipgl.in/api/v1/orders/get-shipper-rates",
          {
            customer_shipping_postcode: alldata?.personalData?.pinCode,
            customer_shipping_country_code: alldata?.personalData?.country,
            package_weight: alldata?.ShipmentData?.dead_weight,
            package_length: alldata?.ShipmentData?.pro_length,
            package_breadth: alldata?.ShipmentData?.pro_breadth,
            package_height: alldata?.ShipmentData?.pro_height,
            csbv: 0,
            vendor_order_item: vendorItems,
            currency_code: alldata?.personalData?.country,
            state_id: alldata?.personalData?.state,
          },
          {
            headers: {
              Authorization: `bearer ${token}`,
            },
          },
        );
        console.log(res?.data?.data);
        setShiperRates(res?.data?.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchState();
  }, [alldata, token]);

  console.log(shiperRates);

  return (
    <div className="border border-gray-400 rounded w-full h-auto *:px-4 mb-5">
      <div className="flex items-center justify-between h-13 border-b border-gray-400 bg-blue-50">
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
            <p className="font-bold my-5">
              Showing {shiperRates.length} Results
            </p>
            <div className="border border-gray-400 rounded flex justify-between items-center px-8 py-3 bg-gray-100">
              <p>Courier Partner</p>
              <p>Delivery Time</p>
              <p>Shipment Rate</p>
              <p>Select</p>
            </div>
            {shiperRates?.rate?.map((items: any, index: number) => (
              <div
                className="border border-gray-400 my-4 rounded cursor-pointer"
                key={index}
              >
                <p className="bg-blue-200/50 text-red-500 px-5 text-sm">
                  Duties will be charged, if applicable.
                </p>
                <div className="flex justify-between items-center px-8 py-5">
                  <p className="w-20 h-10">{items.display_name}</p>
                  <p>{items.transit_time}</p>
                  <p>Rs. {items.rate}</p>
                  <p>
                    <IoIosCheckmarkCircle />
                  </p>
                </div>
              </div>
            ))}
            <div className="flex justify-end items-end pb-5">
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
