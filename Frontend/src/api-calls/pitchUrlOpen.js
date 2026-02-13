// api-calls/getPitch.js
import api from "../api/api";

export const getPitchBySlugApi = async (slug) => {
  try {
    const res = await api.get(`/api/pitch/public/${slug}`);
    return { success: true, data: res.data };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Failed to load pitch",
    };
  }
};
