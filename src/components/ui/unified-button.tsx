
import React from "react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface UnifiedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  icon?: LucideIcon;
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "default" | "lg";
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

const UnifiedButton = React.forwardRef<HTMLButtonElement, UnifiedButtonProps>(
  ({ children, onClick, onMouseEnter, onMouseLeave, icon: Icon, variant = "outline", size = "default", className, disabled, type = "button" }, ref) => {
    const baseClasses = "font-medium transition-all duration-200 modern-shadow hover:modern-shadow-lg active:scale-95";
    
    const variantClasses = {
      primary: "bg-brand-primary text-white hover:opacity-90",
      outline: "border-neutral-300 text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:border-neutral-700",
      ghost: "hover:bg-neutral-100 dark:hover:bg-neutral-800"
    };

    return (
      <Button
        ref={ref}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        variant={variant === "primary" ? "default" : variant}
        size={size}
        disabled={disabled}
        type={type}
        className={cn(
          baseClasses,
          variantClasses[variant],
          className
        )}
      >
        {Icon && <Icon className="w-4 h-4 mr-2" />}
        {children}
      </Button>
    );
  }
);

UnifiedButton.displayName = "UnifiedButton";

export default UnifiedButton;
