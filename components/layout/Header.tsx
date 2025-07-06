"use client";

import { Home, Search, PlusSquare, Heart, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export default function Header() {
  const { user, logout } = useAuth();
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (headerRef.current && navRef.current) {
      // Header entrance animation
      gsap.fromTo(
        headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "back.out(1.7)" },
      );

      // Nav buttons stagger animation
      gsap.fromTo(
        ".nav-button",
        { y: -20, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          delay: 0.3,
          ease: "back.out(1.7)",
        },
      );

      // Brand title animation
      gsap.fromTo(
        ".brand-title",
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, delay: 0.2, ease: "power2.out" },
      );
    }
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
    });
  };

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
