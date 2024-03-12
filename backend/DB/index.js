import mongoose from "mongoose";
import 'dotenv/config'


mongoose.connect(process.env.MONGODB_URL);

const BlogSchema = new mongoose.Schema({
    title: String,
    description: String,
    content: String,
    author: {
        type: mongoose.Schema.Types.String,
        ref: 'User'
    },
    imagePath: String,
    date: {
        type: Date,
        default: Date.now
    }
})

const UserSchema = new mongoose.Schema({
    fullName: String,
    username: { 
        type: String, 
        unique: true
    }, 
    email: {
        type: String,
        unique: true 
    },
    password: String,
})

export const Blog = mongoose.model('Blog', BlogSchema);
export const User = mongoose.model('User', UserSchema);