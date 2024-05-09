import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type blog = {
    title: string,
    description: string,
    content: string,
    file: File,
}

export interface CustomRequest extends Request {
    username?: string
}

export interface DecodedToken extends JwtPayload {
    username: string;
}