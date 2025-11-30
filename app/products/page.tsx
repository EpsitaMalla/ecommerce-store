"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Section, SectionTitle } from "@/app/components/common/Section";
import { ProductCard } from "@/app/components/common/ProductCard";
import { Button } from "@/app/components/common/Button";
import { products } from "@/app/data/products";
import { Filter, X } from "@/app/lib/icons";

const categories = ["All", "Audio", "Wearables", "Accessories", "Tech", "Peripherals", "Bags", "Power"];
const priceRanges = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "$200+", min: 200, max: Infinity },
];

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState<{min: number, max: number} | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        selectedCategory === "All" || product.category === selectedCategory;
      const priceMatch = selectedPrice
        ? product.price >= selectedPrice.min && product.price <= selectedPrice.max
        : true;
      const searchMatch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return categoryMatch && priceMatch && searchMatch;
    });
  }, [selectedCategory, selectedPrice, searchQuery]);

  return (
    <>
      <Section className="bg-gradient-to-br from-blue-50 to-slate-50">
        <SectionTitle
          title="Our Collections"
          subtitle="Browse through our carefully curated selection of premium tech products"
        />
      </Section>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <motion.div
            animate={{ x: showFilters ? 0 : -300 }}
            className={`lg:static fixed left-0 top-20 h-screen lg:h-auto lg:col-span-1 bg-white p-6 rounded-2xl lg:rounded-lg z-30 lg:z-auto shadow-xl lg:shadow-md ${
              showFilters ? "w-72 block" : "hidden lg:block"
            }`}
          >
            <div className="flex items-center justify-between mb-4 lg:mb-0">
              <h3 className="text-lg font-bold text-slate-900">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase">
                Category
              </h4>
              <div className="space-y-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    whileHover={{ x: 4 }}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white font-semibold"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase">
                Price Range
              </h4>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <motion.button
                    key={range.label}
                    whileHover={{ x: 4 }}
                    onClick={() => setSelectedPrice(range)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm ${
                      selectedPrice?.min === range.min &&
                      selectedPrice?.max === range.max
                        ? "bg-blue-600 text-white font-semibold"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {range.label}
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  setSelectedPrice(null);
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="w-full mt-4 px-4 py-2 bg-slate-100 text-slate-900 rounded-lg hover:bg-slate-200 transition-colors text-sm font-semibold"
              >
                Clear Filters
              </motion.button>
            </div>
          </motion.div>

          {/* Products */}
          <div className="lg:col-span-3">
            {/* Filter Toggle & Results */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-slate-600">
                  Showing <span className="font-bold text-slate-900">{filteredProducts.length}</span> products
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden"
              >
                <Filter size={16} className="mr-2" />
                Filters
              </Button>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-96 flex flex-col items-center justify-center text-center"
              >
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-slate-600 text-lg">No products found</p>
                <p className="text-slate-500 text-sm mt-2">
                  Try adjusting your filters or search query
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
