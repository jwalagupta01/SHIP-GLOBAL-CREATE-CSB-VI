import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PrimaryBtn } from "./Element/PrimaryBtn";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaPlus, FaTrash } from "react-icons/fa";
import { PrimaryInput, SecondryInput } from "./Element/primaryInput";
import { SHIPMENT_PRODUCT, SHIPMENT_SIZE } from "@/mock/arrayshipmentdetails";
import { DropDownComboBox } from "./Element/DropDownComboBox";
import { useFieldArray } from "react-hook-form";

interface geetingsProps {
  ShipmentData: any;
  boxesNo: number;
  setShowMultiBoxProduct: any;
  boxIndex?: number;
}

export function MultiorderItemsDetails({
  ShipmentData,
  boxesNo,
  setShowMultiBoxProduct,
  boxIndex,
}: geetingsProps) {
  const fieldName = `Boxes.${boxIndex}.products`;

  const { fields, append, remove } = useFieldArray({
    control: ShipmentData.control,
    name: fieldName,
  });

  const IGST = ["0%", "0.25%", "3%", "5%", "12%", "18%", "28%"].map(
    (percentage: string) => ({ percentage }),
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open Dialog</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4/5 w-4/5">
        <DialogHeader>
          <DialogTitle>
            <div className="flex items-center gap-x-3 border-b pb-4">
              <p className="font-bold text-lg">
                Box {(boxIndex ?? 0) + 1} of {boxesNo} Boxes
              </p>
              <a
                className="text-xs bg-orange-300/70 px-2 rounded"
                href="https://shipglobal.in/blogs/prohibited-item-and-restricted-goods-for-international-shipping/"
                target="_blank"
              >
                Restricted Items
              </a>
            </div>
          </DialogTitle>
        </DialogHeader>
        <form>
          <div>
            <div className={`gap-x-2 grid grid-cols-4 my-3 px-10`}>
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
            {fields.map((field, index) => (
              <div key={field.id} className={`relative px-10`}>
                <div className="grid grid-cols-7 gap-x-3 mt-3 items-center">
                  {SHIPMENT_PRODUCT.map((items: any, idx: number) => (
                    <PrimaryInput
                      placeholder={items.placeholder}
                      label={items.label}
                      type={items.type}
                      name={`${fieldName}.${index}.${items.name}`}
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
                    name={`${fieldName}.${index}.item_igst`}
                    form={ShipmentData}
                    labelDisabled={true}
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
            <div className={`my-3 flex justify-between px-10`}>
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
            <div className="flex justify-between px-10">
              <div>
                <PrimaryBtn
                  type="button"
                  variant="default"
                  className="border border-blue-800 bg-neutral-50 px-6 py-5 text-blue-800"
                  text={
                    <>
                      <IoArrowBackOutline />
                      Previous
                    </>
                  }
                />
              </div>
              <div className="flex gap-x-3">
                <PrimaryBtn
                  type="button"
                  variant="default"
                  className="border border-blue-800 bg-neutral-50 px-6 py-5 text-blue-800"
                  text="Save & Close"
                />
                <PrimaryBtn
                  type="button"
                  variant="default"
                  className="bg-blue-800 hover:bg-blue-600 px-6 py-5"
                  text="Save & Next"
                />
              </div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
