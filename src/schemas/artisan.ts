import { z } from "zod";


export const artisanByAccount = z.object({
    accountId: z.string()
})


export const artisanUpdatePortfolioSchma = z.object({
    images: z.string().array(),
    accountId: z.string()
})