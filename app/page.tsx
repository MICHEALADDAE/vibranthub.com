"use client";

import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/auth/LoginForm";
import Header from "@/components/layout/Header";
import Feed from "@/components/feed/Feed";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Feed />
      </main>
    </div>
  );
}
