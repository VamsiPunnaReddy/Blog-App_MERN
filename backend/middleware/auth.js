import jwt from "jsonwebtoken";
import 'dotenv/config'

const jwtSecretKey = process.env.JWT_SECRETKEY

export async function authMiddleware(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];

    const verified = jwt.verify(token, jwtSecretKey)
    if (verified) {
        req.username = verified.username
        next();
    }
    else
        res.status(401).json({ msg: "User does not exist" })
}