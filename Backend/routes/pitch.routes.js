console.log("✅ Pitch routes file loaded");

import express from "express";
import {
    createPitch,
    getPitchBySlug,
    getPublicPitch,
    updatePitch,
    deletePitch,
    trackCtaClick,
    topPerformingPitch,
    getMyPitches
} from "../controller/pitch.controller.js";

import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Pitch routes working");
})

/* =========================
   CREATE
========================= */
router.post("/", verifyFirebaseToken, createPitch);

/* =========================
   USER PRIVATE ROUTES
========================= */
router.get("/me/all", verifyFirebaseToken, getMyPitches);
router.get("/me/top", verifyFirebaseToken, topPerformingPitch);

/* =========================
   PUBLIC ROUTES
========================= */
router.get("/public/:slug", getPublicPitch);
router.get("/slug/:slug", getPitchBySlug);

/* =========================
   ANALYTICS
========================= */
router.post("/:id/cta", trackCtaClick);

/* =========================
   DYNAMIC ID ROUTES (ALWAYS LAST)
========================= */
router.put("/:id", verifyFirebaseToken, updatePitch);
router.delete("/:id", verifyFirebaseToken, deletePitch);

export default router;
