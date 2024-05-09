import jwt from "jsonwebtoken";
import 'dotenv/config'
import { NextFunction, Response } from "express";
import { CustomRequest, DecodedToken } from "../types/types";

const jwtSecretKey: string = String(process.env.JWT_SECRETKEY)


export async function authMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
    try {
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            throw new Error();
        }

        const verified = jwt.verify(token, jwtSecretKey) as DecodedToken
        if (verified) {
            req.username = verified.username
            next();
        }
        else
            res.status(401).json({ msg: "User does not exist" })

    } catch (e) {
        console.error(e);
        res.status(401).json({ msg: "" });
    }
}