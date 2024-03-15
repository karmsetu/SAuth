import mongoose, { connect } from "mongoose";
import dotenv from "dotenv";
import { user } from "../models/user.models.js";
// impoer user
dotenv.config();

export class DB {
    constructor(databaseName) {
        this.databaseName = databaseName;
    }
    connectToDB() {
        try {
            connect(`${process.env.DB_KEY}${this.databaseName}`);
            return { message: `successfuly connected` };
        } catch (error) {
            return { error: error.message };
        }
    }

    async addUser(userName) {
        try {
            return await user.insertMany(userName).then((res) => {
                message: res;
            });
            // const userId = user.find({ name: userName });
        } catch (error) {
            return { error: error.message };
        }
    }

    deleteUser(userId) {
        try {
            user.deleteOne(userId);
            return { message: `user with id:${userId} deleted successfully` };
        } catch (error) {
            return { error: error.message };
        }
    }
}

// function connectToDB(DBName) {
//     try {
//         mongoose.connect(`${process.env.DB_KEY}${DBName}`);
//         return { message: `successfuly connected` };
//     } catch (error) {
//         return { error: error.message };
//     }
// }

// function addUser(userName) {
//     try {
//         user.insertMany(userName);
//     } catch (error) {
//         return { error: error.message };
//     }
// }

// export { connectToDB, addUser };
