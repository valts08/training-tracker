import z from 'zod'

const UserVal = z.object({
  id: z.number().min(3),
  username: z.string().min(10)
})

export type User = z.infer<typeof UserVal>

export { UserVal }