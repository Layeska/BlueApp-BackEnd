import jsonwebtoken from "jsonwebtoken";

const SECRET = process.env.SECRET || "ana";

function createAccessToket(user) {
    const expToken = new Date();

    expToken.setHours(expToken.getHours() + 24);

    const payload = {
        token_type: "access",
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime()
    }

    return jsonwebtoken.sign(payload, SECRET);
}

function createRefreshToken(user) {
    const expToken = new Date();

    expToken.setMonth(expToken.getMonth() + 1);

    const payload = {
        token_type: "refresh",
        user_id: user._id,
        iat: Date.now(),
        exp: expToken.getTime()
    }

    return jsonwebtoken.sign(payload, SECRET);
}

function decode(token) {
    return jsonwebtoken.decode(token, SECRET, true);
}

function hashExpiredToken(token) {
    const t = decode(token);
    const { exp } = decode(token);
    const currentDate = new Date().getTime();

    if(exp <= currentDate) {
        return true;
    }

    return false;
}

export const jwt = {
    createAccessToket,
    createRefreshToken,
    decode,
    hashExpiredToken
}