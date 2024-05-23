import { Router } from "express";
import { UserRepository } from "../repository/user";

export function userRouter(repo: UserRepository): Router {
    const router = Router();

    router.get('', async (_, res) => {
        const users = await repo.summary();
        res.render('users', { users });
    });

    return router;
}