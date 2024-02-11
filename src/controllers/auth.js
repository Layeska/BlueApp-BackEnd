import { User } from "../models/index.js";

function register(req, res) {
    console.log(req.body);
    res.status(201).send({msg: "Todo good"});
}

export const AuthController = {
    register
};
