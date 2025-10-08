"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme-provider";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navLinks = [
  { name: "Robots", href: "#robots" },
  { name: "How It Works", href: "#how-it-works" },
  { name: "Plans", href: "#rental-plans" },
  { name: "Stories", href: "#testimonials" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  // Safely access theme context
  let theme = "light";
  let toggleTheme = () => {};
  
  try {
    const themeContext = useTheme();
    theme = themeContext.theme;
    toggleTheme = themeContext.toggleTheme;
  } catch {
    // Fallback values during SSR
  }

  // Change navbar style on scroll
  useEffect(() => {
    const updateScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, href: string) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleLinkClick(href);
    }
  };

  // Handle escape key to close mobile menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen]);

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled
            ? "bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-lg border-b dark:border-gray-800"
            : "bg-transparent border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex items-center gap-3 text-xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image
                  src={theme === "dark" ? "/robotech_logo.png" : "/robotech_logo_black.png"}
                  alt="Robotech Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
              <span className={`${theme === "dark" ? "text-white" : "text-gray-900"}`}>Robotech</span>
            </motion.a>

                   {/* Desktop Navigation */}
                   <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Main navigation">
                     {navLinks.map((link, index) => (
                       <motion.a
                         key={link.name}
                         href={link.href}
                         initial={{ opacity: 0, y: -20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
                         onClick={(e) => {
                           e.preventDefault();
                           handleLinkClick(link.href);
                         }}
                         onKeyDown={(e) => handleKeyDown(e, link.href)}
                         className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors relative group focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 rounded-sm"
                         aria-label={`Navigate to ${link.name} section`}
                       >
                         {link.name}
                         <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300" />
                       </motion.a>
                     ))}
                   </nav>

            {/* Right side buttons */}
            <div className="flex items-center gap-4">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === "dark" ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </motion.div>
              </motion.button>

              {/* CTA Buttons - Desktop */}
              <div className="hidden md:flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 font-medium hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                >
                  Sign In
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-primary-600 text-black rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/30"
                >
                  Start Trial
                </motion.button>
              </div>

              {/* Mobile menu button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </motion.button>
            </div>
          </div>
        </div>

               {/* Mobile Menu */}
               <motion.div
                 initial={false}
                 animate={{
                   height: isOpen ? "auto" : 0,
                   opacity: isOpen ? 1 : 0,
                 }}
                 transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                 className="md:hidden overflow-hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800"
                 role="navigation"
                 aria-label="Mobile navigation menu"
                 aria-hidden={!isOpen}
               >
                 <nav className="px-4 py-6 space-y-4">
                   {navLinks.map((link, index) => (
                     <motion.a
                       key={link.name}
                       href={link.href}
                       initial={{ opacity: 0, x: -20 }}
                       animate={isOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                       transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
                       onClick={(e) => {
                         e.preventDefault();
                         handleLinkClick(link.href);
                       }}
                       onKeyDown={(e) => handleKeyDown(e, link.href)}
                       className="block text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 rounded-sm py-2"
                       aria-label={`Navigate to ${link.name} section`}
                     >
                       {link.name}
                     </motion.a>
                   ))}
                   <div className="pt-4 space-y-3 border-t dark:border-gray-800">
                     <button 
                       className="w-full px-4 py-2 text-gray-700 dark:text-gray-300 font-medium text-left hover:text-primary-600 dark:hover:text-primary-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 rounded-sm"
                       aria-label="Sign in to your account"
                     >
                       Sign In
                     </button>
                     <button 
                       className="w-full px-6 py-3 bg-primary-600 text-black rounded-lg font-medium hover:bg-primary-700 transition-colors shadow-lg shadow-primary-600/30 focus:outline-none focus:ring-4 focus:ring-primary-300 focus:ring-offset-2"
                       aria-label="Start your free trial"
                     >
                       Start Trial
                     </button>
                   </div>
                 </nav>
               </motion.div>
      </motion.nav>

      {/* Spacer to prevent content from going under navbar */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default Navbar;