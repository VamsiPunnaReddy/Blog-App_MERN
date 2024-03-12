import express from "express"
import cors from "cors"
import { userRouter } from "./routes/user.js";
import { blogRouter } from "./routes/blog.js";
import { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url))

app.use(express.json())
app.use(cors({}))

app.use('/blogs', blogRouter)
app.use('/user', userRouter)
app.use('/uploads', express.static(__dirname + '/uploads'))

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.all('*', (req, res) => {
    res.status(404).send('Route not found');
});
