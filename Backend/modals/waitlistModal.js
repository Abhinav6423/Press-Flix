import mongoose from "mongoose";

const waitlistSchema = new mongoose.Schema(
    {
        // 🔗 Idea / Pitch reference
        pitch: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pitch",
            required: true,
            index: true,
        },

        // 👤 User info (optional but useful)
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true,
            index: true,
        },

        name: {
            type: String,
            trim: true,
        },

        // 📊 VALIDATION SIGNALS (Core)
        // wouldUse: {
        //     type: String,
        //     enum: ["yes", "maybe", "no"],
        // },

        // wouldPay: {
        //     type: Boolean,
        // },

        // priceExpectation: {
        //     type: Number, // store ₹ / $ value
        //     min: 0,
        // },

        // 💬 Feedback / Insight
        feedback: {
            type: String,
            trim: true,
            maxlength: 1000,
        },

        // 🌐 Traffic / Source tracking
        source: {
            type: String, // direct / twitter / linkedin / reddit / etc
            default: "direct",
            index: true,
        },

        // 🧠 Behavior flags (optional but powerful)
        // isEarlyAdopter: {
        //     type: Boolean,
        //     default: false,
        // },

        // 🚫 Anti-spam / duplicate protection
        ipHash: {
            type: String, // hash IP, don’t store raw IP (privacy)
        },

        userAgent: {
            type: String,
        },

        // 📅 Metadata
        joinedAt: {
            type: Date,
            default: Date.now,
            index: true,
        },
    },
    { timestamps: true }
);

// 🚀 Prevent duplicate email per pitch
waitlistSchema.index({ pitch: 1, email: 1 }, { unique: true });

export default mongoose.model("waitlist", waitlistSchema);