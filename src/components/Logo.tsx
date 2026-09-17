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

  // Size mapping for the logo image (increased sizes)
  const logoHeights = {
    sm: "h-10 sm:h-11",
    md: "h-12 sm:h-14",
    lg: "h-16 sm:h-18",
    xl: "h-22 sm:h-28"
  };

  return (
    <Link
      id={id}
      to="/"
      className={`inline-flex items-center gap-3 group transition-all duration-300 ${
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
        <div className={`flex flex-col justify-center ${stacked ? "items-center" : "items-start"}`}>
          <span
            className={`font-display font-extrabold text-lg sm:text-xl md:text-2xl tracking-tight leading-none ${
              isLightText ? "text-white" : "text-brand-navy"
            }`}
          >
            Digee Tech
          </span>
          {showTagline && (
            <span
              className={`font-serif italic text-[10px] sm:text-xs font-semibold tracking-wide mt-0.5 ${
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
