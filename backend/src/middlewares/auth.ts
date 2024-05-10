import jwt from "jsonwebtoken";
import 'dotenv/config'
import { Request, NextFunction, Response } from "express";
import { CustomRequest, DecodedToken } from "../types/types";

const jwtSecretKey = process.env.JWT_SECRET || ""


export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            console.log("no token")
            throw new Error();
        }

        const verified = jwt.verify(token, jwtSecretKey) as DecodedToken
        if (verified) {
            (req as CustomRequest).username = verified.username
            next();
        }
        else
            return res.status(401).json({ message: "User does not exist" })

    } catch (e) {
        console.error(e);
        return res.status(401).json({ message: "Internal Server Error" });
    }
}