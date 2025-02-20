import { z } from "zod";

export const createProductDto = z.object({
  categoryId: z.string(),
  image: z.string(),
  name: z.string(),
  price: z.number(),  // Changed from string to number
  description: z.string(),
});
