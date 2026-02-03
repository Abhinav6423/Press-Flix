import { auth } from "../firebase";

const API_BASE = import.meta.env.VITE_API_BASE_URL;
// example: http://localhost:5000

export const authFetch = async (url, options = {}) => {
  const user = auth.currentUser;

  if (!user) {
    throw new Error("User not authenticated");
  }

  const token = await user.getIdToken();

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error ${res.status}: ${text}`);
  }

  return res.json(); // 🔥 THIS WAS MISSING
};
