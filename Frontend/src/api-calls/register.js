import {
    createUserWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

export const signUpUser = async (email, password, username) => {
    try {
        // here we create user with email and password using firebase auth
        const userCred = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );
        // here userCred.user is the created user object from firebase auth 
        // ✅ Set display name (username)
        if (username) {
            await updateProfile(userCred.user, {  // here we update the profile of the user with the username 
                displayName: username,
            });
        }

        // ✅ Send verification email
        await sendEmailVerification(userCred.user, {
            url: window.location.origin + "/login",
        });

        // 🔐 Force logout until verified
        await signOut(auth);

        return {
            success: true,
            message:
                "Registration successful. Please verify your email before logging in.",
        };
    } catch (error) {
        const errorMap = {
            "auth/email-already-in-use": "This email is already registered.",
            "auth/weak-password": "Password should be at least 6 characters.",
            "auth/invalid-email": "Invalid email address.",
        };

        return {
            success: false,
            message:
                errorMap[error.code] ||
                error.message ||
                "Registration failed. Please try again.",
        };
    }
};
