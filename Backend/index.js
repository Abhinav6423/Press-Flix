import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors";
import connectDB from "./dbconfig/db.config.js";
const app = express();

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
    "http://localhost:5173",
    "https://press-flix.vercel.app", // 🔥 your Vercel domain
];

app.use(
    cors({
        origin: function (origin, callback) {

            // allow requests with no origin (mobile apps, curl, postman)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
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

//pitch routes
import pitchRoutes from "./routes/pitch.routes.js"
console.log('Pitch routes loaded successfully ✅')
app.use("/api/pitch", pitchRoutes);

//test route
app.get("/", (req, res) => {
    res.send("hello world");
})


//listen
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})