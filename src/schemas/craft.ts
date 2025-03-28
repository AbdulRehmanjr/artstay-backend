import { z } from 'zod'

export const CraftCreationSchema = z.object({
    craftName: z.string().min(2, 'Craft name can not be empty'),
    craftSlug: z.string().min(2, 'Craft slug can not be empty')
})

export const SubCraftCreationSchema = z.object({
    subCraftName: z.string().min(2, 'Craft name can not be empty'),
    subCraftSlug: z.string().min(2, 'Craft slug can not be empty'),
    craftId: z.string().min(1,'Craft Id is required.')
})