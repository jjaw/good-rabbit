// src/app/components/senti-schema.js
import { z } from "zod";

// each individual result must have a string label and numeric score
export const HFResultSchema = z.object({
  label: z.string(),
  score: z.number(),
});

// the overall response must be an array of those objects
export const HFResponseSchema = z.array(HFResultSchema);

// Alternative schema for nested array response format
export const HFNestedResponseSchema = z.array(z.array(HFResultSchema)); 