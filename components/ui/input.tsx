import * as React from "react";

import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    if (type === "password") {
      return (
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            className={cn(
              "flex placeholder:items-center transition-all border-2 border-input/40 box-border outline-none focus:border-2 focus:border-input duration-300 ease h-10 w-full rounded-md bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            ref={ref}
            {...props}
          />
          <span className="absolute flex items-center justify-center right-3 top-1/2 -translate-y-1/2">
            <Button
              onClick={() => setShowPassword(!showPassword)}
              type="button"
              variant="ghost"
              size="icon"
              className="size-6"
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
        type={type}
        className={cn(
          "flex placeholder:items-center transition-all border-2 border-input/40 box-border outline-none focus:border-2 focus:border-input duration-300 ease h-10 w-full rounded-md bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
