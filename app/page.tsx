"use client";

import { useState } from "react";

export default function Home() {
  const [showApp, setShowApp] = useState(false);

  if (!showApp) {
    return (
      <div className="welcome-container">
        <div className="welcome-card">
          <h1 className="welcome-title">🚀 VibrantHub</h1>
          <p className="welcome-subtitle">Your Instagram Clone is Ready!</p>
          <div className="status-grid">
            <div className="status-item">
              <span className="status-icon">✅</span>
              <span>Next.js 14 Ready</span>
            </div>
            <div className="status-item">
              <span className="status-icon">✅</span>
              <span>GSAP Animations</span>
            </div>
            <div className="status-item">
              <span className="status-icon">✅</span>
              <span>Appwrite Configured</span>
            </div>
            <div className="status-item">
              <span className="status-icon">✅</span>
              <span>Responsive Design</span>
            </div>
          </div>
          <button onClick={() => setShowApp(true)} className="launch-button">
            Launch Instagram Clone
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="header-container">
          <h1 className="brand-title">VibrantHub</h1>
          <nav className="header-nav">
            <button className="nav-button">🏠 Home</button>
            <button className="nav-button">🔍 Search</button>
            <button className="nav-button">➕ Create</button>
            <button className="nav-button">❤️ Activity</button>
            <button className="nav-button">👤 Profile</button>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <div className="feed-container">
          <div className="post-card">
            <div className="post-header">
              <div className="post-user">
                <div className="user-avatar">👤</div>
                <span className="username">vibranthub_user</span>
              </div>
            </div>
            <div className="post-image-container">
              <div className="demo-image">🌅 Beautiful Demo Post</div>
            </div>
            <div className="post-actions">
              <button className="action-button">❤️ Like</button>
              <button className="action-button">💬 Comment</button>
              <button className="action-button">📤 Share</button>
            </div>
            <div className="post-info">
              <div className="likes-count">128 likes</div>
              <div className="post-caption">
                <span className="username">vibranthub_user</span> Welcome to
                VibrantHub! 🎉
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
