import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        firebaseUid: {
            type: String,
            index: true,   // ✅ indexed, NOT unique
        },
        email: {
            type: String,
            required: true,
            unique: true,  // ✅ ONLY unique field
        },
        name: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
        },
        pagesCreated: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model("User", UserSchema);
