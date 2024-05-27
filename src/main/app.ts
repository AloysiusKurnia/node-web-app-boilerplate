import 'dotenv/config';
import express from 'express';
import { context } from '../context';
import { initializeRouters } from './routers/_routers';
import { initializeServices } from './services/_services';
import session from 'express-session';

export function main() {
    const app = express();

    app.set('view engine', 'pug');
    app.set('views', './views');
    app.use(express.static('static'));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(session({
        secret: process.env['SESSION_SECRET'] ?? '',
        name: 'sessionId'
    }));

    const services = initializeServices(context.db);
    initializeRouters(app, services);

    context.run(app);

    return app;
}

main();