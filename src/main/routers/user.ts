import { Router } from "express";
import { UserService } from "../services/user";
import { ZodError, z } from "zod";
import { RegistrationFailureCause as Cause, RegistrationFailureError } from "../exceptions/registrationFailure";

export const errorText = {
    [Cause.HandleExists]: 'This user ID has already been used.',
    [Cause.HandleInvalid]: 'Your user ID should consists of letters, numbers and underscore.',
    [Cause.EmailExists]: 'This email has already been used.',
    [Cause.EmailInvalid]: 'Please enter a valid email.',
    [Cause.MismatchingPassword]: 'Password does not match.'
};
export function generateErrors({ causes }: RegistrationFailureError) {
    function existsOrInvalid(exists: Cause, invalid: Cause) {
        if (causes.has(exists))
            return errorText[exists];
        if (causes.has(invalid))
            return errorText[invalid];
        return undefined;
    }
    return {
        handleError: existsOrInvalid(Cause.HandleExists, Cause.HandleInvalid),
        emailError: existsOrInvalid(Cause.EmailExists, Cause.EmailInvalid),
        passwordError: causes.has(Cause.MismatchingPassword)
            ? errorText[Cause.MismatchingPassword] : undefined
    };
}

export function userRouter(service: UserService): Router {
    const router = Router();

    router.get('/register', async (_, res) => {
        res.render('user/register', { previousValue: {}, errors: {} });
    });

    const registerBodyParser = z.object({
        name: z.string(),
        handle: z.string(),
        email: z.string(),
        password: z.string(),
        passwordConfirm: z.string()
    });
    router.post('/register', async (req, res) => {
        let body: ReturnType<typeof registerBodyParser.parse>;
        try {
            body = registerBodyParser.parse(req.body);
            await service.registerUser(body);
            res.redirect('/');
        } catch (e) {
            if (e instanceof ZodError) {
                res.sendStatus(400);
                return;
            }
            if (e instanceof RegistrationFailureError) {
                res.render('user/register', {
                    previousValue: body!,
                    errors: generateErrors(e)
                });
            }
        }
    });

    return router;
}