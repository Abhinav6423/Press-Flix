import api from "../api/api";

export const trackCtaClick = async (id) => {
    try {
        const response = await api.get(`/api/pitch/${id}/cta`);  // ✅ POST + id param
        return {
            success: true,
            // data: response.data ?? null,
        };
    } catch (err) {
        console.error("trackCtaClick error:", err);

        return {
            success: false,
            data: null,
            message:
                err?.response?.data?.message ||
                err?.message ||
                "Failed to track CTA click",
        };
    }
};

