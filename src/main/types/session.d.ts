declare module 'express-session' {
    interface SessionData {
        loggedAccount: string;
    }
}

export {}