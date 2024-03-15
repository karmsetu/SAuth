// Import the Express module

import express from "express";
// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();
// const createToken = require("./utils/createToken.mjs");
import { createToken, verifyToken } from "./utils/tokenHandeler.mjs";

// import { addUser, connectToDB } from "./utils/DBHandeler.js";
import { DB } from "./utils/DBHandeler.js";
// import { connect } from "mongoose";
// Create an instance of Express
const app = express();
app.use(express.json());

// Define a route handler for the root path
app.get("/", (req, res) => {
    res.send("up and running!");
});

const userDB = new DB(`SAuth`);
// requesting data for QR generation
app.get("/auth-token", (req, res) => {
    // const connect = connectToDB(`SAuth`);
    userDB.connectToDB();
    const user = userDB.addUser({
        name: "admin-class",
    });

    res.send(user);
    // console.log();
    const token = createToken({
        name: "shourya",
    });
    // res.send(token);
});

// checking token verification
app.get("/auth-check", (req, res) => {
    // console.log(req);
    const token = req.body.token;
    const decoded = verifyToken(token);
    console.log({ decoded });
    // if (decoded.error) res.send(decoded.error);
    res.send(decoded);
});

app.get("/auth-check/v2/:token", (req, res) => {
    const token = req.params.token;
    res.send(verifyToken(token));
});

app.delete("user/:id", (req, res) => {
    const userId = req.params.id;
});

// Define the port number for the server to listen on
const port = process.env.PORT || 3000;

// Start the server and listen for incoming connections
app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
});
