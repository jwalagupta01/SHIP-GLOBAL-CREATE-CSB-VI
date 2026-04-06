import { z } from "zod";




const ProductSchema = z.object({
  item_name: z.string().nonempty("Product name is required"),
  item_sku: z.string().optional(),
  item_hsn: z.coerce.number().min(8, "HSN must be 8 digits long"),
  item_qty: z.coerce.number().min(1, "Quantity must not be Zero"),
  item_unit_price: z.coerce.number().min(1, "Unit Price must not be Zero"),
  item_igst: z.string().nonempty("Select IGST"),
});

export const BOXES_DETAILS = z.object({
  dead_weight: z.coerce
    .number()
    .min(0.001, "Weight must be atleast 0.01 KG")
    .max(10, "Weight cannot be more than 10 KG"),
  pro_length: z.coerce
    .number()
    .min(1, "Length must be atleast 1 cm")
    .max(120, "Length cannot be more than 120 cm"),
  pro_breadth: z.coerce
    .number()
    .min(1, "Breadth must be atleast 1 cm")
    .max(120, "Length cannot be more than 120 cm"),
  pro_height: z.coerce
    .number()
    .min(1, "Height must be atleast 1 cm")
    .max(120, "Breadth cannot be more than 120 cm"),
  products: z
    .array(ProductSchema)
    .min(1, "At least one product is required")
    .max(25, "Height cannot be more than 120 cm"),
});

export const MULTI_ORDER_SCHEMA = z.object({
  invoice_date: z.date(),
  invoice_currency: z.string().nonempty("Select currency"),
  invoice_number: z.string().nonempty("Please enter invoice number"),
  order_id: z.string().optional(),
  ioss_number: z.string().optional(),
  box_number: z.coerce
    .number()
    .min(1, "Minimum Order is 1")
    .max(25, "Max Order is 25")
    .default(1),
  Boxes: z
    .array(BOXES_DETAILS)
    .min(1, "At least one product is required")
    .max(25, "Maximux 25 Product add Details"),
});
