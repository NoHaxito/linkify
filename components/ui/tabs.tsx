"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { VariantProps } from "tailwind-variants";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { cn } from "@/lib/utils";
import { tv } from "tailwind-variants"; // Migrate from cva to tv pending.

const tabsVariants = tv({
  slots: {
    list: "group inline-flex h-10 items-center justify-center rounded-md p-1 text-muted-foreground",
    trigger:
      "gap-2 inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-300 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:text-neutral-900 dark:focus-visible:ring-white  dark:data-[state=active]:text-white",
    indicator:
      "absolute flex rounded-lg items-center left-0 w-[var(--radix-tab-active-width)] translate-x-[var(--radix-tab-active-left)] transition-[width,transform] duration-300",
  },
  variants: {
    variant: {
      solid: {
        list: "rounded-lg bg-secondary dark:bg-secondary/50",
        indicator: "-z-[2] h-[var(--radix-tab-active-height)] bg-muted",
        trigger:
          "data-[state=active]:bg-neutral-200 dark:data-[state=active]:bg-neutral-800",
      },
      underline: {
        // list: "border-b dark:border-neutral-800 shrink-0",
        list: "relative",
        indicator: "bottom-0 h-[2px] bg-foreground",
        trigger: "",
      },
    },
    disableAnimation: {
      true: {
        indicator: "transition-none",
      },
      false: {
        indicator: "",
      },
    },
  },
  defaultVariants: {
    variant: "solid",
    disableAnimation: false,
  },
});

type TabsVariant = VariantProps<typeof tabsVariants>;

const { indicator, list, trigger } = tabsVariants();

interface TabsContextProps {
  value: string | null;
  variant: TabsVariant["variant"];
  disableAnimation: TabsVariant["disableAnimation"];
}

const TabsContext = React.createContext<TabsContextProps>({
  value: null,
  variant: "solid",
  disableAnimation: false,
});
function useTabsContext(): { context: TabsContextProps } {
  const context = React.useContext(TabsContext);

  if (!context) {
    throw new Error(
      "Tabs components must be used within a Tabs or Tabs.Root component",
    );
  }

  return { context };
}

export interface TabsProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>,
    TabsVariant {}
const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  TabsProps
>(
  (
    {
      activationMode = "automatic",
      children,
      variant,
      disableAnimation,
      ...props
    },
    ref,
  ) => {
    const [value, setValue] = useControllableState({
      defaultProp: props.defaultValue,
      prop: props.value,
      onChange: props.onValueChange,
    });
    return (
      <TabsPrimitive.Root
        activationMode={activationMode}
        onValueChange={setValue}
        ref={ref}
        value={value}
        {...props}
      >
        <TabsContext.Provider
          value={{ value: value ?? null, variant, disableAnimation }}
        >
          {children}
        </TabsContext.Provider>
      </TabsPrimitive.Root>
    );
  },
);
Tabs.displayName = TabsPrimitive.Root.displayName;

export type TabsListProps = React.ComponentPropsWithoutRef<
  typeof TabsPrimitive.List
>;
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  TabsListProps
>(({ children, className, ...props }, ref) => {
  const id = React.useId();
  const { context } = useTabsContext();
  const [activeTab, setActiveTab] = React.useState<{
    width: undefined | null | number;
    height: undefined | null | number;
    top: undefined | null | number;
    left: undefined | null | number;
  }>({
    width: null,
    height: null,
    top: null,
    left: null,
  });
  React.useEffect(() => {
    if (context.value === null) {
      const activeNode = document
        .getElementById(id)
        ?.querySelectorAll<HTMLButtonElement>(`[role="tab"]`);
      setActiveTab({
        width: activeNode?.[0].offsetWidth,
        height: activeNode?.[0].offsetHeight,
        top: activeNode?.[0].offsetTop,
        left: activeNode?.[0].offsetLeft,
      });
    } else {
      const activeNode = document
        .getElementById(id)
        ?.querySelector<HTMLButtonElement>(`[role="tab"][data-state="active"]`);
      setActiveTab({
        width: activeNode?.offsetWidth,
        height: activeNode?.offsetHeight,
        top: activeNode?.offsetTop,
        left: activeNode?.offsetLeft,
      });
    }
  }, [context.value]);
  return (
    <TabsPrimitive.List
      className={cn(list({ variant: context.variant, className }))}
      id={id}
      ref={ref}
      {...props}
    >
      {children}
      <div
        className={cn(
          indicator({
            variant: context.variant,
            disableAnimation: context.disableAnimation,
          }),
        )}
        style={{
          ["--radix-tab-active-width" as string]: !activeTab.width
            ? null
            : `${activeTab.width}px`,
          ["--radix-tab-active-height" as string]: !activeTab.height
            ? null
            : `${activeTab.height}px`,
          ["--radix-tab-active-left" as string]: !activeTab.left
            ? null
            : `${activeTab.left}px`,
          ["--radix-tab-active-top" as string]: !activeTab.top
            ? null
            : `${activeTab.top}px`,
        }}
      />
    </TabsPrimitive.List>
  );
});
TabsList.displayName = TabsPrimitive.List.displayName;

interface TabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  TabsTriggerProps
>(({ children, className, left, right, ...props }, ref) => {
  const { context } = useTabsContext();
  return (
    <TabsPrimitive.Trigger
      className={cn(trigger({ variant: context.variant, className }))}
      ref={ref}
      {...props}
    >
      {left ? left : null}
      {children}
      {right ? right : null}
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className,
    )}
    ref={ref}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
