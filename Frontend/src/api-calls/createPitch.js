import api from "../api/api.js";

export const createPitchApi = async ({ title, category, data, slug }) => {
  try {
    const res = await api.post("/api/pitch", {
      title,
      category,
      data,
      slug,
    });

    return {
      success: true,
      data: res.data,
    };
  } catch (err) {
    if (err.response?.status === 401) {
      return { success: false, message: "Unauthorized" };
    }

    return {
      success: false,
      message:
        err.response?.data?.message || "Failed to create pitch",
    };
  }
};
