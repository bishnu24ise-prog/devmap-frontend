import * as React from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'glow' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", loading, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={loading || props.disabled}
        className={twMerge(
          "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 active:scale-95 focus:outline-none focus:ring-1 focus:ring-cyan-400 disabled:pointer-events-none disabled:opacity-50 font-outfit select-none",
          
          // Variants
          variant === "default" && "bg-cyan-400 text-slate-950 font-semibold shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:bg-cyan-300 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]",
          variant === "outline" && "border border-white/10 bg-transparent text-slate-100 hover:bg-white/5 hover:border-white/20",
          variant === "ghost" && "text-slate-300 hover:bg-white/5 hover:text-slate-50",
          variant === "destructive" && "bg-rose-500 text-slate-50 hover:bg-rose-600 shadow-[0_0_15px_rgba(244,63,94,0.2)]",
          variant === "glow" && "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.1)]",
          
          // Sizes
          size === "default" && "h-10 px-4 py-2",
          size === "sm" && "h-8 rounded-md px-3 text-xs",
          size === "lg" && "h-12 rounded-lg px-8 text-base",
          size === "icon" && "h-9 w-9 p-0",
          
          className
        )}
        {...props}
      >
        {loading ? (
          <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
