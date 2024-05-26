import { Router } from "express";
import { UserService } from "../services/user";
import { ZodError, z } from "zod";

export function userRouter(service: UserService): Router {
    const router = Router();

    router.get('/register', async (_, res) => {
        res.render('user/register');
    });

    const registerBodyParser = z.object({
        name: z.string(),
        handle: z.string(),
        email: z.string(),
        password: z.string(),
        passwordConfirm: z.string()
    });

    router.post('/register', async (req, res) => {
        try {
            const body = registerBodyParser.parse(req.body);
            service.registerUser(body)
        } catch (e) {
            if (e instanceof ZodError) {
                res.sendStatus(400);
            }
        }
        res.render('user/register');
    });

    return router;
}