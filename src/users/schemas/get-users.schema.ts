import { z } from 'zod';

export const getUsersQuerySchema = z
  .object({
    name: z.string().min(10),
  })
  .partial();

export type GetUsersQuery = z.infer<typeof getUsersQuerySchema>;
