import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./dbconfig/db.config.js";

const app = express();
app.set("trust proxy", 1);

// ================== MIDDLEWARES ==================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
    "http://localhost:5173",
    "https://press-flix.vercel.app",
];

app.use(
    cors({
        origin: function (origin, callback) {
            // allow requests with no origin (UptimeRobot, Postman, curl, Render internal)
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            // allow health check + safe public requests
            return callback(null, true);
        },
        credentials: false,
        allowedHeaders: ["Content-Type", "Authorization"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
    })
);

// ================== DATABASE ==================
connectDB();

// ================== ROUTES ==================
const port = process.env.PORT || 8000;

// Auth routes
import authRoutes from "./routes/auth.routes.js";
app.use("/auth", authRoutes);

// Pitch routes
import pitchRoutes from "./routes/pitch.routes.js";
console.log("Pitch routes loaded successfully ✅");
app.use("/api/pitch", pitchRoutes);

// ================== ROOT ==================
app.get("/", (req, res) => {
    res.status(200).send("PressFlix backend running 🚀");
});

// ================== HEALTH CHECK ==================
app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Server is alive",
        timestamp: new Date().toISOString(),
    });
});

// Handle UptimeRobot HEAD requests (prevents false 503)
app.head("/health", (req, res) => {
    res.status(200).end();
});

// ================== SERVER ==================
app.listen(port, () => {
    console.log(`Server running on port ${port} 🚀`);
});
