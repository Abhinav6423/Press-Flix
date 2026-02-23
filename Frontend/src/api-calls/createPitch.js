import api from "../api/api.js";

export const createPitchApi = async ({ title, data, slug }) => {
  try {
    const res = await api.post("/api/pitch", {
      title,
      data,
      slug,
    });

    return {
      success: true,
      data: res.data,
    };
  } catch (err) {
    console.error("Create Pitch Error:", err?.response || err.message);

    // Unauthorized
    if (err.response?.status === 401) {
      return { success: false, message: "Unauthorized" };
    }

    // Network / server down
    if (!err.response) {
      return {
        success: false,
        message: "Network error. Please check your connection.",
      };
    }

    // Backend error message
    return {
      success: false,
      message:
        err.response?.data?.message || "Failed to create pitch",
    };
  }
};
