import { SHIPMENT_PRODUCT, SHIPMENT_SIZE } from "@/mock/arrayshipmentdetails";
import { PrimaryInput, SecondryInput } from "./Element/primaryInput";
import { DropDownComboBox } from "./Element/DropDownComboBox";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useFieldArray } from "react-hook-form";
import { FaXmark } from "react-icons/fa6";

interface geetingsProps {
  ShipmentData: any;
  Multiorder: boolean;
  boxesNo: number;
  setShowMultiBoxProduct: any;
}

export function OrderItemsDetails({
  ShipmentData,
  Multiorder,
  boxesNo,
  setShowMultiBoxProduct,
}: geetingsProps) {
  const { fields, append, remove } = useFieldArray({
    control: ShipmentData.control,
    name: "products",
  });

  const IGST = ["0%", "0.25%", "3%", "5%", "12%", "18%", "28%"].map(
    (percentage: string) => ({ percentage }),
  );

  return (
    <div>
      {Multiorder && (
        <div className=" px-10 h-15 border-b flex justify-between items-center">
          <div className="flex items-center gap-x-3">
            <p className="font-bold text-lg">Box 1 of {boxesNo} Boxes</p>
            <a
              className="text-xs bg-orange-300/70 px-2 rounded"
              href="https://shipglobal.in/blogs/prohibited-item-and-restricted-goods-for-international-shipping/"
              target="_blank"
            >
              Restricted Items
            </a>
          </div>
          <span
            className="top-5 right-6 text-2xl cursor-pointer"
            onClick={() => {
              setShowMultiBoxProduct(false);
            }}
          >
            <FaXmark />
          </span>
        </div>
      )}

      {!Multiorder && <p className="font-semibold">Box Measurements</p>}
      <div className={`gap-x-2 grid grid-cols-4 my-3 ${Multiorder && "px-10"}`}>
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
      {!Multiorder && (
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
      )}
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
    </div>
  );
}
