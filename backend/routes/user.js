import { Router } from "express";
import { User } from "../DB/index.js";
import cookieParser from "cookie-parser";
import 'dotenv/config'
import { z } from "zod";
import { authMiddleware } from "../middleware/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const userRouter = Router();

const salt = bcrypt.genSaltSync(10)
const jwtSecretKey = process.env.JWT_SECRETKEY

userRouter.use(cookieParser())

userRouter.post('/signup', async (req, res) => {
    const userSchema = z.object({
        fullName: z.string().max(20),
        username: z.string().max(20),
        email: z.string().email(),
        password: z.string().min(8)
    })
    const { fullName, username, email, password } = req.body
    const valid = userSchema.safeParse(req.body)

    if (!valid.success) {
        res.status(404).json({ msg: "Inputs given are in valid" })
    }
    else {
        const userExists = await User.findOne({ username: username })
        if (userExists) {
            res.json({ msg: "Username Already Exists" })
        }
        else {
            const newUser = new User({
                fullName,
                username,
                email,
                password: bcrypt.hashSync(password, salt)
            });
            await newUser.save();
            res.json({ msg: "User signed up successfully" })
        }
    }
});

userRouter.post('/signin', async (req, res) => {
    const { username, password } = req.body
    const userExists = await User.findOne({ $or: [{ username: username }, { email: username }] })
    const isUserPass = bcrypt.compareSync(password, userExists.password)

    if (isUserPass) {
        const token = jwt.sign({ username: username }, jwtSecretKey)
        res.status(200).json({ token: token, username: userExists.username })
    }
    else
        res.status(401).json({ msg: "Username or password incorrect" })
});

userRouter.post('/signout', authMiddleware, async (req, res) => {
    res.json({ msg: "Signed out successfully" })
});


