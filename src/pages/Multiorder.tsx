import PersonalDeatails from "@/components/PersonalDeatails";
import SearchCustomer from "@/components/SearchCustomer";
import ShipmentInfo from "@/components/ShipmentInfo";
import ShippingPartner from "@/components/ShippingPartner";
import { addMultiOrderDetails } from "@/Redux/HomeData.ts/MultiOrder";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

export function Multiorder() {
  const [alldata, setAllData] = useState<any>({});
  const [steper, setSteper] = useState<number>(1);
  const dispatch = useDispatch();
  const [shiperRates, setShiperRates] = useState<any>({});
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    dispatch(addMultiOrderDetails(alldata));
  }, [alldata]);

  async function getShiiperRates(data: any) {
    if (!data?.ShipmentData) return;

    try {
      if (!data?.ShipmentData?.Boxes) return;
      console.log("this run");
      const MultiVendorBoxes = data?.ShipmentData?.Boxes?.map(
        (box: any, boxIndex: number) => ({
          package_weight: box.dead_weight,
          package_length: box.pro_length,
          package_breadth: box.pro_breadth,
          package_height: box.pro_height,
          box_number: boxIndex + 1,
          vendor_box_item: box?.products?.map((item: any) => ({
            vendor_order_item_name: item.item_name,
            vendor_order_item_sku: item.item_sku,
            vendor_order_item_hsn: item.item_hsn,
            vendor_order_item_quantity: item.item_qty,
            vendor_order_item_unit_price: item.item_unit_price,
            vendor_order_item_tax_rate: String(item.item_igst).replace("%", ""),
          })),
        }),
      );

      const MultiOrderPayLoad = {
        customer_shipping_country_code: data?.personalData?.country,
        customer_shipping_postcode: data?.personalData?.pinCode,
        total_boxes: data?.ShipmentData?.box_number,
        csbv: 0,
        currency_code: data?.ShipmentData?.invoice_currency,
        state_id: data?.personalData?.state,
        vendor_box: MultiVendorBoxes,
      };

      let res = await axios.post(
        "https://qa3.franchise.backend.shipgl.in/api/v1/multibox-orders/get-shipper",
        MultiOrderPayLoad,
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setShiperRates(res?.data?.data);
    } catch (error) {
      console.error(error);
    }
  }

  console.log(alldata);

  return (
    <div className="w-full h-full pt-20 flex flex-col px-5 gap-y-3 overflow-scroll bg-gray-50">
      <div className="flex flex-col">
        <p className="text-3xl font-medium">Create CSB-IV Order</p>
        <div className="flex *:text-sm items-center gap-x-2 mt-1">
          <p className="text-gray-500">Multibox</p>
          <p className="text-gray-500">
            <MdArrowForwardIos />
          </p>
          <p className="text-black font-semibold">Create CSB-IV Order</p>
        </div>
      </div>
      <SearchCustomer
        alldata={alldata}
        setAllData={setAllData}
        steper={steper}
        setSteper={setSteper}
      />
      <PersonalDeatails
        alldata={alldata}
        setAllData={setAllData}
        steper={steper}
        setSteper={setSteper}
      />
      <ShipmentInfo
        alldata={alldata}
        setAllData={setAllData}
        steper={steper}
        setSteper={setSteper}
        Multiorder={true}
        getShiiperRates={getShiiperRates}
      />
      <ShippingPartner
        alldata={alldata}
        setAllData={setAllData}
        steper={steper}
        setSteper={setSteper}
        multiOrder={true}
        shiperRates={shiperRates}
        // setShiperRates={setShiperRates}
      />
    </div>
  );
}
