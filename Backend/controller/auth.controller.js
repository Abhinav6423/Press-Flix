import User from "../modals/userModal.js";

/**
 * POST /auth/login
 * Firebase already authenticated the user (via middleware)
 * This endpoint:
 *  - blocks unverified emails
 *  - creates user on first login
 *  - syncs Firebase UID
 *  - returns DB user
 */
export const loginOrSignup = async (req, res) => {
  try {
    const { firebaseUid, firebaseUser } = req;

    // 🔐 HARD BLOCK: email must be verified
    if (!firebaseUser.emailVerified) {
      return res.status(403).json({
        message: "Email not verified. Please verify your email to continue.",
      });
    }

    const user = await User.findOneAndUpdate(
      { email: firebaseUser.email },
      {
        $setOnInsert: {
          email: firebaseUser.email,
          name: firebaseUser.name || "User",
          avatar: firebaseUser.avatar || null,
          pagesCreated: 0,
        },
        $set: {
          firebaseUid,
        },
      },
      {
        new: true,
        upsert: true,
      }
    );


    return res.status(200).json(user);
  } catch (err) {
    console.error("loginOrSignup error:", err);
    return res.status(500).json({ message: "Auth sync failed" });
  }
};

/**
 * GET /auth/me
 * Returns current authenticated user
 */
export const getMe = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.firebaseUid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json(user);
  } catch (err) {
    console.error("getMe error:", err);
    return res.status(500).json({ message: "Failed to fetch user" });
  }
};
