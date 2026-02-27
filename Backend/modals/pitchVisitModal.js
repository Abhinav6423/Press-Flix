import mongoose, { Schema } from "mongoose";
const pitchVisitSchema = new Schema(
    {
        pitchId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Pitch",
            required: true,
        },
        visitorId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// 🔥 Prevent duplicate visitor per pitch
pitchVisitSchema.index(
    { pitchId: 1, visitorId: 1 },
    { unique: true }
);

const PitchVisit = mongoose.model("PitchVisit", pitchVisitSchema);

export default PitchVisit;