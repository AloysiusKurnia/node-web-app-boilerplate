import express from 'express';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';


const app = express();
const port = 3000;

const prisma = new PrismaClient();

app.set('view engine', 'pug')
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});