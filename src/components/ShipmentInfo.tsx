import { SHIPMENT_DETAILS } from "@/mock/arrayshipmentdetails";
import { DropDownComboBox } from "./Element/DropDownComboBox";
import { PrimaryDate } from "./Element/Primarydate";
import { PrimaryInput } from "./Element/primaryInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaPlus } from "react-icons/fa6";
import { ShipmentinfoSchema } from "@/Schema/CsbIVSchemaZod";
import { FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { MULTI_ORDER_SCHEMA } from "@/Schema/MultiOrderShema";
import { OrderItemsDetails } from "./itemsDetails";
import { MultiorderItemsDetails } from "./MultiOrderItemsDetails";
import { ShipmentinfoboxDe } from "./Element/ShipmentInfoForm";

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
          {!Multiorder && <OrderItemsDetails ShipmentData={ShipmentData} />}
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
          <ShipmentinfoboxDe
            boxesDetails={boxesDetails}
            box_number={box_number}
            watchValue={watchValue}
            setBoxesDetails={setBoxesDetails}
            setMsgShow={setMsgShow}
            setCurrentBoxIndex={setCurrentBoxIndex}
            setShowMultiBoxProduct={setShowMultiBoxProduct}
          />
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
                disabled={box_number >= 25}
                type="button"
                className="flex items-center gap-x-2 border px-3 py-2 rounded-lg bg-blue-800 text-white hover:bg-blue-600 cursor-pointer disabled:opacity-80"
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
                {boxesDetails.length >= 1 ? "Continue" : "Add Box"}
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};
export default ShipmentInfo;
