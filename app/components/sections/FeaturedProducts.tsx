"use client";

import { motion } from "framer-motion";
import { Section, SectionTitle } from "@/app/components/common/Section";
import { ProductCard } from "@/app/components/common/ProductCard";
import { products } from "@/app/data/products";

export function FeaturedProducts() {
  const featuredProducts = products.slice(0, 6);

  return (
    <Section className="bg-gradient-to-br from-blue-50 to-slate-50">
      <SectionTitle
        title="Featured Products"
        subtitle="Discover our handpicked collection of premium tech essentials"
      />

      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}
