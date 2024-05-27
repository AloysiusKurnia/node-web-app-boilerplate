import { PrismaClient } from "@prisma/client";
import {
    RegistrationFailureCause as Cause,
    RegistrationFailureError
} from "../exceptions/registrationFailure";
import { createSalt, hashPassword as hash } from "../util/hash";

export interface UserService {
    registerUser(args: {
        name: string;
        handle: string;
        email: string;
        password: string;
        passwordConfirm: string;
    }): Promise<void>;

    logIn(args: {
        handle: string;
        password: string;
    }): Promise<{
        success: boolean;
    }>;
}


export default function userService(db: PrismaClient): UserService {
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
            const errors: Cause[] = [];
            if (usersWithSameUniques.some((u) => u.email === email)) {
                errors.push(Cause.EmailExists);
            }
            if (usersWithSameUniques.some((u) => u.handle === handle)) {
                errors.push(Cause.HandleExists);
            }
            if (!email.match(emailFormat)) {
                errors.push(Cause.EmailInvalid);
            }
            if (!handle.match(handleFormat)) {
                errors.push(Cause.HandleInvalid);
            }
            if (passwordConfirm !== password) {
                errors.push(Cause.MismatchingPassword);
            }
            if (errors.length > 0) {
                throw new RegistrationFailureError(errors);
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
        },

        async logIn({ handle, password }) {
            const user = await db.user.findFirst({
                select: { password: true, salt: true },
                where: { handle }
            });
            if (!user) {
                console.log('No user found');
                return { success: false };
            }
            if (user.password !== hash(password, user.salt)) {
                console.log('The password does not match');
                return { success: false };
            }
            console.log('Logged in successfully.');
            
            return { success: true };
        }
    };
}