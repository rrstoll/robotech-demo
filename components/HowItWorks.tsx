"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Search, Truck, Smartphone, RefreshCw } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Browse & Choose",
    description:
      "Explore our robot catalog and select the perfect assistant for your needs. Filter by task, capability, or room type.",
    icon: Search,
    color: "from-blue-500 to-cyan-500",
  },
  {
    number: "02",
    title: "Quick Setup",
    description:
      "We deliver and professionally set up your robot at your home within 48 hours. No technical knowledge required.",
    icon: Truck,
    color: "from-purple-500 to-pink-500",
  },
  {
    number: "03",
    title: "Live & Enjoy",
    description:
      "Your robot starts working immediately. Control via our app, voice commands, or let it operate autonomously.",
    icon: Smartphone,
    color: "from-orange-500 to-red-500",
  },
  {
    number: "04",
    title: "Swap Anytime",
    description:
      "Want to try something new? Swap robots as your needs change. Upgrade to the latest models at no extra cost.",
    icon: RefreshCw,
    color: "from-green-500 to-emerald-500",
  },
];

const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
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
      id="how-it-works"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How <span className="text-primary-600 dark:text-primary-400">Robotech</span> works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Get your personal robot assistant in four simple steps. It&apos;s easier
            than you think.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary-200 via-purple-200 to-primary-200 dark:from-primary-900 dark:via-purple-900 dark:to-primary-900 -translate-y-1/2 -z-10" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 h-full"
                  >
                    {/* Step Number */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-primary-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} text-white mb-6 shadow-lg`}
                    >
                      <Icon className="w-8 h-8" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Arrow for desktop */}
                    {index < steps.length - 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={
                          isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                        }
                        transition={{ delay: 0.5 + index * 0.2 }}
                        className="hidden lg:block absolute top-1/2 -right-8 -translate-y-1/2 text-primary-400 dark:text-primary-600"
                      >
                        <svg
                          className="w-16 h-16"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 text-black rounded-lg font-semibold bg-primary-600 hover:bg-primary-700 text-lg shadow-lg transition-colors"
            style={{ 
              boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)'
            }}
          >
            Start Your Free Trial
          </motion.button>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            7-day trial • No credit card required • Cancel anytime
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
