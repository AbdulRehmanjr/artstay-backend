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
    email:z.string(),
    password:z.string()
})