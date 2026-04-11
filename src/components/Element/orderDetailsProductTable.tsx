import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface geetingsProps {
  productDetails: any;
  currency: string;
}

export function OrderDetailsProductDetails({
  productDetails,
  currency,
}: geetingsProps) {
  return (
    <Table className="border-separate border-spacing-y-2">
      <TableHeader>
        <TableRow className="bg-gray-100 text-gray-500 h-12">
          <TableHead className="border-y border-l border-gray-300 rounded-l-lg">
            Sr No.
          </TableHead>
          <TableHead className="border-y border-gray-300">
            Product Name
          </TableHead>
          <TableHead className="border-y border-gray-300">SKU</TableHead>
          <TableHead className="border-y border-gray-300">HSN</TableHead>
          <TableHead className="border-y border-gray-300">Qty</TableHead>
          <TableHead className="border-y border-gray-300">Unit Price</TableHead>
          <TableHead className="border-y border-r border-gray-300 rounded-r-lg">
            Total
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productDetails.map((item: any, index: number) => (
          <TableRow
            key={index}
            className="border-y border-l border-gray-300 h-15"
          >
            <TableCell className="font-medium rounded-l-lg border-y border-l border-gray-300">
              {index + 1}
            </TableCell>
            <TableCell className="border-y border-gray-300">
              {item.vendor_order_item_name}
            </TableCell>
            <TableCell className="border-y border-gray-300">
              {item.vendor_order_item_sku}
            </TableCell>
            <TableCell className="border-y border-gray-300">
              {item.vendor_order_item_hsn}
            </TableCell>
            <TableCell className="border-y border-gray-300">
              {item.vendor_order_item_quantity}
            </TableCell>
            <TableCell className="border-y border-gray-300">
              {item.vendor_order_item_unit_price}
            </TableCell>
            <TableCell className="border-y border-r border-gray-300 rounded-r-lg">
              {item.vendor_order_item_quantity *
                item.vendor_order_item_unit_price}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter className="h-10 bg-transparent">
        <TableRow>
          <TableCell colSpan={6} className="text-right font-semibold">
            Total
          </TableCell>
          <TableCell className="font-bold text-lg">
            {currency}{" "}
            {productDetails.reduce((acc: number, item: any) => {
              return (
                acc +
                item.vendor_order_item_quantity *
                  item.vendor_order_item_unit_price
              );
            }, 0)}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
