"use client";

import { useContactModal } from "./ContactModalContext";
import { Button } from "./Button";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "whatsapp" | "nav";
type Size = "sm" | "md" | "lg";

export function OpenModalButton({
  variant = "primary",
  size = "md",
  className,
  children,
   onClick,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}) {
  const { openModal } = useContactModal();
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={openModal}
    >
      {children}
    </Button>
  );
}