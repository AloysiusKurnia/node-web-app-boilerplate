const enum Cause {
    EmailExists,
    HandleExists,
    HandleInvalid,
    EmailInvalid,
    MismatchingPassword,
}
export class RegistrationFailureError extends Error {
    static message: Record<Cause, string> = {
        [Cause.EmailExists]: 'already existing email',
        [Cause.HandleExists]: 'already existing handle',
        [Cause.EmailInvalid]: 'invalid email format',
        [Cause.HandleInvalid]: 'invalid handle format',
        [Cause.MismatchingPassword]: 'mismatching password'
    };
    public causes: Set<Cause>;
    constructor(causes: Cause[]) {
        const causesString = causes.map((s) => RegistrationFailureError.message[s]).join(', ');
        super(`Registration failed because of ${causesString}.`);
        this.causes = new Set(causes);
    }
}

export { Cause as RegistrationFailureCause };