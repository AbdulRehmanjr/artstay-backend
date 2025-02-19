import { z } from "zod";

export const artisanCreationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    address: z.string(),
    description: z.string(),
    experience: z.string(),
    education: z.string(),
    training: z.string(),
    certificate: z.string(),
    recognition: z.string(),
    craftId: z.string(),
    subCraftId: z.string(),
    dp: z.string(),
    email: z.string(),
    password: z.string()
})

export const artisanUpdationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    address: z.string(),
    description: z.string(),
    experience: z.string(),
    education: z.string(),
    training: z.string(),
    certificate: z.string(),
    recognition: z.string(),
    craftId: z.string(),
    subCraftId: z.string(),
    dp: z.string(),
    accountId: z.string()
})

export const safariCreationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    address: z.string(),
    description: z.string(),
    dp: z.string(),
    email: z.string(),
    password: z.string()
})

export const safariUpdationSchema = z.object({
    firstName: z.string(),
    lastName: z.string(),
    address: z.string(),
    description: z.string(),
    dp: z.string(),
    accountId: z.string()
})