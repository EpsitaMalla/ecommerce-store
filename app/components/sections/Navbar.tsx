"use client";

import { motion } from "framer-motion";
import { ShoppingCart, Search, Menu, X } from "@/app/lib/icons";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/app/store/cart";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, setCartOpen } = useCart();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent"
          >
            ✨ Nexus
          </motion.div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/"
            className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
          >
            Home
          </Link>
          <Link
            href="/products"
            className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-slate-600 hover:text-slate-900 transition-colors font-medium"
          >
            Contact
          </Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors hidden md:flex"
          >
            <Search size={20} className="text-slate-600" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCartOpen(true)}
            className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ShoppingCart size={20} className="text-slate-600" />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-slate-100 rounded-lg"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-slate-100 bg-slate-50"
        >
          <div className="px-4 py-4 flex flex-col gap-4">
            <Link
              href="/"
              className="text-slate-600 hover:text-slate-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-slate-600 hover:text-slate-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/about"
              className="text-slate-600 hover:text-slate-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-slate-600 hover:text-slate-900 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
