import { z } from "zod";

export const Admin = z.object({
    username: z.string(),
    name: z.string(),
    role: z.string(),
    password: z.string()
}).required({
    username: true,
    name: true,
    role: true,
    password: true
})

export const AdminIdentifier = z.object({
    username: z.string(),
    name: z.string().optional(),
    role: z.string().optional(),
    password: z.string().optional()
})

export type AdminType = z.infer<typeof Admin>

export type AdminIdentifierType = z.infer<typeof AdminIdentifier>