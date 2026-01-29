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
            if (!firebaseUser) {
                setUser(null);
                setLoading(false);
                return;
            }

            try {
                await loginOrSignup();
                const me = await getMe();

                console.log("FIREBASE photoURL:", firebaseUser.photoURL);
                console.log("ME FROM BACKEND:", me);

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


    // 🔥 LOGOUT LOGIC
    const logout = async () => {
        await signOut(auth);   // Firebase logout
        setUser(null);         // Clear app state
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
