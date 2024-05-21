import { Router } from "express";
import { RouterFunction } from "./routeFunction";

export const userRoute: RouterFunction = (db) => {
    const route = Router();

    route.get('', async (_, res) => {
        const users = await db.user.findMany({
            select: { name: true, email: true }
        });
        res.render('users', { users });
    });

    return route;
};

