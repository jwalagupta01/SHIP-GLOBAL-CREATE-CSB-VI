import { z } from "zod";

export const personalDataschema = z
  .object({
    fname: z.string().nonempty("First name is required"),
    lname: z.string().nonempty("Last name is required"),
    mobile: z
      .string()
      .min(10, "Invalid phone number")
      .max(10, "Invalid phone number"),
    email: z.string().email("Please enter a valid email address"),
    country: z.string().nonempty("Please select a country"),
    state: z.string().nonempty("Please select a state"),
    address1: z.string().nonempty("Address 1 is required"),
    address2: z.string().nonempty("Address 2 is required"),
    landMark: z.string().optional(),
    city: z.string().nonempty("City is required"),
    pinCode: z.string().nonempty("Pincode is required"),
    billingCheck: z.boolean(),
    billing_Country: z.string().optional(),
    billing_State: z.string().optional(),
    billing_Address1: z.string().optional(),
    billing_Address2: z.string().optional(),
    billing_Landmark: z.string().optional(),
    billing_City: z.string().optional(),
    billing_Pincode: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.billingCheck) {
      if (!data.billing_Country) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Country is required",
          path: ["billing_Country"],
        });
      }
      if (!data.billing_State) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "State is required",
          path: ["billing_State"],
        });
      }
      if (!data.billing_Address1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Address 1 is required",
          path: ["billing_Address1"],
        });
      }
      if (!data.billing_Address2) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Address 2 is required",
          path: ["billing_Address2"],
        });
      }
      if (!data.billing_City) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "City is Required",
          path: ["billing_City"],
        });
      }
      if (!data.billing_Pincode) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "PinCode Is Required",
          path: ["billing_Pincode"],
        });
      }
    }
  });
