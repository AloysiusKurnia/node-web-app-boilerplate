import type { Repositories } from "../repository/_repositories";
import type { Express } from "express";

import { indexRouter } from "./index";
import { userRouter } from "./users";

export function initializeRouters(app: Express, repos: Repositories) {
    app.use('/', indexRouter());
    app.use('/users', userRouter(repos.user));
}

