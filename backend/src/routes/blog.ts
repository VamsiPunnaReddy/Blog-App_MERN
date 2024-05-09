import { createBlogInput, updateBlogInput } from "@vamsipunnareddy/mern-blog-craft";
import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";
import 'dotenv/config'
import { Blog } from "../model/db";
import { authMiddleware } from "../middlewares/auth";
import { CustomRequest, blog } from "../types/types";
import multer from "multer"

export const blogRouter = Router();

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

blogRouter.post("/create", authMiddleware, upload.single('file'), async (req, res) => {
    const body = req.body
    const mimeType = req.file?.mimetype;
    const base64String = req.file?.buffer.toString('base64');
    const dataUrl = `data:${mimeType};base64,${base64String}`;
    const { success } = createBlogInput.safeParse(body)
    if (!success) {
        return res.status(411).json({ message: "Invalid Inputs" })
    }

    try {
        const result = await cloudinary.uploader.upload(dataUrl, {
            folder: 'mernBlogCraft'
        })
        await Blog.create({
            title: body.title,
            description: body.description,
            content: body.content,
            image: {
                name: result.public_id,
                url: result.secure_url
            },
            author: req.body.username,
        })
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal Server Error" });
    }

})

blogRouter.get("/", async (req, res) => {
    const blogs = await Blog.find({})
    return res.json({ blogs })
})

blogRouter.get("/myblogs", authMiddleware, async (req: CustomRequest, res) => {
    const username = req.username

    try {
        const userBlogs = await Blog.find({ author: username })
        return res.status(200).json({ userBlogs })
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

blogRouter.get("/:id", async (req, res) => {
    const blogId = req.params.id

    try {
        const blog = await Blog.findById({ _id: blogId })
        return res.status(200).json({ blog })
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

blogRouter.put("/:id", authMiddleware, upload.single('file'), async (req: CustomRequest, res) => {
    const blogId = req.params.id
    const username = req.username
    const body: blog = req.body
    const mimeType = req.file?.mimetype;
    const base64String = req.file?.buffer.toString('base64');
    const dataUrl = `data:${mimeType};base64,${base64String}`;

    const { success } = updateBlogInput.safeParse(body)
    if (!success) {
        return res.status(411).json({ message: "Invalid Inputs" })
    }

    try {

        const result = await cloudinary.uploader.upload(dataUrl, {
            folder: 'mernBlogCraft'
        })
        const previousBlog = await Blog.findByIdAndUpdate(
            { _id: blogId, author: username },
            {
                $set: {
                    title: body.title,
                    description: body.description,
                    content: body.content,
                    image: {
                        name: result.public_id,
                        url: result.secure_url
                    },
                }

            },
            { new: false })
        if (!previousBlog) {
            return res.status(400).json({ message: "Cannot access it" });
        } else {
            try {
                await cloudinary.api.delete_resources([previousBlog.image?.name || ''])
                return res.status(200).json({ message: "Blog Updated successfully" });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "Internal Server Error" });
            }
        }


    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

blogRouter.delete("/:id", authMiddleware, async (req: CustomRequest, res) => {
    const blogId = req.params.id
    const username = req.username

    try {
        const deletedBlog = await Blog.findOneAndDelete({
            _id: blogId, author: username,
        });

        if (!deletedBlog) {
            return res.status(400).json({ message: "Cannot access it" });
        } else {
            try {
                await cloudinary.api.delete_resources([deletedBlog.image?.name || ''])
                return res.status(200).json({ message: "Blog Updated successfully" });
            } catch (e) {
                console.error(e);
                return res.status(500).json({ message: "Internal Server Error" });
            }
        }
    } catch (e) {
        console.error(e);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})