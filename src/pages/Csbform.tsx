// import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import SearchCustomer from "@/components/SearchCustomer";
import PersonalDeatails from "@/components/PersonalDeatails";
import { useEffect, useState } from "react";
import ShipmentInfo from "@/components/ShipmentInfo";
import ShippingPartner from "@/components/ShippingPartner";

const Csbform = () => {
  const [steper, setSteper] = useState<number>(3);
  const [alldata, setAllData] = useState<any>({});

  useEffect(() => {
    console.log(alldata);
  }, [alldata]);

  return (
    <div className="border w-full h-full ms-60 px-5 py-3 bg-gray-100">
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
