import { z } from "zod";

const FullNameValidationSchema = z.object({
    firstName: z.string().max(20).refine((value) => value.trim().length > 0, {
        message: "First name can't be empty after trimming",
      }),
      lastName: z.string().max(20).refine((value) => value.trim().length > 0, {
        message: "First name can't be empty after trimming",
      })
});

const AdressValidationSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
});

export const OrdersSchema = z.object({
    productName: z.string(),
    price: z.number(),
    quantity: z.number(),
});

export const UsersInterfaceValidationSchema = z.object({
    userId: z.number(),
    username: z.string(),
    password: z.string(),
    fullName: FullNameValidationSchema,
    age: z.number(),
    email: z.string(),
    isActive: z.boolean(),
    hobbies: z.array(z.string()),
    address: AdressValidationSchema,
    orders: z.array(OrdersSchema).optional(),
});


