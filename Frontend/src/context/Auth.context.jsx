import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { meRoute } from "../api-calls/meRoute";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false); // 🔥 KEY

  const fetchUserData = useCallback(async () => {
    try {
      const result = await meRoute();
      console.log("Fetched user data:", result);

      if (result?.success) {
        setUserData(result.user);
      } else {
        setUserData(null);
      }
    } catch {
      setUserData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // 1️⃣ Firebase auth listener (ONLY sets authReady)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setUserData(null);
        setLoading(false);
        setAuthReady(false);
        return;
      }

      setAuthReady(true); // ✅ firebase user confirmed
    });

    return unsubscribe;
  }, []);

  // 2️⃣ Backend call (ONLY ONCE when authReady becomes true)
  useEffect(() => {
    if (authReady) {
      fetchUserData();
    }
  }, [authReady, fetchUserData]);

  const logoutUser = async () => {
    await signOut(auth);
    setUserData(null);
    setAuthReady(false);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        loading,
        reloadUserData: fetchUserData,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
