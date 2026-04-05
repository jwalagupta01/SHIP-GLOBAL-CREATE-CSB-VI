import { SHIPMENT_DETAILS } from "@/mock/arrayshipmentdetails";
import { DropDownComboBox } from "./Element/DropDownComboBox";
import { PrimaryDate } from "./Element/Primarydate";
import { PrimaryInput } from "./Element/primaryInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaPlus } from "react-icons/fa6";
import { ShipmentinfoSchema } from "@/Schema/CsbIVSchemaZod";
import { PrimaryBtn } from "./Element/PrimaryBtn";
import { FaCheck } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { MULTI_ORDER_SCHEMA } from "@/Schema/MultiOrderShema";
import { OrderItemsDetails } from "./itemsDetails";

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
  const [showMultiBoxProduct, setShowMultiBoxProduct] = useState<boolean>(true);
  const token = useSelector((state: any) => state.auth.token);
  const ShipmentData = useForm({
    mode: "onChange",
    resolver: zodResolver(Multiorder ? MULTI_ORDER_SCHEMA : ShipmentinfoSchema),
    defaultValues: Multiorder
      ? {
          invoice_currency: "INR",
          box_number: 1,
          Boxes: [
            {
              dead_weight: "",
              pro_length: "",
              pro_breadth: "",
              pro_height: "",
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
          ],
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

  const getDefaultProduct = () => ({
    item_name: "",
    item_sku: "",
    item_hsn: "",
    item_qty: "",
    item_unit_price: "",
    item_igst: "",
  });

  // const watchValue = ShipmentData.watch();
  const box_number = Number(ShipmentData.watch("box_number") || 1);

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const formOnSubmit = (data: any): void => {
    try {
      if (Multiorder) {
        // setAllData((prev: any) => ({ ...prev, ShipmentData: data }));
        setShowMultiBoxProduct(true);
      } else {
        setAllData((prev: any) => ({ ...prev, ShipmentData: data }));
        setSteper(4);
      }

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

  //

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

  useEffect(() => {
    if (!Multiorder) return;

    const currentBoxes = ShipmentData.getValues("Boxes") || [];

    const updatedBoxes = Array.from({ length: box_number }, (_, i) => {
      const existingBox = currentBoxes[i];

      return {
        dead_weight: existingBox?.dead_weight || "",
        pro_length: existingBox?.pro_length || "",
        pro_breadth: existingBox?.pro_breadth || "",
        pro_height: existingBox?.pro_height || "",
        products:
          existingBox?.products && existingBox.products.length > 0
            ? existingBox.products
            : [getDefaultProduct()],
      };
    });

    ShipmentData.setValue("Boxes", updatedBoxes);
  }, [box_number, Multiorder]);

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
              Multiorder={Multiorder}
              ShipmentData={ShipmentData}
              boxesNo={box_number}
              setShowMultiBoxProduct={setShowMultiBoxProduct}
            />
          )}
          <div className="flex justify-end my-5">
            <PrimaryBtn
              type="submit"
              variant="default"
              className="bg-blue-800 hover:bg-blue-600 px-6 py-5"
              text={
                Multiorder ? (
                  <>
                    <FaPlus /> {box_number > 1 ? "Add Boxes" : "Add Box"}
                  </>
                ) : (
                  "Continue"
                )
              }
            />
          </div>
        </form>
      ) : (
        ""
      )}
      {showMultiBoxProduct && Multiorder && (
        <div className="absolute top-0 left-0 h-screen w-screen bg-black/30 z-51 flex items-center justify-center">
          <div className="bg-white rounded-2xl w-4/5 pb-10 max-h-[90vh] overflow-y-auto">
            {Array.from({ length: box_number }).map((_, i) => (
              <OrderItemsDetails
                key={i}
                Multiorder={Multiorder}
                ShipmentData={ShipmentData}
                boxesNo={box_number}
                setShowMultiBoxProduct={setShowMultiBoxProduct}
                boxIndex={i}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ShipmentInfo;
