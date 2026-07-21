import { z } from "zod"

export const taskSchema = z.object({
  title: z
    .string()
    .min(3, "Task must contain at least 3 characters"),

  description: z
    .string()
    .min(5, "Description is too short"),

  priority: z.enum([
    "Low",
    "Medium",
    "High",
  ]),

  date: z.string().min(1, "Select a date"),
})