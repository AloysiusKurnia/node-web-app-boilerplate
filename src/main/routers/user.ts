import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { UserService } from "../services/user";

export function userRouter(service: UserService): Router {
    const router = Router();

    router.get('/register', async (_, res) => {
        
    });

    return router;
}