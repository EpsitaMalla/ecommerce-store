"use client";

import { motion } from "framer-motion";
import { Section, SectionTitle } from "@/app/components/common/Section";
import { Zap, Shield, Truck, Award } from "@/app/lib/icons";

export function FeaturesSection() {
  const features = [
    {
      Icon: Zap,
      title: "Lightning Fast",
      description: "Optimized for performance and speed",
    },
    {
      Icon: Shield,
      title: "Secure Checkout",
      description: "Your payment information is always protected",
    },
    {
      Icon: Truck,
      title: "Free Shipping",
      description: "On orders over $50, delivered worldwide",
    },
    {
      Icon: Award,
      title: "Premium Quality",
      description: "Guaranteed authentic products with warranty",
    },
  ];

  return (
    <Section className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => {
          const { Icon, title, description } = feature;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-slate-50 hover:shadow-lg transition-shadow"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center mb-4"
              >
                <Icon className="text-white" size={24} />
              </motion.div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
              <p className="text-slate-600 text-sm">{description}</p>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}
