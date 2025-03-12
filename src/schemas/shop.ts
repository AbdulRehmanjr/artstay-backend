import { z } from "zod";


export const productCreationSchema = z.object({
    name        :z.string(),
    description :z.string(),
    price       :z.number(),
    images      :z.string().array(),
    category    :z.string(),
    material    :z.string(),
    dimensions  :z.string().optional(),
    weight      :z.number().optional(),
    stock       :z.number(),
    isAvailable :z.boolean(),
    craftType   :z.string(),
    artisanMade :z.boolean(),
    shopId      :z.string(),
})

export const productUpdateSchema = productCreationSchema.extend({
    productId: z.string(),
})



