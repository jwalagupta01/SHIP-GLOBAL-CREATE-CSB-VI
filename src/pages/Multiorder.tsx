import PersonalDeatails from "@/components/PersonalDeatails";
import SearchCustomer from "@/components/SearchCustomer";
import ShipmentInfo from "@/components/ShipmentInfo";
import { useState } from "react";
import { MdArrowForwardIos } from "react-icons/md";

export function Multiorder() {
  const [alldata, setAllData] = useState<object>({});
  const [steper, setSteper] = useState<number>(3);
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
      />
    </div>
  );
}
