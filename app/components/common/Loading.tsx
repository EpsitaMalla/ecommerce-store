"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface LoadingProps {
  children?: ReactNode;
  size?: "sm" | "md" | "lg";
}

export function Loading({ size = "md" }: LoadingProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizes[size]} border-2 border-slate-200 border-t-blue-600 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
