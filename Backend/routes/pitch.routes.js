import express from "express";
import { createPitch } from "../controller/pitch.controller.js";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";

const router = express.Router();

router.post("/", verifyFirebaseToken, createPitch);
// router.get("/", verifyFirebaseToken, getPitches);
// router.get("/:id", verifyAuth, getPitchById);

export default router;