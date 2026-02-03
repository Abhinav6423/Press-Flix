import admin from "../firebase/firebaseAdmin.js";
import User from "../modals/userModal.js";

const verifyFirebaseToken = async (req, res, next) => {
  try {
    // 1️⃣ Read Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    // 2️⃣ Extract Firebase ID token
    const firebaseToken = authHeader.split(" ")[1];
    console.log("Received Firebase Token:", firebaseToken);
    // 3️⃣ Verify token with Firebase Admin
    const decoded = await admin.auth().verifyIdToken(firebaseToken);
    console.log("Decoded Firebase Token:", decoded);
    // 4️⃣ Find user in DB using firebaseUid
    const user = await User.findOne({ firebaseUid: decoded.uid });
    console.log("User found in DB:", user);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // 5️⃣ Attach user to request
    req.user = user;
    console.log("User attached to request:", req.user);
    // 6️⃣ Continue
    next();
  } catch (error) {
    console.error("verifyFirebaseToken error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default verifyFirebaseToken;
