import mongoose from "mongoose";

const UserShema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    firstname: String,
    lastname: String,
    password: String,
    avatar: String
});

export const User = mongoose.model("User", UserShema);