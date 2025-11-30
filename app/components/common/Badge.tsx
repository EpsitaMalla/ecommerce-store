"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "sale" | "new" | "hot" | "default";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    sale: "bg-red-100 text-red-700",
    new: "bg-blue-100 text-blue-700",
    hot: "bg-orange-100 text-orange-700",
    default: "bg-slate-100 text-slate-700",
  };

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${variants[variant]}`}
    >
      {children}
    </motion.span>
  );
}
