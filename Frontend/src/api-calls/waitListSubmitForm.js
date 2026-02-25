import api from "../api/api";

export const submitWaitListForm = async (formData , pitchId) => {
    try {
        const res = await api.post(`/api/waitlist/${pitchId}`, formData);
        if (res.status === 201) {
            console.log('Waitlist form submitted successfully:', res.data);
            return { success: true, message: res.data.message };
        } else {
            return { success: false, message: res.data.message || "Failed to submit form" };
        }
    } catch (error) {
        console.error("Error submitting waitlist form:", error);
        const message =
            error.response?.data?.message ||
            "An error occurred while submitting the form. Please try again.";
        return { success: false, message };
    }
}