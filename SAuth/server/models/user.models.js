import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
});

export const user = mongoose.model("User", UserSchema);
