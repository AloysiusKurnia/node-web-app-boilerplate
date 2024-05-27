import { PrismaClient } from "@prisma/client";
import postService from "./post";
import authService from "./auth";

export function initializeServices(db: PrismaClient) {
    return {
        Auth: authService(db),
        Post: postService(db)
    };
}

export type Services = ReturnType<typeof initializeServices>;