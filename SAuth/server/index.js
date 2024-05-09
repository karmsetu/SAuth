import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import { DataBase } from './database/main.js';
import generateQRCode from './utils/QRgenerator.js';
import { v2 as cloudinary } from 'cloudinary';

// import { createRouteHandler } from 'uploadthing/express';
// import { uploadRouter } from './src/uploadthing.js';

(async function () {
    // Configuration
    cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret, // Click 'View Credentials' below to copy your API secret
    });

    // Upload an image
    // const uploadResult = await cloudinary.uploader
    //     .upload(
    //         'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
    //         {
    //             public_id: 'shoes',
    //         }
    //     )
    //     .catch((error) => {
    //         console.log(error);
    //     });

    // console.log(uploadResult);
})();

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
    const response = await database.getQRURL(id);
    console.log({ response });
    res.send({ url: response.url });
});
app.get('/', (req, res) => {
    res.send({ data: `hello` });
});

app.listen(process.env.PORT || 3000, (err) => {
    if (err) throw new Error(`err: ${err}`);
    console.log(`listening to port http://localhost:${process.env.PORT}`);
});
