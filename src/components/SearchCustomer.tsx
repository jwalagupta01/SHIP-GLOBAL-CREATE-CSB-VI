import { PrimaryBtn } from "./Element/PrimaryBtn";
import { customers } from "@/mock/user";
import { UserComboBox } from "./Element/PrimaryComboBox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaCheck } from "react-icons/fa6";
import { SearchCustomerSchema } from "@/Schema/CsbIVSchemaZod";

interface geetingsProps {
  alldata: any;
  setAllData: any;
  steper: number;
  setSteper: any;
}

const SearchCustomer = ({
  alldata,
  setAllData,
  steper,
  setSteper,
}: geetingsProps) => {
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
      setAllData((prev: any) => ({ ...prev, userDetails: data }));
      setSteper(2);
    } catch (error) {
      console.error(error);
    }
  }

  function userChange() {
    try {
      setAllData((prev: any) => {
        const update = { ...prev };
        delete update?.userDetails;

        return update;
      });
      setSteper(1);
      console.log(alldata);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="border border-gray-400 rounded w-full h-auto *:px-4">
      <div className="flex items-center justify-between h-13 border-b border-gray-400">
        <div className="flex items-center gap-x-2">
          {Object.keys(alldata?.userDetails || {}).length > 0 ? (
            <p className="bg-green-600 px-1 py-1 rounded text-white">
              <FaCheck />
            </p>
          ) : (
            <p
              className={`px-2 rounded ${steper !== 1 ? "bg-gray-300 text-black" : "bg-black text-white"}`}
            >
              1
            </p>
          )}
          <p className="font-semibold text-lg">Consignor Details</p>
        </div>
        {Object.keys(alldata?.userDetails || {}).length > 0 && (
          <p
            className="font-semibold text-blue-600 cursor-pointer hover:underline"
            onClick={userChange}
          >
            Change
          </p>
        )}
      </div>
      {steper == 1 && (
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
