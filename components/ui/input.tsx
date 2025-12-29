"use client";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    if (type === "password") {
      return (
        <div className="relative">
          <input
            className={cn(
              "ease box-border flex h-10 w-full rounded-md border-2 border-input/60 bg-background px-3 py-2 text-sm outline-none transition-all duration-300 file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:items-center placeholder:text-muted-foreground focus:border-2 focus:border-input disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
            ref={ref}
            type={showPassword ? "text" : "password"}
            {...props}
          />
          <span className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center justify-center">
            <Button
              className="size-6"
              onClick={() => setShowPassword(!showPassword)}
              size="icon"
              type="button"
              variant="ghost"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="sr-only">Toggle password</span>
            </Button>
          </span>
        </div>
      );
    }
    return (
      <input
        className={cn(
          "ease box-border flex h-10 w-full rounded-md border-2 border-input/40 bg-background px-3 py-2 text-sm outline-none transition-all duration-300 file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:items-center placeholder:text-muted-foreground focus:border-2 focus:border-input disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        type={type}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
