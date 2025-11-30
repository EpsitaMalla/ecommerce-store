"use client";

import { motion } from "framer-motion";
import { Section } from "@/app/components/common/Section";
import { Button } from "@/app/components/common/Button";
import { Card } from "@/app/components/common/Card";
import { useCart } from "@/app/store/cart";
import { CreditCard, Truck, Lock, CheckCircle } from "@/app/lib/icons";
import { useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const [step, setStep] = useState<"cart" | "shipping" | "payment" | "success">("cart");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = 0;
  const tax = total * 0.08;
  const grandTotal = total + tax + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleNext = () => {
    if (step === "cart") setStep("shipping");
    else if (step === "shipping") setStep("payment");
    else if (step === "payment") {
      setStep("success");
      setTimeout(() => {
        clearCart();
      }, 2000);
    }
  };

  const handleBack = () => {
    if (step === "shipping") setStep("cart");
    else if (step === "payment") setStep("shipping");
  };

  if (items.length === 0 && step !== "success") {
    return (
      <Section className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Cart is Empty</h1>
          <p className="text-slate-600 mb-6">
            Add some items to your cart before proceeding to checkout.
          </p>
          <Link href="/products">
            <Button variant="primary" size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </Section>
    );
  }

  return (
    <Section className="max-w-6xl">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-4">
          {[
            { step: "cart", label: "Cart" },
            { step: "shipping", label: "Shipping" },
            { step: "payment", label: "Payment" },
            { step: "success", label: "Done" },
          ].map((s, index, arr) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center flex-1"
            >
              <motion.div
                animate={{
                  backgroundColor:
                    step === s.step || (arr.map((x) => x.step).indexOf(step) > index)
                      ? "#3b82f6"
                      : "#e2e8f0",
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
              >
                {index + 1}
              </motion.div>
              {index < arr.length - 1 && (
                <motion.div
                  animate={{
                    backgroundColor:
                      arr.map((x) => x.step).indexOf(step) > index ? "#3b82f6" : "#e2e8f0",
                  }}
                  className="flex-1 h-1 mx-2"
                />
              )}
            </motion.div>
          ))}
        </div>
        <div className="flex justify-between text-sm font-medium text-slate-600">
          <span>Cart</span>
          <span>Shipping</span>
          <span>Payment</span>
          <span>Done</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card className="p-8">
            {step === "cart" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Review</h2>
                <div className="space-y-4 mb-8">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      className="flex gap-4 p-4 bg-slate-50 rounded-lg"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900">{item.name}</h3>
                        <p className="text-sm text-slate-600 mt-1">
                          Quantity: {item.quantity}
                        </p>
                        <p className="font-semibold text-slate-900 mt-1">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === "shipping" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Shipping Address
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </motion.div>
            )}

            {step === "payment" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment Method</h2>
                <div className="space-y-4 mb-6">
                  <div className="p-4 border-2 border-blue-500 rounded-lg bg-blue-50 flex items-center gap-3">
                    <CreditCard size={20} className="text-blue-600" />
                    <span className="font-semibold text-blue-900">
                      Credit/Debit Card
                    </span>
                  </div>
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      name="cvc"
                      placeholder="CVC"
                      value={formData.cvc}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 p-4 bg-green-50 rounded-lg border border-green-200">
                  <Lock size={18} className="text-green-600" />
                  <span className="text-sm text-green-800">
                    Your payment information is secure and encrypted
                  </span>
                </div>
              </motion.div>
            )}

            {step === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 0.6 }}
                  className="mb-4"
                >
                  <CheckCircle size={64} className="text-green-500 mx-auto" />
                </motion.div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Order Placed!</h2>
                <p className="text-slate-600 mb-4">
                  Thank you for your purchase. Your order has been confirmed.
                </p>
                <p className="text-sm text-slate-500 mb-6">
                  Order confirmation has been sent to your email.
                </p>
                <Link href="/">
                  <Button variant="primary" size="lg">
                    Back to Home
                  </Button>
                </Link>
              </motion.div>
            )}

            {/* Navigation */}
            {step !== "success" && (
              <div className="flex gap-4 mt-8 pt-8 border-t border-slate-200">
                {step !== "cart" && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={handleBack}
                  >
                    ← Back
                  </Button>
                )}
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={handleNext}
                >
                  {step === "payment" ? "Place Order" : "Continue →"}
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Order Summary */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <Card className="p-6 sticky top-32">
            <h3 className="text-lg font-bold text-slate-900 mb-6">Order Summary</h3>

            <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-bold text-slate-900">Total</span>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                ${grandTotal.toFixed(2)}
              </span>
            </div>

            {/* Info Cards */}
            <div className="space-y-3">
              {[
                { Icon: Truck, text: "Free worldwide shipping" },
                { Icon: Lock, text: "Secure checkout" },
              ].map(({ Icon, text }, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <Icon size={18} className="text-blue-600" />
                  <span className="text-sm text-slate-600">{text}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </Section>
  );
}
