import express from "express";
import { verifyAuth } from "../middlewares/verifyAuth.middleware.js";
import { loginOrSignup, getMe } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/login", verifyAuth, loginOrSignup);
router.get("/me", verifyAuth, getMe);

export default router;
