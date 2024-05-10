import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export type signup = {
    fullName: string,
    username: string,
    email: string,
    password: string
}

export type signin = {
    username: string,
    password: string
}

export type blog = {
    title: string,
    description: string,
    content: string,
}

export interface CustomRequest extends Request {
    username?: string
}

export interface DecodedToken extends JwtPayload {
    username?: string;   
}