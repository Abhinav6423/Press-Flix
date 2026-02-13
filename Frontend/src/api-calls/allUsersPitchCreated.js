import api from "../api/api.js"

export const getAllUsersPitchCreated = async () => {
    try {
        const response = await api.get("api/pitch/me/all");

        return {
            success: true,
            data: response.data ?? null,
        };
    } catch (err) {
        console.error("getAllUsersPitchCreated error:", err);

        return {
            success: false,
            data: null,
            message:
                err?.response?.data?.message ||
                err?.message ||
                "Failed to fetch all users pitch created",
        };
    }
};