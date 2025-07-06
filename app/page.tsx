"use client";

import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/auth/LoginForm";
import Header from "@/components/layout/Header";
import Feed from "@/components/feed/Feed";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Home() {
  const { user, loading, connectionError, testConnection } = useAuth();
  const loadingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loading && loadingRef.current) {
      // Professional loading animation
      gsap.fromTo(
        ".loading-spinner",
        { rotation: 0 },
        { rotation: 360, duration: 1, repeat: -1, ease: "none" },
      );

      gsap.fromTo(
        ".loading-text",
        { opacity: 0.5 },
        {
          opacity: 1,
          duration: 1,
          yoyo: true,
          repeat: -1,
          ease: "power2.inOut",
        },
      );

      gsap.fromTo(
        loadingRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" },
      );
    }
  }, [loading]);

  if (loading) {
    return (
      <div ref={loadingRef} className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Connecting to VibrantHub...</p>
        {connectionError && (
          <div className="connection-error">
            <p>Connection timeout. Let's test the connection:</p>
            <button onClick={testConnection} className="test-button">
              Test Connection
            </button>
          </div>
        )}
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
