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

  useEffect(() => {
    // Mock data for now
    setPosts([
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
