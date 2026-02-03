import express from "express";
import  verifyFirebaseToken  from "../middlewares/verifyFirebaseToken.js";
import { firebaseLogin, getLoggedInUser } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/login", firebaseLogin);


router.get("/me", verifyFirebaseToken, getLoggedInUser);

export default router;
