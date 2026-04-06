// import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import SearchCustomer from "@/components/SearchCustomer";
import PersonalDeatails from "@/components/PersonalDeatails";
import { useEffect, useState } from "react";
import ShipmentInfo from "@/components/ShipmentInfo";
import ShippingPartner from "@/components/ShippingPartner";
import { addOrderDetails } from "@/Redux/HomeData.ts/AddOder";
import { useSelector, useDispatch } from "react-redux";

const Csbform = () => {
  const [steper, setSteper] = useState<number>(1);
  const [alldata, setAllData] = useState<any>({});
  const dispatch = useDispatch();
  const addOrderDetail = useSelector((state: any) => state.addoder.SingleOrder);
  console.log(addOrderDetail);

  useEffect(() => {
    try {
      dispatch(addOrderDetails(alldata));
    } catch (error) {
      console.error(error);
    }
  }, [alldata]);


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
        />
        <ShippingPartner
          steper={steper}
          setSteper={setSteper}
          alldata={alldata}
          setAllData={setAllData}
        />
      </div>
    </div>
  );
};

export default Csbform;
