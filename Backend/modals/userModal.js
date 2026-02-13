import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firebaseUid: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },

    // ✅ ADD THIS FIELD
    emailVerified: {
      type: Boolean,
      default: false,
    },

    totalPitches: {
      type: Number,
      default: 0,
    },
    topPerformingPitch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pitch",
    },
    totalViews: {
      type: Number,
      default: 0,
    },
    totalCtaClicks: {
      type: Number,
      default: 0,
    },
    createdPitches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pitch",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
