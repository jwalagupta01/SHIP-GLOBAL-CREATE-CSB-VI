export const SHIPMENT_DETAILS: any = [
  {
    name: "invoice_number",
    label: "Invoice Number",
    placeholder: "Enter Invoice Number ...",
    type: "tel",
  },
  {
    name: "order_id",
    label: "Order/Reference ID",
    placeholder: "Enter Order/Reference ID ...",
    type: "tel",
    isRequired: true,
  },
  {
    name: "ioss_number",
    label: "IOSS Number",
    placeholder: "Enter IOSS Number ...",
    type: "tel",
    isRequired: true,
  },
];

export const SHIPMENT_SIZE = [
  {
    name: "dead_weight",
    label: "Dead Weight ",
    placeholder: "Eg. 1.25",
    type: "number",
    stxt: "Kg",
  },
  {
    name: "pro_length",
    label: "Length ",
    placeholder: "Eg. 10",
    type: "number",
    stxt: "Cm",
  },
  {
    name: "pro_breadth",
    label: "Breadth ",
    placeholder: "Eg. 10",
    type: "number",
    stxt: "Cm",
  },
  {
    name: "pro_height",
    label: "Height",
    placeholder: "Eg. 10",
    type: "number",
    stxt: "Cm",
  },
];

export const SHIPMENT_PRODUCT = [
  {
    name: "item_name",
    label: "Product Name",
    placeholder: "Enter Product Name",
    type: "text",
  },
  {
    name: "item_sku",
    label: "SKU",
    placeholder: "Enter SKU ...",
    type: "tel",
    isRequired: true,
  },
  {
    name: "item_hsn",
    label: "HSN",
    placeholder: "Enter HSN ...",
    type: "tel",
  },
  {
    name: "item_qty",
    label: "Qty",
    placeholder: "Enter Qty ...",
    type: "tel",
  },
  {
    name: "item_unit_price",
    label: "Unit Price (INR)",
    placeholder: "Enter Unit Price ...",
    type: "tel",
  },
];
