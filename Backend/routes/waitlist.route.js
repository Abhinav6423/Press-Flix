import express from "express";
import { submitWaitlistFormData, getWaitlistEntries } from "../controller/waitlist.controller.js";
import verifyFirebaseToken from "../middlewares/verifyFirebaseToken.js";
const router = express.Router();


router.post("/:pitchId", submitWaitlistFormData);
router.get("/:pitchId", verifyFirebaseToken, getWaitlistEntries);

export default router;  