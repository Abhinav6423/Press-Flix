import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { loginOrSignup, getMe } from "../api-calls/api.auth";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
            // 🔹 Not logged in
            if (!firebaseUser) {
                setUser(null);
                setLoading(false);
                return;
            }

            // 🔐 Email not verified → treat as logged out
            if (!firebaseUser.emailVerified) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                // Sync Firebase user with backend
                await loginOrSignup();
                const me = await getMe();

                setUser({
                    ...me,
                    avatar: me.avatar || firebaseUser.photoURL || null,
                });
            } catch (err) {
                console.error("Auth sync failed:", err.message);
                setUser(null);
            } finally {
                setLoading(false);
            }
        });

        return unsub;
    }, []);

    // 🔥 LOGOUT
    const logout = async () => {
        await signOut(auth);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
