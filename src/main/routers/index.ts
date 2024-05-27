import { Router } from "express";

export function indexRouter(): Router {
    const router = Router();

    router.get('', (req, res) => {
        const loggedAccount = req.session.loggedAccount;
        res.render('index', { loggedAccount });
    });

    return router;
}