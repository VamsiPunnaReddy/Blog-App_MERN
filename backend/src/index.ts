import express from "express"
import cors from "cors"
import { userRouter } from "./routes/user";
import { blogRouter } from "./routes/blog";

const PORT = 3000;
const app = express()

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", userRouter)
app.use("/api/v1/blog", blogRouter)

app.get("/", (req, res) => {
    res.status(200).json({ hello: "World!" })
})

app.listen(PORT, () => {
    console.log(`Server Running on : http://localhost:${PORT}`);
});
