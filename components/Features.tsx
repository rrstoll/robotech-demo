"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Zap, Shield, Users, BarChart, Clock, Sparkles } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built for speed with modern architecture that keeps your team moving.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Bank-level encryption and compliance with SOC 2 and GDPR standards.",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Real-time updates and seamless communication across your entire team.",
  },
  {
    icon: BarChart,
    title: "Advanced Analytics",
    description:
      "Gain insights with powerful reporting and data visualization tools.",
  },
  {
    icon: Clock,
    title: "Time Tracking",
    description:
      "Automatic time tracking and detailed reports for better productivity.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered",
    description:
      "Smart automation and intelligent suggestions to optimize workflows.",
  },
];

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section
      ref={ref}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white"
      id="features"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Everything you need to{" "}
            <span className="text-primary-600">succeed</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to help your team collaborate better and
            deliver faster.
          </p>
        </motion.div>

        {/* Features grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all duration-300"
              >
                {/* Icon container */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 text-primary-600 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300"
                >
                  <Icon className="w-7 h-7" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-primary-100 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
