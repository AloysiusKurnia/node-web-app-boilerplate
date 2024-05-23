import { PrismaClient } from "@prisma/client";

export interface UserRepository {
    summary(): Promise<{ email: string, name: string | null; }[]>;
}

export function userRepository(db: PrismaClient): UserRepository {
    return {
        summary() {
            return db.user.findMany({ select: { email: true, name: true } });
        },
    };
}
