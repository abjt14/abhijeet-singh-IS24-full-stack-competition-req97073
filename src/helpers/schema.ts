import { z } from "zod";
import { productIdRegExp, startDateRegExp } from "./regex";
import { getCurrentDate } from "./utils";

// validate the request body for the add product endpoint using zod
export const addProductSchema = z.object({
  productId: z.string().regex(productIdRegExp),
  productName: z.string().min(1),
  productOwnerName: z.string().min(1),
  developers: z.array(z.string()).min(1).max(5),
  scrumMasterName: z.string().min(1),
  startDate: z.string().regex(startDateRegExp).refine((date) => date <= getCurrentDate(), {
    message: "startDate cannot be in the future.",
  }),
  methodology: z.enum(["Agile", "Waterfall"]),
});

// validate the request body for the update product endpoint using zod
export const updateProductSchema = z.object({
  productId: z.string().regex(productIdRegExp),
  productName: z.string().min(1),
  productOwnerName: z.string().min(1),
  developers: z.array(z.string()).min(1).max(5),
  scrumMasterName: z.string().min(1),
  startDate: z.string().regex(startDateRegExp).refine((date) => date <= getCurrentDate(), {
    message: "startDate cannot be in the future.",
  }),
  methodology: z.enum(["Agile", "Waterfall"]),
});

// validate the request body for the delete product endpoint using zod
export const deleteProductSchema = z.object({
  productId: z.string().regex(productIdRegExp),
});
