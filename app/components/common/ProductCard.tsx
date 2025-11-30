"use client";

import { motion } from "framer-motion";
import { Product } from "@/app/data/products";
import { Card } from "./Card";
import { Badge } from "./Badge";
import Image from "next/image";
import { Star, Heart } from "@/app/lib/icons";
import { useState } from "react";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/products/${product.id}`}>
      <Card hover className="overflow-hidden cursor-pointer group">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden bg-slate-100">
          <motion.img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Badge */}
          <div className="absolute top-4 left-4">
            {discount > 0 && <Badge variant="sale">-{discount}%</Badge>}
            {discount === 0 && <Badge variant="new">New</Badge>}
          </div>

          {/* Favorite Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
          >
            <Heart
              size={20}
              className={isFavorite ? "fill-red-500 text-red-500" : "text-slate-400"}
            />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-slate-500 uppercase tracking-wide font-semibold">
            {product.category}
          </p>
          <h3 className="text-lg font-bold text-slate-900 mt-2 line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  className={
                    i < Math.floor(product.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-slate-300"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-slate-600">
              {product.reviews} reviews
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-4">
            <span className="text-2xl font-bold text-slate-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-slate-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
