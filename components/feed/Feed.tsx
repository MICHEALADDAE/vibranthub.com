"use client";

import { useState, useEffect, useRef } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

export default function Feed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const feedRef = useRef<HTMLDivElement>(null);
  const postsRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Mock data for now
    const mockPosts = [
      {
        id: "1",
        username: "johndoe",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop",
        caption: "Beautiful sunset at the beach 🌅",
        likes: 128,
        liked: false,
        timeAgo: "2 hours ago",
      },
      {
        id: "2",
        username: "jansmith",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b332a8a0?w=150&h=150&fit=crop&crop=face",
        image:
          "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=600&h=600&fit=crop",
        caption: "Morning coffee vibes ☕️",
        likes: 89,
        liked: true,
        timeAgo: "5 hours ago",
      },
      {
        id: "3",
        username: "alexphoto",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        image:
          "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=600&h=600&fit=crop",
        caption: "City lights and urban vibes ✨",
        likes: 256,
        liked: false,
        timeAgo: "1 day ago",
      },
    ];

    setPosts(mockPosts);

    // Animate posts loading
    setTimeout(() => {
      gsap.fromTo(
        ".post-card",
        {
          y: 100,
          opacity: 0,
          scale: 0.8,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".feed-container",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }, 100);
  }, []);

  const handleLike = (postId: string, buttonElement: HTMLButtonElement) => {
    const wasLiked = posts.find((p) => p.id === postId)?.liked;

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

    // Heart animation
    const tl = gsap.timeline();

    if (!wasLiked) {
      // Like animation
      tl.to(buttonElement, {
        scale: 1.3,
        duration: 0.1,
        ease: "power2.out",
      })
        .to(buttonElement, {
          scale: 1,
          duration: 0.3,
          ease: "elastic.out(1, 0.3)",
        })
        .to(
          buttonElement.querySelector("svg"),
          {
            fill: "#ff3040",
            duration: 0.2,
          },
          0,
        );

      // Create floating hearts
      for (let i = 0; i < 3; i++) {
        const heart = document.createElement("div");
        heart.innerHTML = "❤️";
        heart.style.position = "absolute";
        heart.style.fontSize = "12px";
        heart.style.pointerEvents = "none";
        heart.style.zIndex = "1000";

        const rect = buttonElement.getBoundingClientRect();
        heart.style.left = rect.left + Math.random() * 20 + "px";
        heart.style.top = rect.top + "px";

        document.body.appendChild(heart);

        gsap.to(heart, {
          y: -50,
          x: (Math.random() - 0.5) * 40,
          opacity: 0,
          scale: 0.5,
          duration: 1.5,
          ease: "power2.out",
          onComplete: () => heart.remove(),
        });
      }
    } else {
      // Unlike animation
      tl.to(buttonElement, {
        scale: 0.8,
        duration: 0.1,
      }).to(buttonElement, {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
      });
    }
  };

  return (
    <div className="feed-container">
      {posts.map((post) => (
        <div key={post.id} className="post-card">
          <div className="post-header">
            <div className="post-user">
              <img
                src={post.avatar}
                alt={post.username}
                className="user-avatar"
              />
              <span className="username">{post.username}</span>
            </div>
            <button className="more-button">
              <MoreHorizontal size={20} />
            </button>
          </div>

          <div className="post-image-container">
            <img src={post.image} alt="Post" className="post-image" />
          </div>

          <div className="post-actions">
            <div className="action-buttons">
              <button
                onClick={() => handleLike(post.id)}
                className={`action-button ${post.liked ? "liked" : ""}`}
              >
                <Heart size={24} fill={post.liked ? "#ff3040" : "none"} />
              </button>
              <button className="action-button">
                <MessageCircle size={24} />
              </button>
              <button className="action-button">
                <Send size={24} />
              </button>
            </div>
            <button className="action-button">
              <Bookmark size={24} />
            </button>
          </div>

          <div className="post-info">
            <div className="likes-count">{post.likes} likes</div>
            <div className="post-caption">
              <span className="username">{post.username}</span> {post.caption}
            </div>
            <div className="post-time">{post.timeAgo}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
