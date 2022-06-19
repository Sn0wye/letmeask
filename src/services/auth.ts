import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";

const googleAuthProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const result = await signInWithPopup(auth, googleAuthProvider);
  const { displayName, photoURL, uid } = result.user;
  if (!displayName || !photoURL || !uid) {
    throw new Error("User is does not have enough data");
  }
  return {
    name: displayName,
    avatar: photoURL,
    id: uid,
  };
};
