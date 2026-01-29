import admin from "../firebase/firebaseAdmin.js";

export const verifyAuth = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = header.split(" ")[1];
    const decoded = await admin.auth().verifyIdToken(token);

    // 🔥 GUARANTEED FIELDS
    req.firebaseUid = decoded.uid;
    req.firebaseUser = {
      email: decoded.email,
      name: decoded.name || decoded.email?.split("@")[0] || "User",
      avatar: decoded.picture || null,
    };

    console.log("✅ verifyAuth:", req.firebaseUid, req.firebaseUser.email);

    next();
  } catch (err) {
    console.error("❌ verifyAuth failed:", err.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};
