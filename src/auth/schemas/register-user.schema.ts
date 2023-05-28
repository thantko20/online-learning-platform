import { z } from 'zod';

export const registerUserSchema = z
  .object({
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string().min(8).max(16),
  })
  .required();

export type RegisterUserDto = z.infer<typeof registerUserSchema>;
