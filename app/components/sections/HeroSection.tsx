"use client";

import { motion } from "framer-motion";
import { Section } from "@/app/components/common/Section";
import { Button } from "@/app/components/common/Button";
import Link from "next/link";

export function HeroSection() {
  const scrollToProducts = () => {
    const element = document.getElementById("products");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Gradient Orbs */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 left-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
            ✨ Premium Tech Experience
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight"
        >
          Elevate Your Digital{" "}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Lifestyle
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto"
        >
          Discover curated tech products designed for modern creators, professionals, and enthusiasts. Premium quality, stunning design, unbeatable prices.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/products">
            <Button variant="primary" size="lg">
              🛍️ Shop Now
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            onClick={scrollToProducts}
          >
            👀 View Featured
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid grid-cols-3 gap-4 mt-16 pt-12 border-t border-slate-200"
        >
          {[
            { label: "Products", value: "500+" },
            { label: "Happy Customers", value: "50K+" },
            { label: "Avg Rating", value: "4.8/5" },
          ].map((stat, index) => (
            <div key={index}>
              <div className="text-3xl font-bold text-slate-900">
                {stat.value}
              </div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
}
