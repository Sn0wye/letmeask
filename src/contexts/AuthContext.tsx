import { ReactNode, createContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { signInWithGoogle } from "../services/auth";
import { auth } from "../services/firebase";
import { AuthContextType, User } from "../types/Auth";

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, photoURL, uid } = user;
        if (!displayName || !photoURL || !uid) {
          throw new Error("User is does not have enough data");
        }
        setUser({
          name: displayName,
          avatar: photoURL,
          id: uid,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    await signInWithGoogle().then((loggedUser) => {
      setUser(loggedUser);
    });
  };
  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {props.children}
    </AuthContext.Provider>
  );
}
