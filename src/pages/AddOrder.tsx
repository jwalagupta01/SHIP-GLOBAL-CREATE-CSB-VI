// import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import SearchCustomer from "@/components/SearchCustomer";
import PersonalDeatails from "@/components/PersonalDeatails";
import { useEffect, useState } from "react";
import ShipmentInfo from "@/components/ShipmentInfo";
import ShippingPartner from "@/components/ShippingPartner";
import { addOrderDetails } from "@/Redux/HomeData.ts/AddOder";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import MesureSideDetails from "@/components/Element/MesureSideDetails";

const Csbform = () => {
  const [steper, setSteper] = useState<number>(1);
  const [alldata, setAllData] = useState<any>({});
  const dispatch = useDispatch();
  const addOrderDetail = useSelector((state: any) => state.addoder.SingleOrder);
  const token = useSelector((state: any) => state.auth.token);
  const [shiperRates, setShiperRates] = useState<any>({});

  console.log(alldata);
  async function getShiperRates(data: any) {
    if (!data?.ShipmentData) return;
    try {
      const singleVendorItems = data?.ShipmentData?.products?.map(
        (item: any, index: number) => ({
          vendor_order_item_id: `id-${Date.now()}-${index}`,
          vendor_order_item_name: item.item_name,
          vendor_order_item_sku: item.item_sku,
          vendor_order_item_quantity: item.item_qty,
          vendor_order_item_unit_price: item.item_unit_price,
          vendor_order_item_hsn: String(item.item_hsn),
          vendor_order_item_tax_rate: String(item.item_igst).replace("%", ""),
        }),
      );

      const singleOrderPayLoad = {
        customer_shipping_postcode: data?.personalData?.pinCode,
        customer_shipping_country_code: data?.personalData?.country,
        package_weight: data?.ShipmentData?.dead_weight,
        package_length: data?.ShipmentData?.pro_length,
        package_breadth: data?.ShipmentData?.pro_breadth,
        package_height: data?.ShipmentData?.pro_height,
        csbv: 0,
        vendor_order_item: singleVendorItems,
        currency_code: data?.ShipmentData?.invoice_currency,
        state_id: data?.personalData?.state,
      };

      console.log("payload →", singleOrderPayLoad);

      let res = await axios.post(
        "https://qa3.franchise.backend.shipgl.in/api/v1/orders/get-shipper-rates",
        singleOrderPayLoad,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setShiperRates(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    try {
      dispatch(addOrderDetails(alldata));
    } catch (error) {
      console.error(error);
    }
  }, [alldata]);

  console.log(addOrderDetail);

  return (
    <div className="border w-full h-full px-5 pb-1 bg-gray-100 pt-15">
      <div className="h-[6%]">
        <p className="text-xl font-semibold">Create CSB-IV Order</p>
        <div className="flex items-center gap-x-2 *:text-xs">
          <p className="text-gray-500 cursor-pointer">Orders</p>
          <p>
            <IoIosArrowForward />
          </p>
          <p>Create CSB-IV Order</p>
        </div>
      </div>
      <div className="h-[92%] flex flex-row gap-x-3">
        <div className="mt-4 flex flex-col gap-y-3 overflow-scroll h-full w-2/3">
          <SearchCustomer
            steper={steper}
            setSteper={setSteper}
            alldata={alldata}
            setAllData={setAllData}
          />
          <PersonalDeatails
            alldata={alldata}
            setAllData={setAllData}
            steper={steper}
            setSteper={setSteper}
          />
          <ShipmentInfo
            steper={steper}
            setSteper={setSteper}
            alldata={alldata}
            setAllData={setAllData}
            Multiorder={false}
            getShiiperRates={getShiperRates}
          />
          <ShippingPartner
            steper={steper}
            setSteper={setSteper}
            alldata={alldata}
            setAllData={setAllData}
            shiperRates={shiperRates}
          />
        </div>
        <div className="w-1/3">
          <div>
            <MesureSideDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Csbform;
