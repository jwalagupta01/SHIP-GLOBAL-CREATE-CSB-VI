import {z} from "zod"

export const loginSchema = z.object({
    email: z.email().nonempty("Enter Your Email Id"),
    password: z.string().nonempty("Enter Your Password")
})