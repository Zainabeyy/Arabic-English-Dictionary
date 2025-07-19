import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  User,
} from "firebase/auth";

import { FirebaseError } from "firebase/app";
import { auth, googleProvider } from "../firebaseConfig";

type AuthResponse =
  | { success: true; user: User }
  | { success: false; code?: string; message: string };

// --- sign up function ---

export async function signUpWithEmail(
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> {
  try {
    const creds = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(creds.user, { displayName: name });
    return { success: true, user: creds.user };
  } catch (err) {
    if (err instanceof FirebaseError) {
      return {
        success: false,
        code: err.code,
        message: getFirebaseErrorMessage(err.code),
      };
    }
    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

// --- sign in function ---

export async function signInWithEmail(email: string, password: string) {
  try {
    const methods = await fetchSignInMethodsForEmail(auth, email);

    if (!methods.includes("password")) {
      return {
        success: false,
        code: "auth/no-password-method",
        message:
          "This account was created using Google. Please sign in with Google.",
      };
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return {
      success: true,
      user: userCredential.user,
    };
  } catch (err) {
    if (err instanceof FirebaseError) {
      return {
        success: false,
        code: err.code,
        message: err.message,
      };
    } else {
      return {
        success: false,
        code: "auth/unknown-error",
        message: "An unknown error occurred.",
      };
    }
  }
}

// --- sign in using google function ---

export async function signInWithGoogle(): Promise<AuthResponse> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { success: true, user: result.user };
  } catch (err) {
    if (err instanceof FirebaseError) {
      return {
        success: false,
        code: err.code,
        message: getFirebaseErrorMessage(err.code),
      };
    }
    return {
      success: false,
      message: "Google Sign-In failed. Please try again.",
    };
  }
}

// --- error messages ---

function getFirebaseErrorMessage(code: string): string {
  switch (code) {
    case "auth/email-already-in-use":
      return "Email is already in use.";
    case "auth/invalid-email":
      return "Invalid email address.";
    case "auth/user-not-found":
      return "No user found with this email.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/popup-closed-by-user":
      return "Sign-in popup closed before completing.";
    default:
      return "Something went wrong. Please try again.";
  }
}
