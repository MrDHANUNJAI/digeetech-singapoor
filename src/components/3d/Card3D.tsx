import React, { useState, useRef } from "react";
import { motion } from "motion/react";

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  depth?: number;
  glowColor?: string;
  onClick?: () => void;
  id?: string;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = "",
  depth = 20,
  glowColor = "rgba(14, 165, 233, 0.15)",
  onClick,
  id
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Mouse coordinates relative to card center (-1 to 1)
    const mouseX = (e.clientX - rect.left - width / 2) / (width / 2);
    const mouseY = (e.clientY - rect.top - height / 2) / (height / 2);

    // Calculate rotation angle (max 15 degrees)
    const rX = -mouseY * 12;
    const rY = mouseX * 12;

    setRotateX(rX);
    setRotateY(rY);

    // Glare position percentage
    const glareX = ((e.clientX - rect.left) / width) * 100;
    const glareY = ((e.clientY - rect.top) / height) * 100;
    setGlarePos({ x: glareX, y: glareY, opacity: 0.35 });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  return (
    <motion.div
      id={id}
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: 1000,
        transformStyle: "preserve-3d"
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        scale: isHovered ? 1.02 : 1,
        boxShadow: isHovered 
          ? `0 20px 40px -15px ${glowColor}, 0 0 20px 0 ${glowColor}`
          : "0 10px 30px -15px rgba(0, 0, 0, 0.05)"
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.5 }}
      className={`relative rounded-3xl transition-all duration-200 cursor-pointer overflow-hidden ${className}`}
    >
      {/* Specular Glare Overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-20 transition-opacity duration-300 rounded-3xl"
        style={{
          opacity: glarePos.opacity,
          background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 60%)`
        }}
      />

      {/* 3D Depth Layer Container */}
      <div 
        style={{ transform: `translateZ(${depth}px)`, transformStyle: "preserve-3d" }}
        className="relative z-10 w-full h-full"
      >
        {children}
      </div>
    </motion.div>
  );
};
