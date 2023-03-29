import { z } from "zod";
import { productIdRegExp, startDateRegExp } from "./regex";
import { getCurrentDate } from "./utils";

export const addProductSchema = z.object({
  productId: z.string().regex(productIdRegExp),
  productName: z.string().min(1),
  productOwnerName: z.string().min(1),
  developers: z.array(z.string()).min(1),
  scrumMasterName: z.string().min(1),
  startDate: z.string().regex(startDateRegExp).refine((date) => date <= getCurrentDate(), {
    message: "startDate cannot be in the future.",
  }),
  methodology: z.enum(["Agile", "Waterfall"]),
});

export const updateProductSchema = z.object({
  productId: z.string().regex(productIdRegExp),
  productName: z.optional(z.string().min(1)),
  productOwnerName: z.optional(z.string().min(1)),
  developers: z.optional(z.array(z.string()).min(1)),
  scrumMasterName: z.optional(z.string().min(1)),
  startDate: z.optional(z.string().regex(startDateRegExp).refine((date) => date <= getCurrentDate(), {
    message: "startDate cannot be in the future.",
  })),
  methodology: z.optional(z.enum(["Agile", "Waterfall"])),
});

export const deleteProductSchema = z.object({
  productId: z.string().regex(productIdRegExp),
});
