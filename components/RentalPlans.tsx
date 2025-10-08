"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Sparkles, Zap, Palette } from "lucide-react";
import { cn } from "@/lib/utils";

type BillingPeriod = "monthly" | "yearly";

interface RentalPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  popular?: boolean;
  cta: string;
}

const rentalPlans: RentalPlan[] = [
  {
    name: "Single Bot",
    description: "Perfect for trying out your first robot",
    monthlyPrice: 49,
    yearlyPrice: 490,
    features: [
      "1 robot at a time",
      "Swap anytime (once per month)",
      "Free delivery & setup",
      "Basic maintenance included",
      "24/7 customer support",
    ],
    cta: "Start Renting",
  },
  {
    name: "Home Fleet",
    description: "Multiple robots working together",
    monthlyPrice: 129,
    yearlyPrice: 1290,
    popular: true,
    features: [
      "Up to 3 robots simultaneously",
      "Unlimited swaps",
      "Priority delivery (same-day)",
      "Premium maintenance & repairs",
      "Fleet coordination AI",
      "Dedicated support line",
      "Robot upgrade credits",
    ],
    cta: "Get Your Fleet",
  },
  {
    name: "Smart Home",
    description: "Full home automation with robots",
    monthlyPrice: 299,
    yearlyPrice: 2990,
    features: [
      "Up to 8 robots simultaneously",
      "Unlimited swaps anytime",
      "Instant deployment (2-hour)",
      "Concierge service",
      "Custom robot programming",
      "Home integration setup",
      "Insurance coverage included",
      "Early access to new models",
    ],
    cta: "Go Premium",
  },
];

const addOns = [
  {
    icon: Zap,
    name: "Extended Battery Pack",
    price: "$15/mo",
    description: "50% longer runtime",
  },
  {
    icon: Palette,
    name: "Custom Robot Skins",
    price: "$25/mo",
    description: "Match your home decor",
  },
];

const RentalPlans = () => {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(1); // Default to "Home Fleet" (index 1)
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-black dark:to-gray-900"
      id="rental-plans"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Choose your{" "}
            <span className="text-primary-600 dark:text-primary-400">
              rental plan
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Flexible plans that grow with your needs. Start small, scale up anytime.
          </p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.4, delay: 0.2 }}
            className="inline-flex items-center gap-4 p-1.5 bg-gray-100 dark:bg-gray-800 rounded-full"
          >
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={cn(
                "relative px-6 py-2.5 rounded-full font-medium transition-all duration-300",
                billingPeriod === "monthly"
                  ? "text-white"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              {billingPeriod === "monthly" && (
                <motion.div
                  layoutId="billing-toggle"
                  className="absolute inset-0 bg-primary-600 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Monthly</span>
            </button>
            <button
              onClick={() => setBillingPeriod("yearly")}
              className={cn(
                "relative px-6 py-2.5 rounded-full font-medium transition-all duration-300 flex items-center gap-2",
                billingPeriod === "yearly"
                  ? "text-white"
                  : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              )}
            >
              {billingPeriod === "yearly" && (
                <motion.div
                  layoutId="billing-toggle"
                  className="absolute inset-0 bg-primary-600 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">Yearly</span>
              <span className="relative z-10 text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Rental Plans */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {rentalPlans.map((plan, index) => {
            const price = billingPeriod === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
            const isHovered = hoveredIndex === index;
            const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
            const isSelected = selectedIndex === index;

            return (
              <motion.div
                key={plan.name}
                variants={cardVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "relative p-8 rounded-2xl border-2 transition-all duration-300 bg-white dark:bg-gray-800 cursor-pointer",
                  isSelected
                    ? "border-primary-500 shadow-2xl shadow-primary-500/20 scale-105"
                    : plan.popular
                    ? "border-primary-500 shadow-2xl shadow-primary-500/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-xl",
                  isOtherHovered && "opacity-60"
                )}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="absolute -top-4 left-1/2 -translate-x-1/2"
                  >
                    <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-primary-600 to-purple-600 text-white text-sm font-semibold rounded-full shadow-lg">
                      <Sparkles className="w-4 h-4" />
                      Most Popular
                    </span>
                  </motion.div>
                )}

                {/* Selection Indicator */}
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                )}

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {plan.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <motion.div
                    key={`${plan.name}-${billingPeriod}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-baseline gap-1"
                  >
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                      ${price}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      /{billingPeriod === "monthly" ? "mo" : "yr"}
                    </span>
                  </motion.div>
                  {billingPeriod === "yearly" && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-gray-500 dark:text-gray-500 mt-1"
                    >
                      ${(price / 12).toFixed(0)} per month, billed annually
                    </motion.p>
                  )}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 mb-8",
                    plan.popular
                      ? "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/30"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600"
                  )}
                >
                  {plan.cta}
                </motion.button>

                {/* Features List */}
                <motion.ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                      }
                      transition={{
                        delay: 0.4 + index * 0.1 + featureIndex * 0.05,
                        duration: 0.3,
                      }}
                      className="flex items-start gap-3"
                    >
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5",
                          plan.popular
                            ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                            : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                        )}
                      >
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </motion.div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Hover Glow Effect */}
                {isHovered && (
                  <motion.div
                    layoutId="pricing-glow"
                    className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-purple-500/10 rounded-2xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* Add-ons Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Popular Add-ons
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Enhance your robot experience with these optional upgrades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {addOns.map((addon, index) => {
              const Icon = addon.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="flex items-center gap-4 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {addon.name}
                      </h4>
                      <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                        {addon.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {addon.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Need help choosing the right plan?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-primary-600 dark:text-primary-400 font-semibold hover:underline underline-offset-4"
          >
            Talk to our robot experts →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default RentalPlans;
