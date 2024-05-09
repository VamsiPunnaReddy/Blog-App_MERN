import { signinInput, signupInput } from "@vamsipunnareddy/mern-blog-craft";
import { Router } from "express";
import { User } from "../model/db";
import { compareSync, genSaltSync, hashSync } from "bcrypt"
import 'dotenv/config'
import jwt from "jsonwebtoken";

export const userRouter = Router()
const salt = genSaltSync(10)
const jwtSecretKey: string = String(process.env.JWT_SECRET)

userRouter.post("/signup", async (req, res) => {
    const { fullName, username, email, password } = req.body
    const { success } = signupInput.safeParse(req.body)
    if (!success) {
        res.status(404).json({ message: "Invalid Inputs" })
    }

    try {
        const userExists = await User.findOne({ username, email })
        if (userExists) {
            res.json({ message: "Username or Email Already Exists" })
        }
        await User.create({
            fullName,
            username,
            email,
            password: hashSync(password, salt)
        });
        res.json({ message: "User signed up successfully" })

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" })
    }
})

userRouter.post("/signin", async (req, res) => {
    const { username, password } = req.body
    const { success } = signinInput.safeParse(req.body)
    if (!success) {
        res.status(404).json({ message: "Invalid Inputs" })
    }
    try {
        const userExists = await User.findOne({ $or: [{ username: username }, { email: username }] })
        if (!userExists) {
            res.status(401).json({ message: "No user found with this email or username" })
        }
        else {
            const isUserPass = compareSync(password, String(userExists.password))
            if (!isUserPass) {
                res.status(401).json({ message: "Username or password incorrect" })
            }
            const token = jwt.sign({ username }, jwtSecretKey)
            res.status(200).json({ token, username: userExists.username })
        }

    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" })
    }

})