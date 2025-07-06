"use client";

import { useState } from "react";
import { account } from "@/lib/appwrite";

export default function ConnectionTest() {
  const [status, setStatus] = useState<string>("Ready to test");
  const [testing, setTesting] = useState(false);

  const testAppwriteConnection = async () => {
    setTesting(true);
    setStatus("Testing connection...");

    try {
      console.log("🔍 Testing Appwrite connection...");
      console.log("Endpoint:", process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT);
      console.log("Project ID:", process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

      // Test basic connectivity
      const healthCheck = await fetch(
        (process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
          "https://syd.cloud.appwrite.io/v1") + "/health",
      );

      if (!healthCheck.ok) {
        throw new Error(`Health check failed: ${healthCheck.status}`);
      }

      console.log("✅ Health check passed");

      // Test account service
      try {
        await account.get();
        setStatus("✅ Connected! User is authenticated");
      } catch (authError: any) {
        if (authError.code === 401) {
          setStatus("✅ Connected! User not authenticated (normal)");
        } else {
          throw authError;
        }
      }
    } catch (error: any) {
      console.error("❌ Connection failed:", error);
      setStatus(`❌ Connection failed: ${error.message}`);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        background: "white",
        padding: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        zIndex: 1000,
        maxWidth: "300px",
      }}
    >
      <h3>🔧 Debug Panel</h3>
      <p style={{ fontSize: "0.875rem", margin: "0.5rem 0" }}>{status}</p>
      <button
        onClick={testAppwriteConnection}
        disabled={testing}
        style={{
          background: testing ? "#ccc" : "#667eea",
          color: "white",
          border: "none",
          padding: "0.5rem 1rem",
          borderRadius: "4px",
          cursor: testing ? "not-allowed" : "pointer",
        }}
      >
        {testing ? "Testing..." : "Test Connection"}
      </button>
    </div>
  );
}
