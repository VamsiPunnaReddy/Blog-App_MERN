import z from "zod"

export const signupInput = z.object({
    fullName: z.string().max(20),
    username: z.string().max(20),
    email: z.string().email(),
    password: z.string().min(8)
})

export type SignupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
    username: z.string(),
    password: z.string().min(8)
})

export type SigninInput = z.infer<typeof signinInput>

export const createBlogInput = z.object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
    file: z.instanceof(File)
})

export type CreateBlogInput = z.infer<typeof createBlogInput>

export const updateBlogInput = z.object({
    title: z.string(),
    description: z.string(),
    content: z.string(),
    file: z.instanceof(File),
    id: z.number()
})

export type UpdateBlogInput = z.infer<typeof updateBlogInput>