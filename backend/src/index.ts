import express from "express"
import "dotenv"
import cors from "cors"
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";

const PORT = process.env.PORT || 5000;
const app = express()

app.use(cors());
app.use(express.json());

app.use("api/v1/user", userRouter)
app.use("api/v1/blog", blogRouter)

app.get("/", (req, res) => {
    res.status(200).json({ hello: "World!" })
})

app.listen(PORT, (): void => console.log(`Server is running on PORT http://localhost:${PORT}`));

app.all('*', (req, res) => {
    res.status(404).send('Route not found');
});