import React from "react";
import { Link } from "react-router-dom";

interface ButtonProps {
  id?: string;
  children: React.ReactNode;
  onClick?: () => void;
  to?: string;
  variant?: "primary" | "secondary" | "outline" | "white" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  id,
  children,
  onClick,
  to,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false
}) => {
  const baseStyle = "inline-flex items-center justify-center font-display font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap";
  
  const variants = {
    primary: "bg-brand-blue hover:bg-[#0070a6] text-white shadow-lg hover:shadow-brand-blue/20 shadow-brand-blue/10 border border-transparent",
    secondary: "bg-brand-navy hover:bg-[#102d54] text-white border border-transparent shadow-md",
    outline: "bg-transparent border border-brand-navy/15 hover:border-brand-blue text-brand-navy hover:bg-brand-blue/5",
    white: "bg-white hover:bg-brand-white border border-brand-navy/5 text-brand-navy shadow-md",
    ghost: "bg-transparent hover:bg-brand-navy/5 text-brand-navy border border-transparent"
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };

  const fullClass = `${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link id={id} to={to} className={fullClass}>
        {children}
      </Link>
    );
  }

  return (
    <button id={id} type={type} onClick={onClick} className={fullClass} disabled={disabled}>
      {children}
    </button>
  );
};
