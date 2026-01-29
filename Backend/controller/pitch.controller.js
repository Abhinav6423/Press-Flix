import Pitch from "../models/Pitch.js";

export const createPitch = async (req, res) => {
    try {
        const { title, category, data, slug } = req.body;

        const pitch = await Pitch.create({
            owner: req.user._id || req.userId || req.firebaseUid, // depending on your setup
            title,
            category,
            data,
            slug: slug || `${title.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
        });

        return res.status(201).json(pitch);
    } catch (err) {
        console.error("createPitch error:", err);
        return res.status(500).json({ message: "Failed to create pitch" });
    }
};

export const getMyPitches = async (req, res) => {
    try {
        const pitches = await Pitch.find({
            owner: req.firebaseUid,
        }).sort({ createdAt: -1 });

        res.json(pitches);
    } catch (err) {
        console.error("getMyPitches error:", err);
        res.status(500).json({ message: "Failed to fetch pitches" });
    }
};

export const getPublicPitch = async (req, res) => {
    try {
        const pitch = await Pitch.findOne({
            slug: req.params.slug,
        });

        if (!pitch) {
            return res.status(404).json({ message: "Pitch not found" });
        }

        // 🔥 Increment views
        pitch.analytics.views += 1;
        await pitch.save();

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
        await Pitch.findByIdAndUpdate(req.params.id, {
            $inc: { "analytics.ctaClicks": 1 },
        });

        res.json({ success: true });
    } catch (err) {
        console.error("trackCtaClick error:", err);
        res.status(500).json({ message: "Failed to track click" });
    }
};
