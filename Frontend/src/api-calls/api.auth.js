import { authFetch } from "../lib/authFetch";

export const loginOrSignup = () =>
    authFetch("/auth/login", { method: "POST" });

export const getMe = () =>
    authFetch("/auth/me");
