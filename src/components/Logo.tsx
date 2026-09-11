import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png";

interface LogoProps {
  id?: string;
  className?: string;
  iconOnly?: boolean;
  variant?: "default" | "light" | "dark" | "white";
  size?: "sm" | "md" | "lg" | "xl";
  showTagline?: boolean;
  stacked?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  id = "logo-link",
  className = "",
  iconOnly = false,
  variant = "default",
  size = "md",
  showTagline = true,
  stacked = false
}) => {
  // Color configuration based on variant
  const isLightText = variant === "light" || variant === "white" || variant === "dark";

  // Size mapping for the logo image
  const logoHeights = {
    sm: "h-8",
    md: "h-10 sm:h-11",
    lg: "h-14 sm:h-16",
    xl: "h-20 sm:h-24"
  };

  return (
    <Link
      id={id}
      to="/"
      className={`inline-flex items-center gap-2.5 group transition-all duration-300 ${
        stacked ? "flex-col text-center" : ""
      } ${className}`}
    >
      <div className="relative shrink-0 flex items-center justify-center">
        <img
          src={logoImg}
          alt="Digee Tech Logo"
          referrerPolicy="no-referrer"
          className={`${logoHeights[size]} w-auto object-contain transition-transform duration-300 group-hover:scale-105 rounded-lg`}
        />
      </div>

      {!iconOnly && (
        <div className={`flex flex-col ${stacked ? "items-center" : "items-start"}`}>
          {/* Fallback styling or subtle brand tagline if requested */}
          {showTagline && (
            <span
              className={`font-serif italic text-[10px] sm:text-xs font-semibold tracking-wide ${
                isLightText ? "text-slate-300" : "text-brand-blue"
              }`}
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Creating What's Next...
            </span>
          )}
        </div>
      )}
    </Link>
  );
};
