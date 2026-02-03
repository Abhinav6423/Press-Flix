import api from "../api/api";

export const meRoute = async () => {
    try {
        const res = await api.get("/auth/me");
        console.log("meRoute response:", res.data);
        return res.data;
    } catch (err) {
        if (err.response?.status === 401) {
            console.warn("Unauthorized access to /auth/me");
            console.log("meRoute error response:", err.response.data);
            return { success: false };
        }
        throw err;
    }
};
