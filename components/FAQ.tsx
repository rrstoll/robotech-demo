"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does robot rental work?",
    answer:
      "Choose your robot(s), select a rental plan, and we'll deliver and set up your robot within 48 hours. You can swap for different models, pause your subscription, or cancel anytime. All maintenance, repairs, and software updates are included in your monthly fee.",
    category: "Getting Started",
  },
  {
    question: "What if my robot breaks or malfunctions?",
    answer:
      "All rentals include comprehensive maintenance and repair coverage. If your robot malfunctions, contact us and we'll either fix it remotely via software update or send a replacement within 24 hours. No additional fees apply for normal wear and tear.",
    category: "Support",
  },
  {
    question: "Can I try a robot before committing to a plan?",
    answer:
      "Yes! We offer a 7-day trial period on your first robot rental. If you're not completely satisfied, return it for a full refund. We also have showrooms in major cities where you can interact with our robots before renting.",
    category: "Getting Started",
  },
  {
    question: "Are the robots safe around children and pets?",
    answer:
      "Absolutely. All our robots are certified safe for home use and equipped with advanced sensors to detect and avoid children, pets, and obstacles. They meet or exceed all safety standards and have child-lock features you can enable.",
    category: "Safety",
  },
  {
    question: "How do I swap my robot for a different model?",
    answer:
      "Swapping is easy! Log into your account, browse available robots, and request a swap. We'll schedule a convenient pickup/delivery time. Single Bot plans get one swap per month, while Home Fleet and Smart Home plans have unlimited swaps.",
    category: "Rentals",
  },
  {
    question: "Do I need special equipment or home setup?",
    answer:
      "Most robots only need Wi-Fi and standard power outlets. Our setup team will visit your home during initial delivery to ensure everything is configured properly. For advanced features like multi-robot coordination, we may recommend a Robotech Hub (provided free with Home Fleet plans).",
    category: "Technical",
  },
  {
    question: "What happens to my data and privacy?",
    answer:
      "Your privacy is paramount. All robots process data locally on-device whenever possible. Any cloud data is encrypted end-to-end and never shared with third parties. You can review, download, or delete your data anytime. Cameras can be physically disabled when not in use.",
    category: "Privacy",
  },
  {
    question: "Can I purchase a robot instead of renting?",
    answer:
      "Currently, we operate on a rental-only model to ensure everyone has access to the latest technology without large upfront costs. However, we're exploring rent-to-own options. Join our mailing list to be notified when this becomes available.",
    category: "Rentals",
  },
  {
    question: "What's included in maintenance?",
    answer:
      "All routine maintenance, software updates, part replacements, and repairs are included in your rental fee. We perform preventive maintenance proactively and will contact you to schedule service if needed. Emergency repairs are handled within 24 hours.",
    category: "Support",
  },
  {
    question: "Can robots work together as a team?",
    answer:
      "Yes! Our Home Fleet and Smart Home plans include fleet coordination AI that allows multiple robots to work together seamlessly. For example, your cleaning robots can coordinate schedules, or your security bot can notify your companion bot of unusual activity.",
    category: "Features",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
      id="faq"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 mb-6"
          >
            <HelpCircle className="w-8 h-8" />
          </motion.div>

          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently Asked{" "}
            <span className="text-primary-600 dark:text-primary-400">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about renting robots with Robotech. Can&apos;t
            find what you&apos;re looking for? Feel free to{" "}
            <a
              href="#"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              contact our support team
            </a>
            .
          </p>
        </motion.div>

        {/* FAQ List */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "rounded-2xl border-2 transition-all duration-300 overflow-hidden",
                  isOpen
                    ? "border-primary-500 dark:border-primary-600 shadow-lg shadow-primary-500/10"
                    : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                )}
              >
                {/* Question Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className={cn(
                    "w-full text-left p-6 sm:p-8 flex items-start justify-between gap-4 transition-colors",
                    isOpen
                      ? "bg-gray-50 dark:bg-gray-800/50"
                      : "bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750"
                  )}
                >
                  <div className="flex-1">
                    {/* Category Badge */}
                    {faq.category && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isOpen ? { opacity: 1, scale: 1 } : {}}
                        className="inline-block px-3 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full mb-3"
                      >
                        {faq.category}
                      </motion.span>
                    )}

                    <h3
                      className={cn(
                        "text-lg sm:text-xl font-semibold transition-colors",
                        isOpen
                          ? "text-primary-600 dark:text-primary-400"
                          : "text-gray-900 dark:text-white"
                      )}
                    >
                      {faq.question}
                    </h3>
                  </div>

                  {/* Toggle Icon */}
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                      isOpen
                        ? "bg-primary-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    )}
                  >
                    {isOpen ? (
                      <Minus className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </motion.div>
                </button>

                {/* Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: {
                            duration: 0.3,
                          },
                          opacity: {
                            duration: 0.25,
                            delay: 0.1,
                          },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: {
                            duration: 0.3,
                          },
                          opacity: {
                            duration: 0.2,
                          },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ y: -10 }}
                        animate={{ y: 0 }}
                        exit={{ y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="px-6 sm:px-8 pb-6 sm:pb-8 bg-gray-50 dark:bg-gray-800/50"
                      >
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 text-center p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/20 dark:to-purple-900/20 border border-primary-200 dark:border-primary-800"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Still have questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
            Our robot experts are here to help you find the perfect assistant for
            your home. Get personalized recommendations!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/30"
            >
              Chat with an Expert
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-semibold border-2 border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
            >
              Visit a Showroom
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
