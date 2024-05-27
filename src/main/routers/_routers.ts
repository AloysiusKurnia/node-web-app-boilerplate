import type { Express } from "express";

import { Services } from "../services/_services";
import { indexRouter } from "./index";
import { registerRouter } from "./auth/register";
import { loginRouter } from "./auth/login";

export function initializeRouters(app: Express, services: Services) {
    app.use('/', indexRouter());
    app.use('/register', registerRouter(services.Auth));
    app.use('/login', loginRouter(services.Auth));
}

