import express from 'express';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { userRoute } from './routes/users';
import { indexRoute } from './routes';


const app = express();
const port = 3000;

const prisma = new PrismaClient();

app.set('view engine', 'pug');
app.set('views', './src/views');

// Routes

app.use('/', indexRoute(prisma));
app.use('/users', userRoute(prisma));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});