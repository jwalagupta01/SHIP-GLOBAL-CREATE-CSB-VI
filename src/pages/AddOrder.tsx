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

const Csbform = () => {
  const [steper, setSteper] = useState<number>(1);
  const [alldata, setAllData] = useState<any>({});
  const dispatch = useDispatch();
  const addOrderDetail = useSelector((state: any) => state.addoder.SingleOrder);
  const token = useSelector((state: any) => state.auth.token);
  const [shiperRates, setShiperRates] = useState<any>({});

  console.log(alldata);
  async function getShiperRates(data: any) {
    console.log(alldata);
    if (!data?.ShipmentData) return;
    try {
      if (!alldata?.ShipmentData?.Boxes) return;
      const singleVendorItems = alldata?.ShipmentData?.products?.map(
        (item: any, index: number) => ({
          vendor_order_item_id: `id-${Date.now()}-${index}`,
          vendor_order_item_name: item.item_name,
          vendor_order_item_sku: item.item_sku,
          vendor_order_item_quantity: item.item_qty,
          vendor_order_item_unit_price: item.item_unit_price,
          vendor_order_item_hsn: item.item_hsn,
          vendor_order_item_tax_rate: item.item_igst,
        }),
      );

      const singleOrderPayLoad = {
        customer_shipping_postcode: alldata?.personalData?.pinCode,
        customer_shipping_country_code: alldata?.personalData?.country,
        package_weight: alldata?.ShipmentData?.dead_weight,
        package_length: alldata?.ShipmentData?.pro_length,
        package_breadth: alldata?.ShipmentData?.pro_breadth,
        package_height: alldata?.ShipmentData?.pro_height,
        csbv: 0,
        vendor_order_item: singleVendorItems,
        currency_code: alldata?.personalData?.country,
        state_id: alldata?.personalData?.state,
      };

      let res = await axios.post(
        "https://qa2.franchise.backend.shipgl.in/api/v1/multibox-orders/get-shipper",
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
    <div className="border w-full h-full px-5 py-3 bg-gray-100 overflow-scroll pt-15">
      <div className="">
        <p className="text-3xl font-semibold">Create CSB-IV Order</p>
        <div className="flex items-center gap-x-2 *:text-lg">
          <p>Orders</p>
          <p>
            <IoIosArrowForward />
          </p>
          <p>Create CSB-IV Order</p>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-y-3">
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
    </div>
  );
};

export default Csbform;
