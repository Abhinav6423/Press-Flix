import mongoose from "mongoose";

const PitchSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        // category: {
        //     type: String,
        //     required: true,
        // },

        slug: {
            type: String,
            unique: true,
            required: true,
        },

        analytics: {
            views: { type: Number, default: 0 },
            ctaClicks: { type: Number, default: 0 },
            waitlistCount: { type: Number, default: 0 },
            uniqueVisitors: { type: Number, default: 0 },
        },

        // ctaLink: {
        //     label: String,
        //     url: String,
        // },

        // 🔥 IMPORTANT
        data: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },

        waitlist: {
            type: Boolean,
            default: false,
        }
    },
    { timestamps: true }
);

export default mongoose.model("Pitch", PitchSchema);
