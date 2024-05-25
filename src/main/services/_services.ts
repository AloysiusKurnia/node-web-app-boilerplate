import { PrismaClient } from "@prisma/client";
import postService from "./post";
import userService from "./user";

export function initializeServices(db: PrismaClient) {
    return {
        User: userService(db),
        Post: postService(db)
    };
}

export type Services = ReturnType<typeof initializeServices>;