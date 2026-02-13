import api from "../api/api.js";

export const getTopPerformingPitch = async () => {
    try {
        const response = await api.get("api/pitch/me/top");

        return {
            success: true,
            data: response.data ?? null,
        };
    } catch (err) {
        console.error("getTopPerformingPitch error:", err);

        return {
            success: false,
            data: null,
            message:
                err?.response?.data?.message ||
                err?.message ||
                "Failed to fetch top pitch",
        };
    }
};
