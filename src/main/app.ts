import 'dotenv/config';
import express from 'express';
import { context } from '../context';
import { initializeRepositories } from './repository/_repositories';
import { initializeRouters } from './routers/_routers';

export function main() {
    const app = express();

    app.set('view engine', 'pug');
    app.set('views', './views');

    const repos = initializeRepositories(context.db);
    initializeRouters(app, repos);

    context.run(app);

    return app;
}

main();