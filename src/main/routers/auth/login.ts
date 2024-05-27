import { Router } from "express";
import { AuthService, LoginFailureCause as Cause } from "../../services/auth";
import { ZodError, z } from "zod";

export const errorText = {
    [Cause.HandleDoesNotExists]:
        'User with this ID does not exist.',

    [Cause.InvalidPassword]:
        'Wrong password.',
};

export function generateErrors(cause: Cause) {
    return {
        handleError: cause === Cause.HandleDoesNotExists ? errorText[cause] : undefined,
        passwordError: cause === Cause.InvalidPassword ? errorText[cause] : undefined
    };
}

export function loginRouter(service: AuthService): Router {
    const router = Router();

    router.get('', async (_, res) => {
        res.render('auth/login', { previousValue: {}, errors: {} });
    });
    const registerBodyParser = z.object({
        handle: z.string(),
        password: z.string()
    });
    router.post('', async (req, res) => {
        try {
            const body = registerBodyParser.parse(req.body);
            const result = await service.logIn(body);
            if (result.success) {
                await new Promise((resolve) => req.session.regenerate(resolve));

                req.session.loggedAccount = body.handle;

                return res.redirect('/');
            } else {
                const reason = result.failureReason;
                return res.render('auth/login', {
                    previousValue: body,
                    errors: generateErrors(reason)
                });
            }
        } catch (e) {
            if (e instanceof ZodError) {
                return res.sendStatus(400);
            }
        }
    });

    return router;
}