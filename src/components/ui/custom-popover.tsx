"use client";

import { cn } from "@/lib/utils";
import type { Placement } from "@popperjs/core";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";

interface CustomPopoverProps {
  children: React.ReactNode;
  className?: string;
}

interface CustomPopoverTriggerProps {
  disabled?: boolean;
  children: (() => React.ReactNode) | React.ReactNode;
  className?: string;
}
interface CustomPopoverContentProps {
  children: React.ReactNode;
  className?: string;
  sideOffset?: number;
  align?: "start" | "center" | "end";
}

const CustomPopoverContext = React.createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLElement | null>; // ✅ Allow null
  contentRef: React.RefObject<HTMLDivElement | null>; // ✅ Allow null
}>({
  open: false,
  setOpen: () => {},
  triggerRef: React.createRef<HTMLElement>(),
  contentRef: React.createRef<HTMLDivElement>(),
});

export function CustomPopover({ children, className }: CustomPopoverProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <CustomPopoverContext.Provider
      value={{ open, setOpen, triggerRef, contentRef }}
    >
      <div className={cn("relative inline-block", className)}>{children}</div>
    </CustomPopoverContext.Provider>
  );
}

export function CustomPopoverTrigger({
  disabled = false,
  children,
  className,
}: CustomPopoverTriggerProps) {
  const { setOpen, triggerRef } = React.useContext(CustomPopoverContext);

  return (
    <div
      ref={triggerRef as any}
      onClick={() => {
        if (!disabled) {
          setOpen((prev) => !prev);
        }
      }}
      className={className}
      aria-disabled={disabled}
    >
      {typeof children === "function"
        ? (children as () => React.ReactNode)()
        : children}
    </div>
  );
}

export function CustomPopoverContent({
  children,
  className,
  sideOffset = 5,
  align = "center",
}: CustomPopoverContentProps) {
  const { open, triggerRef, contentRef } =
    React.useContext(CustomPopoverContext);
  const [mounted, setMounted] = useState(false);

  const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(
    null
  );

  const getPlacement = (): Placement => {
    if (align === "start") return "bottom-start";
    if (align === "end") return "bottom-end";
    return "bottom";
  };

  const { styles, attributes } = usePopper(triggerRef.current, popperElement, {
    placement: getPlacement(),
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, sideOffset],
        },
      },
    ],
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      ref={(el) => {
        setPopperElement(el);
        if (contentRef) {
          contentRef.current = el;
        }
      }}
      style={styles.popper}
      {...attributes.popper}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        className
      )}
      onClick={(e) => e.stopPropagation()}
      aria-hidden={!open}
    >
      {children}
    </div>,
    document.body
  );
}

export function CustomPopoverClose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { setOpen } = React.useContext(CustomPopoverContext);

  return (
    <div
      className={cn("cursor-pointer", className)}
      onClick={(e) => {
        e.stopPropagation();
        setOpen(false);
      }}
      role="button"
      aria-label="Close"
    >
      {children}
    </div>
  );
}
