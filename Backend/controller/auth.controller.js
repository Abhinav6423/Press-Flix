import User from "../modals/userModal.js";

/**
 * POST /auth/login
 * Firebase already authenticated the user.
 * This endpoint:
 *  - creates user if first login
 *  - returns DB user
 */

/**
 * POST /auth/login
 * Called once after Firebase auth
 * This is the ONLY place that creates users
 */
export const loginOrSignup = async (req, res) => {
  try {
    const { firebaseUid, firebaseUser } = req;

    console.log("🔥 loginOrSignup UID:", firebaseUid);

    const user = await User.findOneAndUpdate(
      { email: firebaseUser.email },
      {
        $setOnInsert: {
          email: firebaseUser.email,
          name: firebaseUser.name,
          avatar: firebaseUser.avatar,
          pagesCreated: 0,
        },
        $set: {
          firebaseUid, // ✅ ONLY HERE
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




export const getMe = async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.firebaseUid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("getMe error:", err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
};



