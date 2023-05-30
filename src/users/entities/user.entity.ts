import { User as UserType } from '@prisma/client';

export type UserEntity = Omit<UserType, 'password'>;
