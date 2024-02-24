import {jwt} from "../utils/jwt.js";

function asureAuth(req, res, next) {
    if(!req.headers.authorization){
        return res.status(403).send({ msg: "No contiene autentificación"});
    }

    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);
    console.log("Pasando");

    try {
        const hasExpired = jwt.hashExpiredToken(token);

        if(hasExpired) {
            return res.status(400).send({ msg: "Token ha expirado"});
        }
        const payload = jwt.decode(token);
        console.log(payload)

        req.user = payload;
        next();

    } catch(error) {
        return res.status(400).send({ msg: "token invalido"});
    }
}

export const mdAuth = {
  asureAuth,
};
