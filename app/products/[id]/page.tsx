"use client";

import { motion } from "framer-motion";
import { products } from "@/app/data/products";
import { Button } from "@/app/components/common/Button";
import { Badge } from "@/app/components/common/Badge";
import { Section } from "@/app/components/common/Section";
import { ProductCard } from "@/app/components/common/ProductCard";
import { Star, Heart, Share2, Truck, Shield, RotateCcw } from "@/app/lib/icons";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/app/store/cart";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = products.find((p) => p.id === productId);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("description");

  const { addItem, setCartOpen } = useCart();

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Product not found</h1>
          <Link href="/products">
            <Button variant="primary">Back to Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity,
      color: selectedColor,
      size: selectedSize,
    });
    setCartOpen(true);
  };

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <div className="flex items-center gap-2 text-sm text-slate-600">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-slate-900">Products</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">{product.name}</span>
        </div>
      </div>

      {/* Product Section */}
      <Section className="max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-center"
          >
            <div className="relative w-full h-96 lg:h-screen max-h-screen bg-slate-100 rounded-2xl overflow-hidden group">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {discount > 0 && (
                <div className="absolute top-4 left-4">
                  <Badge variant="sale">Save {discount}%</Badge>
                </div>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="mb-6">
              <p className="text-sm text-slate-500 uppercase tracking-wide font-semibold mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-slate-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-bold text-slate-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-slate-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>

              <p className="text-slate-600 mb-8 leading-relaxed">
                {product.description}
              </p>

              {/* Colors */}
              {product.colors.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    Color
                  </label>
                  <div className="flex items-center gap-3">
                    {product.colors.map((color) => (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          selectedColor === color
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                        }`}
                      >
                        {color}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {product.sizes.length > 0 && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    Size
                  </label>
                  <div className="flex items-center gap-3">
                    {product.sizes.map((size) => (
                      <motion.button
                        key={size}
                        whileHover={{ scale: 1.1 }}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          selectedSize === size
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-900 hover:bg-slate-200"
                        }`}
                      >
                        {size}
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-sm font-semibold text-slate-900 mb-3">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    −
                  </button>
                  <span className="text-xl font-semibold w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-4 mb-8">
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  🛍️ Add to Cart
                </Button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    isFavorite
                      ? "border-red-500 bg-red-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <Heart
                    size={24}
                    className={isFavorite ? "fill-red-500 text-red-500" : ""}
                  />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="p-3 rounded-lg border-2 border-slate-200 hover:border-slate-300 transition-all"
                >
                  <Share2 size={24} />
                </motion.button>
              </div>

              {/* Info Cards */}
              <div className="space-y-3">
                {[
                  { Icon: Truck, text: "Free shipping on orders over $50" },
                  { Icon: Shield, text: "Secure checkout guaranteed" },
                  { Icon: RotateCcw, text: "30-day return policy" },
                ].map(({ Icon, text }, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg"
                  >
                    <Icon size={20} className="text-blue-600" />
                    <span className="text-sm text-slate-600">{text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Tabs */}
      <Section className="max-w-7xl">
        <div className="border-b border-slate-200 mb-8">
          <div className="flex gap-8">
            {[
              { id: "description", label: "Description" },
              { id: "features", label: "Features" },
              { id: "reviews", label: "Reviews" },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 font-semibold relative ${
                  activeTab === tab.id
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          key={activeTab}
        >
          {activeTab === "description" && (
            <div>
              <p className="text-slate-600 leading-relaxed mb-4">
                {product.description}
              </p>
            </div>
          )}

          {activeTab === "features" && (
            <div>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2 flex-shrink-0" />
                    <span className="text-slate-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "reviews" && (
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div>
                  <div className="text-4xl font-bold text-slate-900">
                    {product.rating}
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-slate-300"
                        }
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-slate-600">
                    Based on {product.reviews} customer reviews
                  </p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </Section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <Section className="bg-gradient-to-br from-blue-50 to-slate-50">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Related Products
            </h2>
            <p className="text-slate-600">
              Check out other items in the {product.category} category
            </p>
          </div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((p, index) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        </Section>
      )}
    </>
  );
}
