import { z } from "zod";



export const artisanPackageCreationSchema = z.object({
    artisanId: z.string(),
    duration: z.number(),
    features: z.string().array(),
    experience: z.string()
})