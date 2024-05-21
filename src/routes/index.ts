import { Router } from "express";
import { RouterFunction } from "./routeFunction";

export const indexRoute: RouterFunction = () => {
    const router = Router();

    router.get('', (_, res) => {
        res.render(
            'index',
            { title: 'Hello world', message: `This is a landing page.` }
        );
    });

    return router;
};