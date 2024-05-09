import mongoose from "mongoose";
import 'dotenv/config'

const databaseUrl = process.env.MONGODB_URL || ""

mongoose.connect(databaseUrl);

const BlogSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    content: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.String,
        ref: 'User'
    },
    image: {
        name: {
            type: String
        },
        url: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const UserSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
})

export const Blog = mongoose.model('Blog', BlogSchema);
export const User = mongoose.model('User', UserSchema);