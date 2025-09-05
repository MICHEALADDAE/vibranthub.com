"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import { Models } from "appwrite";

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  connectionError: boolean;
  testConnection: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    // Add timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (loading) {
        console.log("⏰ Loading timeout reached");
        setLoading(false);
        setConnectionError(true);
      }
    }, 10000); // 10 second timeout

    checkUser().finally(() => {
      clearTimeout(timeout);
    });

    return () => clearTimeout(timeout);
  }, []);

  const checkUser = async () => {
    try {
      console.log("🔍 Checking user authentication...");
      const currentUser = await account.get();
      console.log("✅ User authenticated:", currentUser.name);
      setUser(currentUser);
    } catch (error) {
      console.log("ℹ️ User not authenticated (this is normal for first visit)");
      console.log("Error details:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    console.log("🔐 Attempting to login...");
    await account.createEmailPasswordSession(email, password);
    console.log("✅ Login successful");
    await checkUser();
  };

  const register = async (email: string, password: string, name: string) => {
    console.log("📝 Attempting to register...");
    await account.create("unique()", email, password, name);
    console.log("✅ Registration successful");
    await login(email, password);
  };

  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
  };

  const testConnection = async (): Promise<boolean> => {
    try {
      console.log("🧪 Testing Appwrite connection...");
      // Test the connection by trying to get account info
      await account.get();
      console.log("✅ Connection test successful");
      setConnectionError(false);
      return true;
    } catch (error) {
      // If we get a 401, connection is working but user not authenticated
      if (error instanceof Error && error.message.includes("401")) {
        console.log("✅ Connection working (user not authenticated)");
        setConnectionError(false);
        return true;
      }
      console.error("❌ Connection test failed:", error);
      setConnectionError(true);
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        loading,
        connectionError,
        testConnection,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
