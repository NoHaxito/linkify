import Balance from "react-wrap-balancer";
import { pickChildren } from "@/lib/children";
import { cn } from "@/lib/utils";

function PageHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [childrenWithoutActions, actions] = pickChildren(
    children,
    PageHeaderActions
  );
  return (
    <div
      className={cn("flex items-center justify-between gap-x-2", className)}
      {...props}
    >
      <div>{childrenWithoutActions}</div>
      {actions}
    </div>
  );
}

function PageHeaderTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn("font-bold text-lg tracking-tight md:text-2xl", className)}
      {...props}
    />
  );
}

function PageHeaderDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <Balance
      className={cn("text-muted-foreground text-xs sm:text-sm", className)}
      {...props}
    />
  );
}

function PageHeaderActions({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center justify-center gap-2", className)}
      {...props}
    />
  );
}

export {
  PageHeader,
  PageHeaderTitle,
  PageHeaderDescription,
  PageHeaderActions,
};
