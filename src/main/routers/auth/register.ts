import { Router } from "express";
import { AuthService, RegistrationFailureCause as Cause } from "../../services/auth";
import { ZodError, z } from "zod";

export const errorText = {
    [Cause.HandleExists]:
        'This user ID has already been used.',

    [Cause.HandleInvalid]:
        'Your user ID should consists of letters, numbers and underscore.',

    [Cause.EmailExists]:
        'This email has already been used.',

    [Cause.EmailInvalid]:
        'Please enter a valid email.',

    [Cause.MismatchingPassword]:
        'Password does not match.'
};

export function generateErrors(causes: Set<Cause>) {
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
        passwordError: causes.has(
            Cause.MismatchingPassword
        ) ? errorText[Cause.MismatchingPassword] : undefined
    };
}

export function registerRouter(service: AuthService): Router {
    const router = Router();

    router.get('', async (_, res) => {
        res.render('auth/register', { previousValue: {}, errors: {} });
    });
    const registerBodyParser = z.object({
        name: z.string(),
        handle: z.string(),
        email: z.string(),
        password: z.string(),
        passwordConfirm: z.string()
    });
    router.post('', async (req, res) => {
        try {
            const body = registerBodyParser.parse(req.body);
            const result = await service.registerUser(body);
            if (result.success) {
                return res.redirect('/');
            } else {
                const reason = result.failureReason;
                return res.render('user/register', {
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