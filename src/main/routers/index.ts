import { Router } from "express";

export function indexRouter(): Router {
    const router = Router();

    router.get('', (_, res) => {
        res.render('index');
    });

    return router;
}