import express from 'express';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';


const app = express();
const port = 3000;

const prisma = new PrismaClient();

app.set('view engine', 'pug');
app.set('views', './src/views');
app.get('/', (req, res) => {
    res.render('index', { title: 'Hello world', message: `I'm using Pug` });
});

app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany({
        select: { name: true, email: true }
    });
    res.render('users', { users });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});