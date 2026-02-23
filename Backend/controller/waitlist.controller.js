import Waitlist from "../modals/waitlistModal.js";
import Pitch from "../modals/pitchModal.js";

export const submitWaitlistFormData = async (req, res) => {
    try {
        const { pitchId } = req.params;
        let {
            email,
            name,
            suggestion,
            // source,
        } = req.body;

        if (!pitchId) {
            return res.status(400).json({ message: "Pitch ID is required" });
        }

        if (!email) {
            return res
                .status(400)
                .json({ message: "Email is required" });
        }

        // Normalize input
        email = email.toLowerCase().trim();
        name = name?.trim();
        suggestion = suggestion?.trim();
        source = source || "direct";
        // priceExpectation = Number(priceExpectation) || 0;

        // 1. Check pitch exists
        const pitch = await Pitch.findById(pitchId);
        if (!pitch) {
            return res.status(404).json({ message: "Pitch not found" });
        }

        // 2. Auto early-adopter detection
        // const waitlistCount = await Waitlist.countDocuments({ pitch: pitchId });
        // const isEarlyAdopter = waitlistCount < 50; // first 50 users

        // 3. Create waitlist entry (unique index prevents duplicate)
        const entry = await Waitlist.create({
            pitch: pitchId,
            email,
            name,
            suggestion,
            // source,
            //   isEarlyAdopter,
        });

        // 4. Update pitch analytics
        await Pitch.findByIdAndUpdate(pitchId, {
            $inc: { "analytics.waitlistCount": 1 },
        });

        return res.status(201).json({
            message: "Successfully added to waitlist",
            data: entry,
        });
    } catch (error) {
        // Duplicate email protection (unique index)
        if (error.code === 11000) {
            return res
                .status(409)
                .json({ message: "Already joined waitlist for this idea" });
        }

        console.error("Waitlist error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getWaitlistEntries = async (req, res) => {
    try {
        const { pitchId } = req.params;

        if (!pitchId) {
            return res.status(400).json({ message: "Pitch ID is required" });
        }

        const entries = await Waitlist.find({ pitch: pitchId }).sort({
            joinedAt: -1,
        });

        if (!entries || entries.length === 0) {
            return res.status(404).json({ message: "No waitlist entries found" });
        }

        return res.status(200).json({ data: entries });
    } catch (error) {
        console.error("Error fetching waitlist entries:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}