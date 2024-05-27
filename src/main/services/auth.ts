import { PrismaClient } from "@prisma/client";
import { createSalt, hashPassword as hash } from "../util/hash";

export const enum RegistrationFailureCause {
    EmailExists,
    HandleExists,
    HandleInvalid,
    EmailInvalid,
    MismatchingPassword,
}
export const enum LoginFailureCause {
    HandleDoesNotExists,
    InvalidPassword
}
export interface AuthService {
    registerUser(args: {
        name: string;
        handle: string;
        email: string;
        password: string;
        passwordConfirm: string;
    }): Promise<{
        success: true;
    } | {
        success: false;
        failureReason: Set<RegistrationFailureCause>;
    }>;

    logIn(args: {
        handle: string;
        password: string;
    }): Promise<{
        success: true;
    } | {
        success: false;
        failureReason: LoginFailureCause;
    }>;
}


export default function userService(db: PrismaClient): AuthService {
    const emailFormat = /^[^@]+@[^@]+\.[^@]+$/g;
    const handleFormat = /^[a-zA-Z0-9_]+$/g;
    return {
        async registerUser({
            name, handle, email, password, passwordConfirm
        }) {
            const usersWithSameUniques = await db.user.findMany({
                select: { handle: true, email: true },
                where: { OR: [{ handle: handle }, { email: email }] }
            });
            const errors = new Set<RegistrationFailureCause>();
            if (usersWithSameUniques.some((u) => u.email === email)) {
                errors.add(RegistrationFailureCause.EmailExists);
            }
            if (usersWithSameUniques.some((u) => u.handle === handle)) {
                errors.add(RegistrationFailureCause.HandleExists);
            }
            if (!email.match(emailFormat)) {
                errors.add(RegistrationFailureCause.EmailInvalid);
            }
            if (!handle.match(handleFormat)) {
                errors.add(RegistrationFailureCause.HandleInvalid);
            }
            if (passwordConfirm !== password) {
                errors.add(RegistrationFailureCause.MismatchingPassword);
            }
            if (errors.size > 0) {
                return {
                    success: false,
                    failureReason: errors
                };
            }

            const salt = createSalt();
            const hashed = hash(password, salt);

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
            return { success: true };
        },

        async logIn({ handle, password }) {
            const user = await db.user.findFirst({
                select: { password: true, salt: true },
                where: { handle }
            });
            if (!user) {
                return {
                    success: false,
                    failureReason: LoginFailureCause.HandleDoesNotExists
                };
            }
            if (user.password !== hash(password, user.salt)) {
                return {
                    success: false,
                    failureReason: LoginFailureCause.InvalidPassword
                };
            }
            return { success: true };
        }
    };
}