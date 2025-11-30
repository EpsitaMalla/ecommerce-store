"use client";

import { motion } from "framer-motion";
import { Section, SectionTitle } from "@/app/components/common/Section";

export function PromoSection() {
  return (
    <Section className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Promo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative h-96 rounded-2xl overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-700" />
          <motion.img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop"
            alt="Audio"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
            <h3 className="text-3xl md:text-4xl font-bold mb-2">
              Audio Collection
            </h3>
            <p className="text-blue-100 mb-4">Premium sound, incredible price</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Explore Now
            </motion.button>
          </div>
        </motion.div>

        {/* Right Promo */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative h-96 rounded-2xl overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-700" />
          <motion.img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop"
            alt="Wearables"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-20 transition-opacity duration-500"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
            <h3 className="text-3xl md:text-4xl font-bold mb-2">
              Wearables
            </h3>
            <p className="text-purple-100 mb-4">Stay connected in style</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-6 py-2 bg-white text-purple-600 rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              Explore Now
            </motion.button>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
