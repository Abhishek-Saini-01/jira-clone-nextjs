import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(256),
})

export const signUpSchema = z.object({
    name: z.string().trim().min(3, "name must contain at least 3 character(s)"),
    email: z.string().email(),
    password: z.string().min(8).max(256),
})
