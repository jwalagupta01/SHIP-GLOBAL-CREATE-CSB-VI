import {
  SHIPMENT_DETAILS,
  SHIPMENT_SIZE,
  SHIPMENT_PRODUCT,
} from "@/mock/arrayshipmentdetails";
import { DropDownComboBox } from "./Element/DropDownComboBox";
import { PrimaryDate } from "./Element/Primarydate";
import { PrimaryInput, SecondryInput } from "./Element/primaryInput";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaPlus } from "react-icons/fa6";
import { ShipmentinfoSchema } from "@/Schema/CsbIVSchemaZod";
import { PrimaryBtn } from "./Element/PrimaryBtn";
import { FaCheck, FaTrash } from "react-icons/fa";

interface geetingsProps {
  steper: number;
  setSteper: any;
  alldata: any;
  setAllData: any;
}

const ShipmentInfo = ({
  steper,
  setSteper,
  alldata,
  setAllData,
}: geetingsProps) => {
  const ShipmentData = useForm({
    mode: "onChange",
    resolver: zodResolver(ShipmentinfoSchema),
    defaultValues: {
      invoice_currency: "INR",
      products: [
        {
          item_name: "",
          item_sku: "",
          item_hsn: "",
          item_qty: "",
          item_unit_price: "",
          item_igst: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: ShipmentData.control,
    name: "products",
  });

  const currency = [
    "INR",
    "USD",
    "EUR",
    "GBP",
    "CAD",
    "AUD",
    "AED",
    "SAR",
    "SGD",
  ].map((currency: string) => ({ currency }));

  const IGST = ["0%", "0.25%", "3%", "5%", "12%", "18%", "28%"].map(
    (percentage: string) => ({ percentage }),
  );

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const formOnSubmit = (data: any): void => {
    try {
      setAllData((prev: any) => ({ ...prev, ShipmentData: data }));
      setSteper(4);
    } catch (error) {
      console.error(error);
    }
  };

  function change_click() {
    try {
      setAllData((prev: any) => {
        const update = { ...prev };
        delete update.ShipmentData;
        return update;
      });
      setSteper(3);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="border border-gray-400 *:px-4 rounded">
      <div className="h-13 flex items-center justify-between border-b border-gray-400">
        <div className="flex items-center gap-x-2">
          {Object.keys(alldata?.ShipmentData || {}).length > 0 ? (
            <p className="bg-green-600 px-1 py-1 rounded text-white">
              <FaCheck />
            </p>
          ) : (
            <p
              className={`px-2 rounded ${steper !== 3 ? "bg-gray-300 text-black" : "bg-black text-white"}`}
            >
              3
            </p>
          )}
          <p className="font-semibold">Shipment Information</p>
        </div>
        {Object.keys(alldata?.ShipmentData || {}).length > 0 && (
          <p
            className="text-blue-700 underline font-semibold"
            onClick={change_click}
          >
            Change
          </p>
        )}
      </div>
      {steper == 3 ? (
        <form
          action=""
          onSubmit={ShipmentData.handleSubmit(formOnSubmit)}
          className="bg-white"
        >
          <div className="grid grid-cols-3 gap-x-2 py-3 gap-y-2">
            <PrimaryDate
              label="Invoice Date"
              name="invoice_date"
              minDate={todayDate}
              maxDate={todayDate}
              form={ShipmentData}
            />
            <DropDownComboBox
              valueKey="currency"
              labelKey="currency"
              label="Select Currency"
              list={currency}
              placeholder="Select Currency"
              name="invoice_currency"
              form={ShipmentData}
            />
            {SHIPMENT_DETAILS.map((items: any, index: number) => (
              <PrimaryInput
                placeholder={items.placeholder}
                label={items.label}
                type={items.type}
                name={items.name}
                form={ShipmentData}
                key={index}
                isRequired={items.isRequired}
              />
            ))}
          </div>
          <p className="font-semibold">Box Measurements</p>
          <div className="gap-x-2 grid grid-cols-4 my-3">
            {SHIPMENT_SIZE.map((items: any, index: number) => (
              <SecondryInput
                placeholder={items.placeholder}
                stxt={items.stxt}
                label={items.label}
                key={index}
                form={ShipmentData}
                name={items.name}
              />
            ))}
          </div>
          <div className="flex items-center gap-x-3">
            <p>Item(s) Details</p>
            <a
              href="https://shipglobal.in/blogs/prohibited-item-and-restricted-goods-for-international-shipping/"
              className="text-xs text-red-600 bg-red-200/50 px-3 rounded"
              target="_blank"
            >
              Items that can export
            </a>
          </div>
          {fields.map((field, index) => (
            <div key={field.id} className="relative">
              <div className="grid grid-cols-7 gap-x-3 mt-3 items-center">
                {SHIPMENT_PRODUCT.map((items: any, idx: number) => (
                  <PrimaryInput
                    placeholder={items.placeholder}
                    label={items.label}
                    type={items.type}
                    name={`products.${index}.${items.name}`}
                    form={ShipmentData}
                    isRequired={items.isRequired}
                    key={idx}
                  />
                ))}
                <DropDownComboBox
                  valueKey="percentage"
                  labelKey="percentage"
                  label="Select IGST"
                  list={IGST}
                  placeholder="Select IGST"
                  name={`products.${index}.item_igst`}
                  form={ShipmentData}
                />
                {index > 0 && (
                  <div className="flex items-center justify-center">
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="mt-4 cursor-pointer text-red-500 hover:text-blue-600 text-2xl"
                    >
                      <FaTrash />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div className="my-3 flex justify-between px-5">
            <p
              className="flex items-center gap-x-1 text-blue-600 font-semibold cursor-pointer"
              onClick={() =>
                append({
                  item_name: "",
                  item_sku: "",
                  item_hsn: "",
                  item_qty: "",
                  item_unit_price: "",
                  item_igst: "",
                })
              }
            >
              <FaPlus />
              <span>ADD ANOTHER PRODUCT</span>
            </p>
            <p className="font-bold text-xl">Total Price : INR 0.00</p>
          </div>
          <div className="flex justify-end my-5">
            <PrimaryBtn
              text="Continue"
              variant="default"
              className="bg-blue-800 hover:bg-blue-600 px-6 py-5"
            />
          </div>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default ShipmentInfo;
