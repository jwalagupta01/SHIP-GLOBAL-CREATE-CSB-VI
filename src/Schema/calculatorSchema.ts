import { z } from "zod";

export const CalculatorSchema = z.object({
  country: z.string().nonempty("Select Country"),
  postCode: z
    .string()
    .length(6, "PostCode must be exactly 6 digits")
    .regex(/^\d+$/, "Only numbers allowed"),
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
});
