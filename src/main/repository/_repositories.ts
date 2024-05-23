import { PrismaClient } from "@prisma/client";
import { userRepository } from './user';

export function initializeRepositories(db: PrismaClient) {
    return {
        user: userRepository(db)
    };
}

export type Repositories = ReturnType<typeof initializeRepositories>;