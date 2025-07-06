"use client";

import { Home, Search, PlusSquare, Heart, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <h1 className="brand-title">VibrantHub</h1>
        </div>

        <nav className="header-nav">
          <button className="nav-button">
            <Home size={24} />
          </button>
          <button className="nav-button">
            <Search size={24} />
          </button>
          <button className="nav-button">
            <PlusSquare size={24} />
          </button>
          <button className="nav-button">
            <Heart size={24} />
          </button>
          <button className="nav-button">
            <User size={24} />
          </button>
        </nav>

        <div className="header-user">
          <span className="user-welcome">Welcome, {user?.name}</span>
          <button onClick={logout} className="logout-button">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
