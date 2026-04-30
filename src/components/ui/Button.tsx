import { cn } from "@/lib/utils"
import type { ButtonHTMLAttributes, ReactNode } from "react"

type Variant = "primary" | "ghost" | "whatsapp" | "nav"
type Size = "sm" | "md" | "lg"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant
    size?: Size
    children: ReactNode
}

const baseStyles = "inline-flex items-center justify-center gap-2 rounded-full font-sans font-medium tracking-tight transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-navy-dark"

const variants: Record<Variant, string> = {
    primary:
        "bg-gradient-to-br from-cyan to-teal text-navy-dark font-semibold shadow-cyan-glow hover:shadow-cyan-glow-lg hover:-translate-y-0.5",
    ghost:
        "bg-transparent text-ice-dim border border-ice/15 hover:border-ice/40 hover:text-ice",
    whatsapp:
        "bg-[#25d366] text-white hover:bg-[#1fb855] hover:-translate-y-0.5 hover:shadow-wa-glow",
    nav:
        "bg-transparent text-cyan border border-cyan/50 hover:bg-cyan-dim hover:border-cyan hover:shadow-[0_0_20px_var(--color-cyan-glow)]",
};

const sizes: Record<Size, string> = {
    sm: "text-xs px-5 py-2",
    md: "text-sm px-7 py-3.5",
    lg: "text-[15px] px-8 py-4",
}

export function Button({
    variant = "primary",
    size = "md",
    className,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    )
}