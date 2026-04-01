// import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import SearchCustomer from "@/components/SearchCustomer";
import PersonalDeatails from "@/components/PersonalDeatails";
import { useState } from "react";
import ShipmentInfo from "@/components/ShipmentInfo";

const Csbform = () => {
  const [consignee, setConsignee] = useState<boolean>(true);
  const [consignor, setConsignor] = useState<boolean>(false);
  const [alldata, setAllData] = useState<any>([]);

  console.log(alldata);

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
          setConsignor={setConsignor}
          setConsignee={setConsignee}
          setAllData={setAllData}
          consignee={consignee}
        />
        <PersonalDeatails
          consignor={consignor}
          setConsignor={setConsignor}
          setAllData={setAllData}
          consignee={consignee}
        />
        <ShipmentInfo />
      </div>
    </div>
  );
};

export default Csbform;
