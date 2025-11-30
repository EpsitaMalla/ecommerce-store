"use client";

import { ReactNode } from "react";
import { cn } from "@/app/lib/cn";

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export function Card({
  children,
  className,
  hover = true,
  glass = false,
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-300",
        glass
          ? "bg-white/10 backdrop-blur-md border border-white/20"
          : "bg-white border border-slate-100",
        hover && "hover:shadow-xl hover:scale-105",
        className
      )}
    >
      {children}
    </div>
  );
}
