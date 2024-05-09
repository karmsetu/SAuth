import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { DataBase } from './database/main.js';
import generateQRCode from './utils/QRgenerator.js';
const app = express();
app.use(express.json());

// service
const database = new DataBase();
const db = await database.connectToMongoDb();
// const userDB = db.getDatabase('SAuth');
app.post('/sign-up', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password)
        res.send({ error: `insufficient protocol` }).sendStatus(400);
    try {
        const data = await database.addUser(username, password, `SAuth`);
        res.send(data);
    } catch (error) {
        res.send(error);
    }
});

app.get('/sign-in', async (req, res) => {
    const { email, password } = req.body;
    const loginResponse = await database.loginUser(email, password, `SAuth`);
    if (!loginResponse.success) {
        res.send({ error: loginResponse.message }).sendStatus(400);
    }

    res.json(loginResponse);
});
// API
// service

app.post('/service/register', async (req, res) => {
    const { name } = req.body;
    try {
        const data = await serviceDataBase.registerService(name);
        res.send(data);
    } catch (error) {
        res.send({ success: false, message: 'Internal server error' });
    }
});

app.get('/service/get-qr', async (req, res) => {
    const { id } = req.body;
    await generateQRCode(id);
});
app.get('/', (req, res) => {
    res.send({ data: `hello` });
});

app.listen(process.env.PORT || 3000, (err) => {
    if (err) throw new Error(`err: ${err}`);
    console.log(`listening to port http://localhost:${process.env.PORT}`);
});
