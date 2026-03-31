import { PrimaryBtn } from "./Element/PrimaryBtn";
import { customers } from "@/mock/user";
import { UserComboBox } from "./Element/PrimaryComboBox";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

interface geetingsProps {
  consignee: boolean;
  setConsignor: any;
  setConsignee: any;
  setAllData: any;
}

const SearchCustomer = ({
  consignee,
  setConsignor,
  setConsignee,
  setAllData,
}: geetingsProps) => {
  const [formSubmit, setFormSubmit] = useState<boolean>(false);

  const SearchCustomerSchema = z.object({
    userId: z
      .object({
        first_name: z.string(),
        last_name: z.string(),
        phone: z.string(),
        address: z.string(),
        document: z.string(),
      })
      .nullable()
      .refine((val) => val !== null, { message: "Please Select Customer" }),
  });

  const SearchCustomer = useForm({
    mode: "onChange",
    resolver: zodResolver(SearchCustomerSchema),
    defaultValues: {
      userId: null,
    },
  });

  const watchValue = SearchCustomer.watch();

  function onHandleSubmit(data: any): void {
    try {
      setConsignor(true);
      setConsignee(false);
      setFormSubmit(true);
      setAllData((prev: any) => ({ ...prev, userDetails: data }));
    } catch (error) {
      console.error(error);
    }
  }

  function userChange() {
    setConsignor(false);
    setConsignee(true);
    setFormSubmit(false);
  }

  return (
    <div className="border border-gray-400 rounded w-full h-auto *:px-4">
      <div className="flex items-center justify-between h-13 border-b border-gray-400">
        <div className="flex items-center gap-x-2">
          {!formSubmit ? (
            <p
              className={`px-2 rounded ${!consignee ? "bg-gray-300 text-black" : "bg-black text-white"}`}
            >
              1
            </p>
          ) : (
            <p className="bg-green-600 px-1 py-1 rounded text-white">
              <FaCheck />
            </p>
          )}
          <p className="font-semibold text-lg">Consignor Details</p>
        </div>
        {!consignee && (
          <p
            className="font-semibold text-blue-600 cursor-pointer hover:underline"
            onClick={userChange}
          >
            Change
          </p>
        )}
      </div>
      {consignee && (
        <form
          action=""
          onSubmit={SearchCustomer.handleSubmit(onHandleSubmit)}
          className="flex flex-col bg-white"
        >
          <div className="w-3/4 mt-2">
            <UserComboBox
              id="userSelect"
              name="userId"
              list={customers}
              label="Search Customer"
              placeholder="Select Customer"
              form={SearchCustomer}
            />
          </div>
          <div className="flex justify-end h-30 py-3">
            {watchValue.userId && (
              <div className="flex items-center justify-between w-3/4 px-10 py-5 *:text-sm">
                <div className="w-70">
                  <p className="font-semibold">
                    {watchValue.userId.first_name} {watchValue.userId.last_name}
                  </p>
                  <p className="text-gray-800">
                    {Math.floor(Math.random() * (9999 - 1000 + 1))}
                    {watchValue.userId.first_name}@gmail.com
                  </p>
                  <p className="text-gray-800">{watchValue.userId.phone}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-semibold">Address</p>
                  <p>{watchValue.userId.address}</p>
                </div>
                <div>
                  <p className="text-gray-400 font-semibold">Document Type</p>
                  <p>{watchValue.userId.document}</p>
                </div>
              </div>
            )}
            <div className="flex justify-end items-end w-1/4">
              <PrimaryBtn
                text="Continue"
                variant="default"
                className="bg-blue-800 hover:bg-blue-600 px-6 py-5"
              />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default SearchCustomer;
