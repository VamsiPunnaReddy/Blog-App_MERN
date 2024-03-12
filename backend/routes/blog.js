import { Router } from "express";
import jwt from "jsonwebtoken";
export const blogRouter = Router();
import { authMiddleware } from "../middleware/auth.js";
import multer from "multer";
import cookieParser from "cookie-parser";
import { Blog, User } from "../DB/index.js";
import fs from "fs"

const uploadMiddleware = multer({ dest: 'uploads/' })

blogRouter.use(cookieParser())

blogRouter.post('/create', authMiddleware, uploadMiddleware.single('image'), async (req, res) => {
    console.log(req.file)
    req.body.author = req.username;
    const { originalname, path } = req.file;
    const ext = originalname.split('.');
    const extension = ext[ext.length - 1]
    req.body.imagePath = req.file.path + '.' + extension

    const blogDataByUser = req.body;
    console.log(req.body.title)
    await Blog.create(blogDataByUser)
    fs.renameSync(path, req.body.imagePath);

    res.json({ msg: "blog uploaded successfully" })
})

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({})
    res.json({ blogs: blogs })
})

blogRouter.get('/myblogs', authMiddleware, async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.decode(token);
    const userBlogs = await Blog.find({ author: user.username })
    console.log(userBlogs)
    res.json({ userBlogPosts: userBlogs })
})
 
blogRouter.get('/:id', async (req, res) => {
    const blogId = req.params.id
    console.log(blogId)
    const requiredBlog = await Blog.findById(blogId)
    console.log(requiredBlog)
    res.json(requiredBlog)
}) 

blogRouter.put('/:id', authMiddleware, uploadMiddleware.single('image'), async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.decode(token);
    const blogId = req.params.id;
    req.body.imagePath = req.file.path
    const { title, description, content, imagePath } = req.body;
    console.log(title, description, content, imagePath)
    const previousBlog = await Blog.findOneAndUpdate(
        { _id: blogId, author: user.username },
        {
            $set: {
                title,
                description,
                content,
                imagePath,
            } 

        },
        { new: false }
    )
    if (previousBlog) {
        try {
            fs.copyFileSync(req.file.path, previousBlog.imagePath);
            fs.unlinkSync(previousBlog.imagePath);
        } catch (err) {
            console.error('Error replacing file:', err);
        }
        res.json({ msg: "Blog Updated successflly" })
    }

    else
        res.json({ msg: "Cannot access it" })
})

blogRouter.delete('/:id', authMiddleware, async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const user = jwt.decode(token);
    const blogId = req.params.id;
    const deletedBlog = await Blog.findOneAndDelete({ _id: blogId, author: user.username })

    if (deletedBlog) {
        try {
            fs.unlinkSync(deletedBlog.imagePath);
        } catch (err) {
            console.error('Error removing file:', err);
        }
        res.json({ msg: "Blog deleted successfully" })
    }

    else
        res.json({ msg: "Cannot access it" })
})
