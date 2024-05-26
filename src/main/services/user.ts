import { PrismaClient } from "@prisma/client";
import { createHash, randomBytes } from 'crypto';
import { RegistrationFailureCause as Cause, RegistrationFailureError } from "../exceptions/registrationFailure";

export interface UserService {
    registerUser(args: {
        name: string;
        handle: string;
        email: string;
        password: string;
        passwordConfirm: string;
    }): Promise<void>;
}


export default function userService(db: PrismaClient): UserService {
    const emailFormat = /^[^@]+@[^@]+\.[^@]+$/g;
    const handleFormat = /^[a-zA-Z0-9_]+$/g;
    return {
        async registerUser({ name, handle, email, password, passwordConfirm }) {
            const existingUsers = await db.user.findMany({
                select: {
                    handle: true,
                    email: true
                },
                where: {
                    OR: [
                        { handle: handle },
                        { email: email }
                    ]
                }
            });
            const errors: Cause[] = [];
            if (existingUsers.some((u) => u.email === email)) {
                errors.push(Cause.EmailExists);
            }
            if (existingUsers.some((u) => u.handle === handle)) {
                errors.push(Cause.HandleExists);
            }
            if (!email.match(emailFormat)) {
                errors.push(Cause.EmailInvalid);
            }
            if (!handle.match(handleFormat)) {
                errors.push(Cause.EmailInvalid);
            }
            if (passwordConfirm !== password) {
                errors.push(Cause.MismatchingPassword);
            }
            if (errors.length > 0) {
                throw new RegistrationFailureError(errors);
            }

            const salt = randomBytes(16).toString('base64');
            const hasher = createHash('sha256');
            hasher.update(salt + password);
            const hashed = hasher.digest('base64');

            await db.user.create({
                data: {
                    name,
                    handle,
                    email,
                    password: hashed,
                    salt,
                    createdAt: new Date()
                }
            });
        },
    };
}