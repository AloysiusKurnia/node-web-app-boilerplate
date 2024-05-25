import { PrismaClient } from "@prisma/client";

export interface UserService {
    registerUser(args: {
        name: string,
        handle: string,
        email: string,
        password: string
    }): {
        id: number;
    };
}

export default function userService(db: PrismaClient): UserService {
    throw new Error('Not implemented');
}