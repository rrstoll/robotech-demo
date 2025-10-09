"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type BillingPeriod = "monthly" | "yearly";

interface PricingTier {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  popular?: boolean;
  cta: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    description: "Perfect for small teams getting started",
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      "Up to 10 team members",
      "5 GB storage",
      "Basic reporting",
      "Email support",
      "Mobile app access",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Professional",
    description: "For growing teams that need more power",
    monthlyPrice: 79,
    yearlyPrice: 790,
    popular: true,
    features: [
      "Up to 50 team members",
      "50 GB storage",
      "Advanced analytics",
      "Priority support",
      "Custom integrations",
      "Advanced security",
      "API access",
    ],
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    description: "For large organizations with custom needs",
    monthlyPrice: 199,
    yearlyPrice: 1990,
    features: [
      "Unlimited team members",
      "Unlimited storage",
      "Custom analytics",
      "24/7 dedicated support",
      "Custom integrations",
      "Enterprise security",
      "SLA guarantee",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
  },
];

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white"
      id="pricing"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Simple, transparent{" "}
            <span className="text-primary-600">pricing</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your team. Always know what you&apos;ll pay.
          </p>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
            }
            transition={{ duration: 0.4, delay: 0.2 }}
            className="inline-flex items-center gap-4 p-1.5 bg-gray-100 rounded-full"
          >
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={cn(
                "relative px-6 py-2.5 rounded-full font-medium transition-all duration-300",
                billingPeriod === "monthly"
                  ? "text-white"
                  : "text-gray-600 hover:text-gray-900"
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
                  : "text-gray-600 hover:text-gray-900"
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

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {pricingTiers.map((tier, index) => {
            const price =
              billingPeriod === "monthly" ? tier.monthlyPrice : tier.yearlyPrice;
            const isHovered = hoveredIndex === index;
            const isOtherHovered =
              hoveredIndex !== null && hoveredIndex !== index;

            return (
              <motion.div
                key={tier.name}
                variants={cardVariants}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                className={cn(
                  "relative p-8 rounded-2xl border-2 transition-all duration-300 bg-white",
                  tier.popular
                    ? "border-primary-500 shadow-2xl shadow-primary-500/20 scale-105"
                    : "border-gray-200 hover:border-primary-300 hover:shadow-xl",
                  isOtherHovered && "opacity-60 scale-95"
                )}
              >
                {/* Popular Badge */}
                {tier.popular && (
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

                {/* Tier Name */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {tier.name}
                </h3>
                <p className="text-gray-600 mb-6">{tier.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <motion.div
                    key={`${tier.name}-${billingPeriod}`}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-baseline gap-1"
                  >
                    <span className="text-5xl font-bold text-gray-900">
                      <AnimatedNumber value={price} />
                    </span>
                    <span className="text-gray-600 font-medium">
                      /{billingPeriod === "monthly" ? "mo" : "yr"}
                    </span>
                  </motion.div>
                  {billingPeriod === "yearly" && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-sm text-gray-500 mt-1"
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
                    tier.popular
                      ? "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-600/30"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                  )}
                >
                  {tier.cta}
                </motion.button>

                {/* Features List */}
                <motion.ul className="space-y-4">
                  {tier.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={
                        isInView
                          ? { opacity: 1, x: 0 }
                          : { opacity: 0, x: -10 }
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
                          tier.popular
                            ? "bg-primary-100 text-primary-600"
                            : "bg-gray-100 text-gray-600"
                        )}
                      >
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </motion.div>
                      <span className="text-gray-700">{feature}</span>
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-4">
            Need a custom plan for your organization?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-primary-600 font-semibold hover:text-primary-700 underline underline-offset-4"
          >
            Contact our sales team →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

// Animated number component for smooth price transitions
const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useState(() => {
    const duration = 500; // ms
    const steps = 20;
    const stepValue = (value - displayValue) / steps;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      setDisplayValue((prev) => {
        const next = prev + stepValue;
        if (currentStep >= steps) {
          clearInterval(interval);
          return value;
        }
        return next;
      });
    }, duration / steps);

    return () => clearInterval(interval);
  });

  return <>${Math.round(displayValue)}</>;
};

export default Pricing;
