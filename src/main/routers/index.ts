import { Router } from "express";

export function indexRouter(): Router {
    const router = Router();

    router.get('', (_, res) => {
        res.render(
            'index',
            { title: 'Hello world', message: `This is a landing page.` }
        );
    });

    return router;
}