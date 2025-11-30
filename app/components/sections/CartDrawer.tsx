"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2 } from "@/app/lib/icons";
import { useCart } from "@/app/store/cart";
import { Button } from "@/app/components/common/Button";
import Link from "next/link";

export function CartDrawer() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity } = useCart();

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900">Shopping Cart</h2>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-slate-600 text-lg">Your cart is empty</p>
                  <Button
                    variant="primary"
                    size="md"
                    className="mt-4"
                    onClick={() => setCartOpen(false)}
                  >
                    <Link href="/products">Start Shopping</Link>
                  </Button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex gap-4 p-4 bg-slate-50 rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">{item.name}</h3>
                      <p className="text-sm text-slate-600">${item.price}</p>

                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, Math.max(1, item.quantity - 1))
                          }
                          className="p-1 hover:bg-white rounded transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-white rounded transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-slate-100 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Subtotal:</span>
                  <span className="text-lg font-bold text-slate-900">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-slate-600">Shipping:</span>
                  <span className="text-lg font-bold text-green-600">Free</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-slate-900">Total:</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <Link href="/checkout">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    onClick={() => setCartOpen(false)}
                  >
                    Proceed to Checkout
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full"
                  onClick={() => setCartOpen(false)}
                >
                  <Link href="/products">Continue Shopping</Link>
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
