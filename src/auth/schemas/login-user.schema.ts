import { z } from 'zod';

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(16),
});

export type LoginUserDto = z.infer<typeof loginUserSchema>;
