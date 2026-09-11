import React from "react";
import { motion } from "motion/react";

interface ScrollReveal3DProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "zoom";
  id?: string;
}

export const ScrollReveal3D: React.FC<ScrollReveal3DProps> = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
  id
}) => {
  const getVariants = () => {
    switch (direction) {
      case "up":
        return {
          hidden: { opacity: 0, y: 60, rotateX: 15, scale: 0.95 },
          visible: { opacity: 1, y: 0, rotateX: 0, scale: 1 }
        };
      case "down":
        return {
          hidden: { opacity: 0, y: -60, rotateX: -15, scale: 0.95 },
          visible: { opacity: 1, y: 0, rotateX: 0, scale: 1 }
        };
      case "left":
        return {
          hidden: { opacity: 0, x: -60, rotateY: 15, scale: 0.95 },
          visible: { opacity: 1, x: 0, rotateY: 0, scale: 1 }
        };
      case "right":
        return {
          hidden: { opacity: 0, x: 60, rotateY: -15, scale: 0.95 },
          visible: { opacity: 1, x: 0, rotateY: 0, scale: 1 }
        };
      case "zoom":
        return {
          hidden: { opacity: 0, scale: 0.8, rotateX: 20 },
          visible: { opacity: 1, scale: 1, rotateX: 0 }
        };
      default:
        return {
          hidden: { opacity: 0, y: 40, scale: 0.96 },
          visible: { opacity: 1, y: 0, scale: 1 }
        };
    }
  };

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      variants={getVariants()}
      style={{ perspective: 1200 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
