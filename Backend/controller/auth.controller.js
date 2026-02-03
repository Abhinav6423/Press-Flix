import User from "../modals/userModal.js";

import admin from "../firebase/firebaseAdmin.js";


export const firebaseLogin = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const firebaseToken = authHeader.split(" ")[1];

    // Verify Firebase ID token
    const decoded = await admin.auth().verifyIdToken(firebaseToken);

    console.log("✅ Firebase token verified:", decoded.email);

    let user = await User.findOne({ firebaseUid: decoded.uid });

    if (!user) {
      user = await User.create({
        firebaseUid: decoded.uid,
        email: decoded.email,
        name: decoded.name || decoded.email.split("@")[0],
      });

      return res.status(201).json({
        success: true,
        message: "User created successfully",
        user,
      });
    }

    // User already exists
    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      user,
    });

  } catch (error) {
    console.error("❌ Error during Firebase login:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const getLoggedInUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}


