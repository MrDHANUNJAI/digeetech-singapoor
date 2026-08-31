import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = "", iconOnly = false }) => {
  return (
    <Link id="logo-link" to="/" className={`flex items-center gap-3 group transition-opacity ${className}`}>
      {/* Abstract technical double-arrow forward connectivity mesh */}
      <svg
        id="digeetech-svg-logo"
        className="w-8 h-8 transition-transform duration-500 group-hover:rotate-6"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 8L16 14L26 8L16 22L6 8Z"
          fill="url(#logo-grad-1)"
          opacity="0.8"
        />
        <path
          d="M6 14L16 20L26 14L16 28L6 14Z"
          fill="url(#logo-grad-2)"
        />
        <circle cx="16" cy="14" r="2.5" fill="#ffffff" />
        <circle cx="6" cy="8" r="1.5" fill="#008bce" />
        <circle cx="26" cy="8" r="1.5" fill="#008bce" />
        <circle cx="16" cy="22" r="2" fill="#008bce" />
        <circle cx="16" cy="28" r="2" fill="#ffffff" />
        <defs>
          <linearGradient id="logo-grad-1" x1="6" y1="8" x2="26" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#008bce" />
            <stop offset="1" stopColor="#051830" />
          </linearGradient>
          <linearGradient id="logo-grad-2" x1="6" y1="14" x2="26" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#008bce" />
            <stop offset="1" stopColor="#00b4d8" />
          </linearGradient>
        </defs>
      </svg>
      
      {!iconOnly && (
        <span id="digeetech-text-logo" className="font-display font-bold text-xl tracking-tight text-brand-navy">
          Digee<span className="text-brand-blue">tech</span>
        </span>
      )}
    </Link>
  );
};
