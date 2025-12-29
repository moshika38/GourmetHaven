"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { auth } from "@/config/firebase";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";

interface AuthContextType {
  user: FirebaseUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth anywhere
export const useAuth = () => useContext(AuthContext);
