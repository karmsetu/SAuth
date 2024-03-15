// const jwt = require("jsonwebtoken");
// require("dotenv").config();

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

function createToken(payload) {
    try {
        const token = jwt.sign(payload, process.env.SECRET_KEY);
        return token;
    } catch (error) {
        return { error: error.message };
    }
}

function verifyToken(token) {
    try {
        const decoded = jwt.decode(token, process.env.SECRET_KEY);
        return decoded;
    } catch (error) {
        return { error: error.message };
    }
    y;
}

export { createToken, verifyToken };
