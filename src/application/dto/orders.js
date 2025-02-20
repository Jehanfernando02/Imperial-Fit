import { z } from "zod";

export const createOrderDto = z.object({
  userId: z.string(),
  orderProducts: z
    .object({
      productId: z.string(),
      quantity: z.number(),
    })
    .array(),
  address: z.object({
    fname: z.string(),
    lname: z.string(),
    line_1: z.string(),
    line_2: z.string(),
    city: z.string(),
    phone: z.string(),
  }),
});
