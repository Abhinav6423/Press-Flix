import Pitch from "../modals/pitchModal.js";
import User from "../modals/userModal.js";

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

        if (!title || !category || !data) {
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
            category,
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

export const trackCtaClick = async (req, res) => {
    try {
        const pitch = await Pitch.findByIdAndUpdate(req.params.id, {
            $inc: { "analytics.ctaClicks": 1 },
        });

        await User.findByIdAndUpdate(
            pitch.owner,

            { $inc: { totalCtaClicks: 1 } }   // ✅ correct field
        );

        res.json({ success: true, message: "Click tracked successfully" });
    } catch (err) {
        console.error("trackCtaClick error:", err);
        res.status(500).json({ message: "Failed to track click" });
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

