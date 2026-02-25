import api from "../api/api";

export const viewWaitlistData = async (slug) => {
    console.log(slug)
    try {
        const res = await api.get(`/api/waitlist/${slug}`);

        if (res.status === 200) {
            console.log('Waitlist data retrieved successfully:', res.data.data);
            return { success: true, data: res.data.data };
        } else {
            return { success: false, message: res.data.message || "Failed to retrieve waitlist data" };
        }
    } catch (error) {
        console.error("Error retrieving waitlist data:", error);
        const message =
            error.response?.data?.message ||
            "An error occurred while retrieving the waitlist data. Please try again.";
        return { success: false, message };
    }
}