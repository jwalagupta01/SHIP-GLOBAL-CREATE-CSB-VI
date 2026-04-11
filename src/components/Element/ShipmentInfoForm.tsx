import { useState } from "react";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FaRegCopy } from "react-icons/fa";
import { MdDeleteOutline, MdOutlineModeEdit } from "react-icons/md";
import { toast } from "react-toastify";

interface geetingsProps {
  boxesDetails: any;
  box_number: number;
  watchValue: any;
  setBoxesDetails: any;
  setMsgShow: (val: boolean) => void;
  setCurrentBoxIndex: (val: number) => void;
  setShowMultiBoxProduct: (val: boolean) => void;
}

export function ShipmentinfoboxDe({
  boxesDetails,
  box_number,
  watchValue,
  setBoxesDetails,
  setMsgShow,
  setCurrentBoxIndex,
  setShowMultiBoxProduct,
}: geetingsProps) {
  const [expandedBox, setExpandedBox] = useState<number | "all" | null>(null);

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
    <>
      {boxesDetails.length > 1 && (
        <div className="flex items-end justify-end pe-10">
          <p
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => {
              setExpandedBox((prev: any) => (prev === "all" ? null : "all"));
            }}
          >
            {expandedBox == "all" ? "Collapse All Boxes" : "Expend All Boxes"}
          </p>
        </div>
      )}
      {boxesDetails.map((items: any, index: number) => (
        <div className="my-4 border rounded-lg px-5 py-3" key={index}>
          <div
            className="cursor-pointer"
            onClick={() => {
              setExpandedBox((prev: any) => (prev === index ? null : index));
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
              <div className="flex items-center gap-x-3 text-blue-700 cursor-pointer *:hover:text-red-500 *:cursor-pointer">
                <button
                  type="button"
                  onClick={() => {
                    handelEditBox(index);
                  }}
                >
                  <MdOutlineModeEdit />
                </button>
                {box_number > boxesDetails.length && (
                  <button
                    type="button"
                    onClick={() => {
                      handelCopybtn(index);
                    }}
                  >
                    <FaRegCopy />
                  </button>
                )}
                {boxesDetails.length !== 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      handelDeleteBox(index);
                    }}
                    className=""
                  >
                    <MdDeleteOutline />
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 px-13 text-xs text-gray-500">
              <p className="">
                Dimensions (in cm):
                <span className="text-lg text-gray-700 font-semibold">
                  {items.pro_height} x {items.pro_breadth} x{items.pro_length}
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
            <div className="py-2 mt-1 text-gray-500 flex flex-col gap-y-3 px-5">
              <div className="flex items-center justify-between *:text-xs *:font-light">
                <p className="w-[5%]">Sr No.</p>
                <p className="w-[25%]">Product</p>
                <p className="w-[15%]">SKU</p>
                <p className="w-[10%]">HSN</p>
                <p className="w-[10%]">Qty</p>
                <p className="w-[15%]">Unit Price</p>
                <p className="w-[20%]">Total</p>
              </div>
              {items.products.map((items: any, index: number) => (
                <div className=" flex items-center justify-between *:text-xs *:font-light" key={index}>
                  <p className="w-[5%]">{index + 1}.</p>
                  <p className="w-[25%]">{items.item_name}</p>
                  <p className="w-[15%]">{items.item_sku}</p>
                  <p className="w-[10%]">{items.item_hsn}</p>
                  <p className="w-[10%]">{items.item_qty}</p>
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
    </>
  );
}
