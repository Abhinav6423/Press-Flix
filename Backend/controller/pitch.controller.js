import Pitch from "../modals/pitchModal.js";
import User from "../modals/userModal.js";
import PitchVisit from "../modals/pitchVisitModal.js";
export const createPitch = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.emailVerified) {
            return res.status(403).json({ message: "Email not verified" });
        }

        const { title, category, data, slug } = req.body;

        if (!title || !data) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const baseSlug = title
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");

        const uniqueSlug =
            slug ||
            `${baseSlug}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

        const pitch = await Pitch.create({
            owner: req.user.id,
            title,
            data,
            slug: uniqueSlug,
        });

        user.createdPitches = user.createdPitches || [];
        user.totalPitches = user.totalPitches || 0;

        user.createdPitches.push(pitch._id);
        user.totalPitches += 1;

        await user.save();

        return res.status(201).json({
            message: "Pitch created successfully",
            pitch,
        });
    } catch (err) {
        console.error("createPitch error:", err);
        return res.status(500).json({ message: "Failed to create pitch" });
    }
};



export const getMyPitches = async (req, res) => {
    try {
        const pitches = await Pitch.find({
            owner: req?.user?.id,
        }).sort({ createdAt: -1 });

        res.json({
            success: true,
            data: pitches,
        });
    } catch (err) {
        console.error("getMyPitches error:", err);
        res.status(500).json({
            success: false,
            message: "Failed to fetch pitches",
        });
    }
};


export const getPublicPitch = async (req, res) => {
    try {
        // 1. Increment pitch views atomically
        const pitch = await Pitch.findOneAndUpdate(
            { slug: req.params.slug },
            { $inc: { "analytics.views": 1 } },
            { new: true }
        );

        if (!pitch) {
            return res.status(404).json({ message: "Pitch not found" });
        }

        // 2. Increment owner's total views (correct field)
        await User.findByIdAndUpdate(
            pitch.owner,
            { $inc: { totalViews: 1 } }   // ✅ correct field
        );

        res.json(pitch);

    } catch (err) {
        console.error("getPublicPitch error:", err);
        res.status(500).json({ message: "Failed to load pitch" });
    }
};



export const updatePitch = async (req, res) => {
    try {
        const pitch = await Pitch.findById(req.params.id);

        if (!pitch) {
            return res.status(404).json({ message: "Pitch not found" });
        }

        if (pitch.owner.toString() !== req.firebaseUid) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        Object.assign(pitch, req.body);
        await pitch.save();

        res.json(pitch);
    } catch (err) {
        console.error("updatePitch error:", err);
        res.status(500).json({ message: "Failed to update pitch" });
    }
};

export const deletePitch = async (req, res) => {
    try {
        const pitch = await Pitch.findById(req.params.id);

        if (!pitch) {
            return res.status(404).json({ message: "Pitch not found" });
        }

        if (pitch.owner.toString() !== req.firebaseUid) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        await pitch.deleteOne();
        res.json({ success: true });
    } catch (err) {
        console.error("deletePitch error:", err);
        res.status(500).json({ message: "Failed to delete pitch" });
    }
};



export const getPitchBySlug = async (req, res) => {
    try {
        const pitch = await Pitch.findOne({ slug: req.params.slug });

        if (!pitch) {
            return res.status(404).json({ message: "Pitch not found" });
        }

        res.json(pitch);
    } catch (err) {
        console.error("getPitchBySlug error:", err);
        res.status(500).json({ message: "Failed to fetch pitch" });
    }
};


export const topPerformingPitch = async (req, res) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const topPitch = await Pitch.findOne({ owner: req.user.id })
            .sort({ "analytics.views": -1, "analytics.ctaClicks": -1 });

        if (!topPitch) {
            return res.status(404).json({ message: "No pitches found" });
        }

        res.json(topPitch);
    } catch (error) {
        console.error("topPerformingPitch error:", error);
        res.status(500).json({ message: "Failed to fetch top pitch" });
    }
};


// Track unique visit
export const trackPitchVisit = async (req, res) => {
    try {
        const { pitchId, visitorId } = req.body;

        if (!pitchId || !visitorId) {
            return res.status(400).json({
                success: false,
                message: "pitchId and visitorId are required",
            });
        }

        // 🔥 Just try creating
        // If duplicate → MongoDB unique index will throw error
        await PitchVisit.create({
            pitchId,
            visitorId,
        });


        // 2. Increment owner's total views (correct field)
        await Pitch.findByIdAndUpdate(
            pitchId,
            { $inc: { "analytics.uniqueVisitors": 1 } }   // ✅ correct field
        );

        return res.status(201).json({
            success: true,
            message: "Visit tracked",
        });

    } catch (error) {

        // Duplicate key error (visitor already counted)
        if (error.code === 11000) {
            return res.status(200).json({
                success: true,
                message: "Visitor already counted",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};


// Get total unique visitors for a pitch
export const getUniqueVisitors = async (req, res) => {
    try {
        const { pitchId } = req.params;

        const count = await PitchVisit.countDocuments({
            pitchId,
        });

        return res.status(200).json({
            success: true,
            uniqueVisitors: count,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error",
        });
    }
};

