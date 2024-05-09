import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { DataBase } from './database/main.js';
const app = express();
app.use(express.json());

// service
const database = new DataBase(`SAuth`);
database.connectDB();
app.post('/sign-up', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        res.send({ error: `insufficient protocol` }).sendStatus(400);
    try {
        const data = await database.addUser(username, password);
        res.send(data);
    } catch (error) {
        res.send(error);
    }
});

app.get('/sign-in', async (req, res) => {
    const { email, password } = req.body;
    const loginResponse = await database.loginUser(email, password);
    res.json(loginResponse);
});
// API
app.get('/', (req, res) => {
    res.send({ data: `hello` });
});

app.listen(process.env.PORT || 3000, (err) => {
    if (err) throw new Error(`err: ${err}`);
    console.log(`listening to port http://localhost:${process.env.PORT}`);
});
