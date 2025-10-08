"use client";

import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote, Star, Bot } from "lucide-react";

interface CustomerStory {
  id: number;
  name: string;
  role: string;
  location: string;
  content: string;
  rating: number;
  avatar: string;
  robotUsed: string;
}

const customerStories: CustomerStory[] = [
  {
    id: 1,
    name: "Jennifer Martinez",
    role: "Busy Parent",
    location: "San Francisco, CA",
    content:
      "Our CleanBot Pro has been a game-changer! With three kids and two jobs, coming home to a spotless house every day feels like magic. The rental model is perfect - we upgraded to a newer model last month at no extra cost.",
    rating: 5,
    avatar: "JM",
    robotUsed: "CleanBot Pro + TidyBot",
  },
  {
    id: 2,
    name: "Robert Chen",
    role: "Retiree",
    location: "Austin, TX",
    content:
      "My CompanionBot helps me stay connected with family and reminds me about medications. It's like having a helpful friend who never gets tired. The support team even customized its personality for me!",
    rating: 5,
    avatar: "RC",
    robotUsed: "CompanionBot Elder",
  },
  {
    id: 3,
    name: "Sarah Kim",
    role: "Tech Entrepreneur",
    location: "Seattle, WA",
    content:
      "I rent three robots - a kitchen helper, security bot, and cleaning crew. They work together seamlessly and I can control everything from my phone. Swapping is easy and maintenance is always included. Couldn't be happier!",
    rating: 5,
    avatar: "SK",
    robotUsed: "Home Fleet Plan",
  },
  {
    id: 4,
    name: "Marcus Thompson",
    role: "Small Business Owner",
    location: "Denver, CO",
    content:
      "The delivery bot handles all my local courier needs for the business. It's reliable, cost-effective, and my customers love the novelty. Robotech's service has been outstanding from day one.",
    rating: 5,
    avatar: "MT",
    robotUsed: "FetchBot Pro",
  },
  {
    id: 5,
    name: "Lisa Patel",
    role: "Working Mom",
    location: "Boston, MA",
    content:
      "The lawn care robot keeps our yard pristine without any effort. We tried it on the Single Bot plan first, loved it, and upgraded to Home Fleet. Now we have a cleaning bot too. Best decision ever!",
    rating: 5,
    avatar: "LP",
    robotUsed: "LawnBot + VacBot Pro",
  },
];

const CustomerStories = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      handleNext();
    }, 8000); // Increased from 5 seconds to 8 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % customerStories.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + customerStories.length) % customerStories.length
    );
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      handlePrev();
    } else if (info.offset.x < -swipeThreshold) {
      handleNext();
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <section
      className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900 overflow-hidden"
      id="testimonials"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Loved by households{" "}
            <span className="text-primary-600 dark:text-primary-400">
              nationwide
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real stories from real customers about how Robotech robots have
            transformed their daily lives.
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Main Story Card */}
          <div className="relative h-[450px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                style={{ x, opacity }}
                className="absolute w-full max-w-4xl cursor-grab active:cursor-grabbing"
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 sm:p-12 shadow-2xl border border-gray-100 dark:border-gray-700">
                  {/* Quote Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: 0.2,
                    }}
                    className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mb-6"
                  >
                    <Quote className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </motion.div>

                  {/* Rating */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-1 mb-6"
                  >
                    {Array.from({ length: customerStories[currentIndex].rating }).map(
                      (_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.4 + i * 0.1 }}
                        >
                          <Star
                            className="w-6 h-6 fill-yellow-400 text-yellow-400"
                          />
                        </motion.div>
                      )
                    )}
                  </motion.div>

                  {/* Robot Used Badge */}
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 rounded-full text-sm font-medium mb-6"
                  >
                    <Bot className="w-4 h-4" />
                    Using: {customerStories[currentIndex].robotUsed}
                  </motion.div>

                  {/* Content */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8"
                  >
                    &ldquo;{customerStories[currentIndex].content}&rdquo;
                  </motion.p>

                  {/* Author Info */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex items-center gap-4"
                  >
                    {/* Avatar */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-purple-500 flex items-center justify-center text-white font-bold text-lg"
                    >
                      {customerStories[currentIndex].avatar}
                    </motion.div>

                    {/* Details */}
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-lg">
                        {customerStories[currentIndex].name}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {customerStories[currentIndex].role} •{" "}
                        {customerStories[currentIndex].location}
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePrev}
              className="pointer-events-auto w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNext}
              className="pointer-events-auto w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-300 dark:hover:border-primary-600 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {customerStories.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className="relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary-600 dark:bg-primary-400 w-8"
                      : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                  }`}
                />
              </motion.button>
            ))}
          </div>

          {/* Auto-play indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mt-6 text-sm text-gray-500 dark:text-gray-500"
          >
            {isAutoPlaying ? (
              <span>Auto-playing • Hover to pause</span>
            ) : (
              <span>Paused • Move away to resume</span>
            )}
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 max-w-4xl mx-auto"
        >
          {[
            { value: "50,000+", label: "Happy households" },
            { value: "4.9/5", label: "Average rating" },
            { value: "98%", label: "Would recommend" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="text-center"
            >
              <p className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {stat.value}
              </p>
              <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerStories;
