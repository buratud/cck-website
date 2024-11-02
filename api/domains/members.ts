import { z } from "zod";

export const Member = z.object({
    id: z.string(),
    name: z.string(),
    role: z.string(),
}).required({
    id: true,
    name: true,
    role: true
})

export const MemberIdentifier = z.object({
    id: z.string()
})

export const MemberArray = z.array(Member)
export const MemberIdentifierArray = z.array(MemberIdentifier)

export type MemberType = z.infer<typeof Member>