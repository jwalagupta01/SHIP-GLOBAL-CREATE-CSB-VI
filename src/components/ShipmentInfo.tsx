import { SHIPMENT_DETAILS } from "@/mock/arrayshipmentdetails";
import { DropDownComboBox } from "./Element/DropDownComboBox";
import { PrimaryDate } from "./Element/Primarydate";
import { PrimaryInput } from "./Element/primaryInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaPlus } from "react-icons/fa6";
import { ShipmentinfoSchema } from "@/Schema/CsbIVSchemaZod";
import { FaCheck, FaRegCopy } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { MULTI_ORDER_SCHEMA } from "@/Schema/MultiOrderShema";
import { OrderItemsDetails } from "./itemsDetails";
import { MultiorderItemsDetails } from "./MultiOrderItemsDetails";
import { BiMoneyWithdraw } from "react-icons/bi";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { toast } from "react-toastify";
interface geetingsProps {
  steper: number;
  setSteper: any;
  alldata: any;
  setAllData: any;
  Multiorder: boolean;
}

const ShipmentInfo = ({
  steper,
  setSteper,
  alldata,
  setAllData,
  Multiorder,
}: geetingsProps) => {
  const [currency, setCurrency] = useState<string[]>([]);
  const [showMultiBoxProduct, setShowMultiBoxProduct] =
    useState<boolean>(false);
  const [currentBoxIndex, setCurrentBoxIndex] = useState<number>(0);
  const [boxesDetails, setBoxesDetails] = useState<any>([]);
  const [msgShow, setMsgShow] = useState<boolean>(false);
  const token = useSelector((state: any) => state.auth.token);
  const [expandedBox, setExpandedBox] = useState<number | "all" | null>(null);

  // react hook form (use Form)
  const ShipmentData = useForm({
    mode: "onChange",
    resolver: zodResolver(Multiorder ? MULTI_ORDER_SCHEMA : ShipmentinfoSchema),
    defaultValues: Multiorder
      ? {
          invoice_currency: "INR",
          box_number: 1,
          Boxes: [],
        }
      : {
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
  const box_number = Number(ShipmentData.watch("box_number") || 1);
  const watchValue = ShipmentData.watch();

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const isEqual = (boxesDetails || []).length === box_number;

  useEffect(() => {
    if (Multiorder) {
      ShipmentData.setValue("Boxes", boxesDetails, { shouldValidate: true });
    }
  }, [boxesDetails]);

  // form On Submit
  const formOnSubmit = (data: any): void => {
    try {
      if (Multiorder) {
        if (boxesDetails.length !== box_number) {
          setMsgShow(true);
          return;
        }

        const finalData = {
          ...data,
          Boxes: boxesDetails,
        };

        setAllData((prev: any) => ({
          ...prev,
          ShipmentData: finalData,
        }));

        setSteper(4);
      } else {
        setAllData((prev: any) => ({
          ...prev,
          ShipmentData: data,
        }));
        setSteper(4);
      }
    } catch (error) {
      console.error(error);
    }
  };
  // header change click
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

  // currency fetch
  useEffect(() => {
    async function FetchCurrency() {
      try {
        const res = await axios.get(
          "https://qa2.franchise.backend.shipgl.in/api/v1/currency/list",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setCurrency(res?.data?.data);
      } catch (error) {
        console.error(error);
      }
    }
    FetchCurrency();
  }, []);

  // Delete box
  const handelDeleteBox = (indexToDelete: number) => {
    setBoxesDetails((prev: any[]) =>
      prev.filter((_, index) => index !== indexToDelete),
    );
    toast.error(`Box ${indexToDelete + 1} Deleted`);
  };

  // copy Box
  const handelCopybtn = (indexToCopy: number) => {
    setBoxesDetails((prev: any[]) => {
      if (prev.length >= box_number) {
        setMsgShow(true);
        return prev;
      }
      const copiedBox = { ...prev[indexToCopy] };
      const updated = [...prev];
      updated.splice(indexToCopy + 1, 0, copiedBox);
      return updated;
    });
    toast.success(`Box ${indexToCopy + 1} Copied`);
  };

  // Edit Box
  const handelEditBox = (indexToEdit: number) => {
    setCurrentBoxIndex(indexToEdit);
    setShowMultiBoxProduct(true);
  };

  return (
    <div className="border border-gray-400 *:px-4 rounded">
      <div className="h-13 flex items-center justify-between border-b border-gray-400 bg-blue-50">
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
            className="text-blue-700 underline font-semibold cursor-pointer"
            onClick={change_click}
          >
            Change
          </p>
        )}
      </div>
      {steper == 3 && (
        <form
          action=""
          onSubmit={(e) => {
            console.log("PARENT FORM SUBMIT");
            ShipmentData.handleSubmit(formOnSubmit)(e);
          }}
          className="bg-white "
        >
          <div className="grid grid-cols-3 gap-x-2 py-3 gap-y-2">
            <PrimaryDate
              label="Invoice Date"
              name="invoice_date"
              maxDate={todayDate}
              form={ShipmentData}
            />
            <DropDownComboBox
              valueKey="currency_iso_code"
              labelKey="currency_iso_code"
              label="Select Currency"
              list={currency}
              placeholder="Select Currency"
              name="invoice_currency"
              form={ShipmentData}
              labelDisabled={true}
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
            {Multiorder && (
              <PrimaryInput
                placeholder="Enter No. Of Box ..."
                label="No. of Boxes"
                type="tel"
                name="box_number"
                form={ShipmentData}
                isRequired={true}
              />
            )}
          </div>
          {!Multiorder && (
            <OrderItemsDetails
              ShipmentData={ShipmentData}
            />
          )}
          {Multiorder && (
            <MultiorderItemsDetails
              boxesNo={box_number}
              setShowMultiBoxProduct={setShowMultiBoxProduct}
              showMultiBoxProduct={showMultiBoxProduct}
              currentBoxIndex={currentBoxIndex}
              setCurrentBoxIndex={setCurrentBoxIndex}
              setBoxesDetails={setBoxesDetails}
              boxesDetails={boxesDetails}
            />
          )}
          {boxesDetails.length > 1 && (
            <div className="flex items-end justify-end pe-10">
              <p
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => {
                  setExpandedBox((prev) => (prev === "all" ? null : "all"));
                }}
              >
                {expandedBox == "all"
                  ? "Collapse All Boxes"
                  : "Expend All Boxes"}
              </p>
            </div>
          )}
          <div>
            {boxesDetails.map((items: any, index: number) => (
              <div className="my-4 border rounded-lg px-5 py-3" key={index}>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    setExpandedBox((prev) => (prev === index ? null : index));
                  }}
                >
                  <div className="flex items-center justify-between *:text-xl">
                    <div className="flex gap-x-3 items-center">
                      <p className="font-normal text-gray-500">
                        <BiMoneyWithdraw />
                      </p>
                      <p className="font-semibold">Box {index + 1}</p>
                      <p className="text-xs font-light text-blue-400">
                        {expandedBox == index ? "Collapse" : "Expand"}
                      </p>
                    </div>
                    <div className="flex items-center gap-x-3 text-blue-700 cursor-pointer *:hover:text-red-500">
                      <p
                        onClick={() => {
                          handelEditBox(index);
                        }}
                      >
                        <MdOutlineModeEdit />
                      </p>
                      {box_number > boxesDetails.length && (
                        <p
                          onClick={() => {
                            handelCopybtn(index);
                          }}
                        >
                          <FaRegCopy />
                        </p>
                      )}
                      {boxesDetails.length !== 1 && (
                        <p
                          onClick={() => {
                            handelDeleteBox(index);
                          }}
                          className=""
                        >
                          <MdDeleteOutline />
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-4 px-13 text-xs text-gray-500">
                    <p className="">
                      Dimensions (in cm):
                      <span className="text-lg text-gray-700 font-semibold">
                        {items.pro_height} x {items.pro_breadth} x
                        {items.pro_length}
                      </span>
                    </p>
                    <p>
                      Billed Wt:
                      <span className="text-lg text-gray-700 font-semibold">
                        {items.dead_weight}
                      </span>
                    </p>
                    <p>
                      Product Count:
                      <span className="text-lg text-gray-700 font-semibold">
                        {items.products.length}
                      </span>
                    </p>
                    {(() => {
                      const totals = items.products?.reduce(
                        (acc: any, p: any) => {
                          const qty = Number(p.item_qty || 0);
                          const price = Number(p.item_unit_price || 0);

                          acc.totalQty += qty;
                          acc.totalAmount += qty * price;

                          return acc;
                        },
                        { totalQty: 0, totalAmount: 0 },
                      );

                      return (
                        <p>
                          Total Price
                          <span className="text-lg text-gray-700 font-semibold ml-2">
                            {watchValue.invoice_currency} {totals?.totalAmount}
                          </span>
                        </p>
                      );
                    })()}
                  </div>
                </div>
                {(expandedBox === "all" || expandedBox === index) && (
                  <div className="py-2 text-gray-500">
                    <div className="flex items-center justify-between *:text-xs *:font-light">
                      <p className="w-[5%]">Sr No.</p>
                      <p className="w-[25%]">Product</p>
                      <p className="w-[15%]">SKU</p>
                      <p className="w-[10%]">HSN</p>
                      <p className="w-[10%] text-center">Qty</p>
                      <p className="w-[15%]">Unit Price</p>
                      <p className="w-[20%]">Total</p>
                    </div>
                    {items.products.map((items: any, index: number) => (
                      <div className="flex items-center justify-between *:text-xs *:font-light">
                        <p className="w-[5%]">{index + 1}.</p>
                        <p className="w-[25%]">{items.item_name}</p>
                        <p className="w-[15%]">{items.item_sku}</p>
                        <p className="w-[10%]">{items.item_hsn}</p>
                        <p className="w-[10%] text-center">{items.item_qty}</p>
                        <p className="w-[15%]">
                          {watchValue.invoice_currency} {items.item_unit_price}
                        </p>
                        <p className="w-[20%]">
                          {watchValue.invoice_currency}{" "}
                          {items.item_unit_price * items.item_qty}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {msgShow && (
            <p className="text-xs text-red-500">
              Number of Boxes should be equal to number Box count
            </p>
          )}
          <div className="flex justify-end py-5">
            {!isEqual &&
            watchValue.invoice_number !== "" &&
            boxesDetails.length <= box_number ? (
              <button
                type="button"
                className="flex items-center gap-x-2 border px-3 py-2 rounded-lg bg-blue-800 text-white hover:bg-blue-600 cursor-pointer"
                onClick={() => setShowMultiBoxProduct(true)}
              >
                <FaPlus />
                {box_number == 1 ? "Add Box" : "Add Boxes"}
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => ShipmentData.handleSubmit(formOnSubmit)(e)}
                className="flex items-center gap-x-2 border px-3 py-2 rounded-lg bg-blue-800 text-white hover:bg-blue-600 cursor-pointer"
              >
                Continue
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default ShipmentInfo;
