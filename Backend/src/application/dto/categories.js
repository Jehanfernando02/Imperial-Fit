import { z } from "zod";

export const createCategoryDto = z.object({
  name: z.string().min(1, "Name is required"), // Ensure the name is provided and not empty
});
