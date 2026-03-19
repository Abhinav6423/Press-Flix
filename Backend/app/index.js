import express from "express";
import cors from "cors";
import connectDB from "../dbconfig/db.config.js";

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
            if (!origin) return callback(null, true);

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(null, true);
        },
        credentials: false,
        allowedHeaders: ["Content-Type", "Authorization"],
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "HEAD"],
    })
);

// ================== ROUTES ==================
import authRoutes from "../routes/auth.routes.js";
import pitchRoutes from "../routes/pitch.routes.js";
import waitlistRoutes from "../routes/waitlist.route.js";

app.use("/api/auth", authRoutes);        // 🔥 changed
app.use("/api/pitch", pitchRoutes);
app.use("/api/waitlist", waitlistRoutes);

// ================== ROOT ==================
app.get("/", (req, res) => {
    res.status(200).send("PressFlix backend running 🚀");
});

// ================== HEALTH ==================
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "Server is alive",
    });
});

app.head("/api/health", (req, res) => {
    res.status(200).end();
});

// ================== DB CONNECTION (CACHED) ==================
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null };
}

const connectOnce = async () => {
    if (cached.conn) return;
    cached.conn = await connectDB();
    console.log("✅ MongoDB connected");
};

// ================== EXPORT HANDLER ==================
export default async function handler(req, res) {
    await connectOnce();
    return app(req, res);
}