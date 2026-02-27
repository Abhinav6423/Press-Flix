import api from "../api/api.js"

export const getUniqueVisitors = async (pitchId) => {
    try {
        const res = await api.get(`/api/pitch/${pitchId}/visitors`);

        if (res.status === 200) {
            console.log("✅ Unique visitors count op:", res?.data?.uniqueVisitors);
            return { success: true, count: res?.data?.uniqueVisitors };
        }

        return { success: false, message: res.data.message || "Failed to get unique visitors count" };
    } catch (error) {
        console.error("❌ Error getting unique visitors count:", error);
        return { success: false, message: error.response?.data?.message || "Server error" };
    }
}

