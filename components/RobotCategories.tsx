"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Home, Utensils, Heart, Shield, Leaf, Package } from "lucide-react";
import OptimizedVideo from "./OptimizedVideo";

const robotCategories = [
  {
    icon: Home,
    title: "Cleaning Crew",
    description:
      "Autonomous vacuuming, mopping, and tidying robots that keep your home spotless 24/7.",
    robotTypes: ["VacBot Pro", "MopMaster", "TidyBot"],
    color: "from-blue-500 to-cyan-500",
    videoSrc: "/demo-video.mp4", // Using existing demo video
    hasVideo: true,
  },
  {
    icon: Utensils,
    title: "Kitchen Helpers",
    description:
      "From meal prep to dishwashing, let culinary robots handle your kitchen tasks.",
    robotTypes: ["ChefBot", "DishWasher AI", "PrepAssist"],
    color: "from-orange-500 to-red-500",
    videoSrc: "/demo-video-2.mp4", // Using existing demo video
    hasVideo: true,
  },
  {
    icon: Heart,
    title: "Companion Bots",
    description:
      "Interactive robots for entertainment, education, and emotional support for all ages.",
    robotTypes: ["FriendBot", "TutorBot", "PetPal"],
    color: "from-pink-500 to-rose-500",
    videoSrc: "/demo-video-3.mp4", // Using existing demo video
    hasVideo: true,
  },
  {
    icon: Shield,
    title: "Security & Monitoring",
    description:
      "Patrol robots with AI-powered surveillance, emergency response, and home monitoring.",
    robotTypes: ["GuardBot", "PatrolPro", "SafeWatch"],
    color: "from-indigo-500 to-purple-500",
    hasVideo: false,
  },
  {
    icon: Leaf,
    title: "Outdoor Assistants",
    description:
      "Lawn care, gardening, and exterior maintenance robots for pristine outdoor spaces.",
    robotTypes: ["LawnBot", "GardenPro", "SnowClear"],
    color: "from-green-500 to-emerald-500",
    hasVideo: false,
  },
  {
    icon: Package,
    title: "Delivery & Errands",
    description:
      "Personal courier robots for neighborhood deliveries, pickups, and light shopping.",
    robotTypes: ["FetchBot", "CarryPro", "ErrandRunner"],
    color: "from-purple-500 to-violet-500",
    hasVideo: false,
  },
];

const RobotCategories = () => {
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
      className="py-12 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white"
      id="robots"
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
            Robots for every{" "}
            <span className="text-primary-600">
              lifestyle
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our fleet of specialized robots, each designed to make your
            life easier and more enjoyable.
          </p>
        </motion.div>

        {/* Categories grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {robotCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                transition={{ duration: 0.5, ease: "easeOut" }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="group relative p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200 hover:border-primary-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                {/* Video Demo Section */}
                {category.hasVideo && category.videoSrc && (
                  <div className="mb-6 aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <OptimizedVideo
                      src={category.videoSrc}
                      alt={`${category.title} demonstration`}
                      className="w-full h-full"
                      autoPlay={false}
                      controls={true}
                      preload="none"
                    />
                  </div>
                )}

                {/* Icon container */}
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${category.color} text-white mb-6 shadow-lg`}
                >
                  <Icon className="w-7 h-7" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {category.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {category.description}
                </p>

                {/* Robot types */}
                <div className="space-y-2 mb-4">
                  <p className="text-sm font-medium text-gray-500">
                    Popular models:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.robotTypes.map((robot, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full"
                      >
                        {robot}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View Models link */}
                <motion.a
                  href="#"
                  whileHover={{ x: 5 }}
                  className="inline-flex items-center text-primary-600 font-medium text-sm group-hover:underline"
                >
                  View all models
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.a>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 mb-4">
            Not sure which robot is right for you?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-primary-600 font-semibold hover:underline"
          >
            Take our robot quiz →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default RobotCategories;
