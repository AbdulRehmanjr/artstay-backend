import { z } from 'zod'

export const AccountCreationSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    accountType: z.enum(["NONE",
        "ARTISAN",
        "SAFARI",
        "FAIRS",
        "BUSINESS",
        "HOTEL",
        "ALL",
        "ADMIN",
        "SUPERADMIN"])
})

export const LoginSchema = z.object({
    email:z.string().email(),
    password:z.string()
})