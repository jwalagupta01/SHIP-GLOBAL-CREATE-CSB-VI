import { SHIPMENT_DETAILS, SHIPMENT_SIZE } from "@/mock/arrayshipmentdetails";
import { DropDownComboBox } from "./Element/DropDownComboBox";
import { PrimaryDate } from "./Element/Primarydate";
import { PrimaryInput, SecondryInput } from "./Element/primaryInput";
import { useForm } from "react-hook-form";

const ShipmentInfo = () => {
  const ShipmentData = useForm();
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

  console.log(currency);

  return (
    <div className="border *:px-4 rounded">
      <div className="h-13 flex items-center justify-between border-b">
        <div className="flex items-center gap-x-2">
          <p className="bg-black px-2 text-white rounded">3</p>
          <p className="font-semibold">Shipment Information</p>
        </div>
        <p className="text-blue-700 underline font-semibold">Change</p>
      </div>
      <form action="" className="bg-white">
        <div className="grid grid-cols-3 *:w-70 py-3 gap-y-2">
          <PrimaryDate label="Invoice Currency" />
          <DropDownComboBox
            valueKey="currency"
            labelKey="currency"
            list={currency}
            placeholder="Select Currency"
          />
          {SHIPMENT_DETAILS.map((items: any, index: number) => (
            <PrimaryInput
              placeholder={items.placeholder}
              label={items.label}
              type={items.type}
              name="fghjkl"
              form={ShipmentData}
              key={index}
              isRequired={items.isRequired}
            />
          ))}
        </div>
        <p className="font-semibold">Box Measurements</p>
        <div className="*:w-70 grid grid-cols-4 my-3">
          {SHIPMENT_SIZE.map((items: any, index: number) => (
            <SecondryInput
              placeholder={items.placeholder}
              stxt={items.stxt}
              label={items.label}
              key={index}
            />
          ))}
        </div>
        <div className="flex items-center gap-x-3">
          <p>Item(s) Details</p>
          <p className="text-xs text-red-600 bg-red-200/50 px-3 rounded">Items that can export</p>
        </div>
      </form>
    </div>
  );
};

export default ShipmentInfo;
