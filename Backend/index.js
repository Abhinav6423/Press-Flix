import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors";
import connectDB from "./dbconfig/db.config.js";
const app = express();

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: false,
        allowedHeaders: ["Content-Type", "Authorization"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    })
);



//db

connectDB();

const port = process.env.PORT || 8000;

//auth routes 
import authRoutes from "./routes/auth.routes.js"
app.use("/auth", authRoutes);

//test route
app.get("/", (req, res) => {
    res.send("hello world");
})


//listen
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})