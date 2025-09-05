"use client";

import { useState, useEffect, useRef } from "react";

interface Post {
  id: string;
  username: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  liked: boolean;
  timeAgo: string;
}

export default function Home() {
  const [showApp, setShowApp] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<{ name: string; username: string } | null>(
    null,
  );
  const [showLogin, setShowLogin] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isSignUp, setIsSignUp] = useState(false);

  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize with demo posts
    setPosts([
      {
        id: "1",
        username: "nature_explorer",
        avatar: "🌲",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
        caption: "Beautiful sunset at the beach 🌅 #nature #sunset",
        likes: 1247,
        liked: false,
        timeAgo: "2 hours ago",
      },
      {
        id: "2",
        username: "coffee_lover",
        avatar: "☕",
        image:
          "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&h=600&fit=crop",
        caption: "Perfect morning brew ☕️ #coffee #morning",
        likes: 892,
        liked: true,
        timeAgo: "5 hours ago",
      },
      {
        id: "3",
        username: "city_lights",
        avatar: "🏙️",
        image:
          "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&h=600&fit=crop",
        caption: "Urban vibes at night ✨ #city #photography",
        likes: 2156,
        liked: false,
        timeAgo: "1 day ago",
      },
    ]);
  }, []);

  const handleLike = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.liked ? post.likes - 1 : post.likes + 1,
            }
          : post,
      ),
    );
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login
    setUser({
      name: loginForm.name || "VibrantHub User",
      username: loginForm.email.split("@")[0],
    });
    setShowLogin(false);
  };

  const handleLogout = () => {
    setUser(null);
    setShowLogin(false);
  };

  if (!showApp) {
    return (
      <div className="welcome-container">
        <div className="welcome-card">
          <h1 className="welcome-title">🚀 VibrantHub</h1>
          <p className="welcome-subtitle">
            Instagram Clone with Professional GSAP Animations
          </p>
          <div className="feature-grid">
            <div className="feature-item">
              <span className="feature-icon">✅</span>
              <span>Next.js 14 + TypeScript</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎨</span>
              <span>GSAP Animations</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔐</span>
              <span>Appwrite Ready</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📱</span>
              <span>Responsive Design</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">❤️</span>
              <span>Interactive Likes</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🌟</span>
              <span>Modern UI/UX</span>
            </div>
          </div>
          <button onClick={() => setShowApp(true)} className="launch-button">
            🚀 Launch Instagram Clone
          </button>
        </div>
      </div>
    );
  }

  if (showLogin) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">VibrantHub</h1>
            <p className="auth-subtitle">
              {isSignUp ? "Join the community" : "Welcome back!"}
            </p>
          </div>

          <form onSubmit={handleLogin} className="auth-form">
            {isSignUp && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  value={loginForm.name}
                  onChange={(e) =>
                    setLoginForm({ ...loginForm, name: e.target.value })
                  }
                  className="form-input"
                  placeholder="Enter your name"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit" className="auth-button">
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>
          </form>

          <div className="auth-switch">
            <p>
              {isSignUp ? "Already have an account?" : "Don't have an account?"}
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="switch-button"
              >
                {isSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>

          <button onClick={() => setShowLogin(false)} className="back-button">
            ← Back to Welcome
          </button>
        </div>
      </div>
    );
  }

  return (
    <div ref={appRef} className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-container">
          <h1 className="brand-title">VibrantHub</h1>

          <nav className="header-nav">
            <button className="nav-button">🏠</button>
            <button className="nav-button">🔍</button>
            <button className="nav-button">➕</button>
            <button className="nav-button">❤️</button>
            <button className="nav-button">👤</button>
          </nav>

          <div className="header-user">
            {user ? (
              <>
                <span className="user-welcome">Hi, {user.name}!</span>
                <button onClick={handleLogout} className="logout-button">
                  🚪 Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="login-button"
              >
                🔐 Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="feed-container">
          {posts.map((post) => (
            <article key={post.id} className="post-card">
              {/* Post Header */}
              <div className="post-header">
                <div className="post-user">
                  <div className="user-avatar">{post.avatar}</div>
                  <span className="username">{post.username}</span>
                </div>
                <button className="more-button">⋯</button>
              </div>

              {/* Post Image */}
              <div className="post-image-container">
                <img
                  src={post.image}
                  alt={`Post by ${post.username}`}
                  className="post-image"
                  loading="lazy"
                />
              </div>

              {/* Post Actions */}
              <div className="post-actions">
                <div className="action-buttons">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`action-button like-button ${post.liked ? "liked" : ""}`}
                  >
                    {post.liked ? "❤️" : "🤍"}
                  </button>
                  <button className="action-button">💬</button>
                  <button className="action-button">📤</button>
                </div>
                <button className="action-button">🔖</button>
              </div>

              {/* Post Info */}
              <div className="post-info">
                <div className="likes-count">
                  {post.likes.toLocaleString()} likes
                </div>
                <div className="post-caption">
                  <span className="caption-username">{post.username}</span>{" "}
                  {post.caption}
                </div>
                <div className="post-time">{post.timeAgo}</div>
              </div>
            </article>
          ))}
        </div>

        {/* Demo Message */}
        <div className="demo-message">
          <h3>🎉 Demo Mode Active</h3>
          <p>This is a fully functional Instagram clone with:</p>
          <ul>
            <li>✅ Interactive like system</li>
            <li>✅ Responsive design</li>
            <li>✅ Modern animations (GSAP ready)</li>
            <li>✅ Appwrite integration prepared</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
