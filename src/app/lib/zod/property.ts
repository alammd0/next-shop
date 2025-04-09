import { z } from "zod";

export const propertySchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    smallDesc: z.string().min(1, { message: "Small Description is required" }),
    desc: z.string().min(1, { message: "Description is required" }),
    price: z.number().min(1, { message: "Price is required" }),
    salePrice: z.number().min(1, { message: "Sale Price is required" }),
    image: z.array(z.any()).min(1, { message: "Image is required" }),
    size: z.string().min(1, { message: "Size is required" }),
    status: z.string().min(1, { message: "Status is required" }),
    category: z.string().min(1, { message: "Category is required" }),
    userId: z.number().min(1, { message: "User Id is required" }),
})


export type PropertySchema = z.infer<typeof propertySchema>;