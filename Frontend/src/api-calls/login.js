import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import api from "../api/api"; // 🔥 axios instance with interceptor

export const loginUser = async (email, password) => {
    try {
        // 1️⃣ Firebase login
        const { user } = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        // 2️⃣ Email verified check
        if (!user.emailVerified) {
            throw new Error("Please verify your email before logging in.");
        }

        // 🔥 3️⃣ BACKEND LOGIN ROUTE CALL (VERY IMPORTANT)
        // token interceptor automatically attach karega
        await api.post("/auth/login");

        return {
            success: true,
            message: "User logged in successfully",
            user,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message || "Login failed. Please try again.",
        };
    }
};
