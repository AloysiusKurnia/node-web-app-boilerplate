import type { Express } from "express";

import { Services } from "../services/_services";
import { indexRouter } from "./index";
import { userRouter } from "./user";

export function initializeRouters(app: Express, services: Services) {
    app.use('/', indexRouter());
    app.use('/user', userRouter(services.User));
}

