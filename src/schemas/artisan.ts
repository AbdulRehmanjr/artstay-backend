import { z } from "zod";


export const artisanByAccount = z.object({
    accountId: z.string()
})

export const artisanUpdatePortfolioSchema = z.object({
    images: z.string().array(),
    accountId: z.string()
})

export const artisanStatusUpdateSchema= z.object({
    images: z.string().array(),
    accountId: z.string()
})