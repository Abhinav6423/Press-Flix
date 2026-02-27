import api from "../api/api.js";

function getVisitorId() {
    let id = localStorage.getItem("pf_vid");

    if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem("pf_vid", id);
    }

    return id;
}

export const trackUniqueVisitors = async (pitchId) => {
    try {
        const visitorId = getVisitorId();

        const res = await api.post(`/api/pitch/${pitchId}/visit`, {
            pitchId,
            visitorId

        });

        if (res.status === 201) {
            console.log("✅ Visitor tracked:", res.data.message);
            return { success: true };
        }

        return { success: false, message: res.data.message || "Failed to track visitor" };

    } catch (error) {
        console.error("❌ Error tracking visitor:", error);
        return { success: false, message: error.response?.data?.message || "Server error" };
    }
};

