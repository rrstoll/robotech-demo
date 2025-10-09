"use client";

import { motion } from "framer-motion";
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ArrowUp,
} from "lucide-react";
import Image from "next/image";

const footerLinks = {
  product: [
    { name: "Browse Robots", href: "#robots" },
    { name: "Rental Plans", href: "#rental-plans" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Customer Stories", href: "#testimonials" },
    { name: "Showrooms", href: "#" },
  ],
  company: [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Press Kit", href: "#" },
    { name: "Contact", href: "#" },
  ],
  resources: [
    { name: "Help Center", href: "#" },
    { name: "Robot Guides", href: "#" },
    { name: "Safety Info", href: "#" },
    { name: "Community Forum", href: "#" },
    { name: "API Docs", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Rental Agreement", href: "#" },
    { name: "Safety Standards", href: "#" },
  ],
};

const socialLinks = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Mail, href: "#", label: "Email" },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="py-16 grid grid-cols-2 md:grid-cols-6 gap-8"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="col-span-2">
            <div className="flex items-center gap-3 text-xl font-bold text-white mb-4">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image
                  src="/robotech_logo.png"
                  alt="Robotech Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
              Robotech
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Rent cutting-edge home robots on demand. Making advanced robotics
              accessible to every household.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <motion.a
                href="#"
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                hello@taskflow.com
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +1 (555) 123-4567
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ x: 5 }}
                className="flex items-center gap-2 text-gray-400 hover:text-primary-400 transition-colors"
              >
                <MapPin className="w-4 h-4" />
                San Francisco, CA
              </motion.a>
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-primary-400 transition-colors inline-block"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-primary-400 transition-colors inline-block"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-primary-400 transition-colors inline-block"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <motion.a
                    href={link.href}
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-primary-400 transition-colors inline-block"
                  >
                    {link.name}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-8 border-t border-gray-800"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-semibold mb-2">
                Get robot updates & tips
              </h3>
              <p className="text-gray-400 text-sm">
                New models, maintenance tips, and exclusive offers delivered monthly.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
                style={{
                  backgroundColor: 'var(--primary-600)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-700)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--primary-600)';
                }}
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gray-400 text-sm"
            >
              © {new Date().getFullYear()} Robotech. All rights reserved.
            </motion.p>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400 hover:text-primary-400 hover:bg-gray-700 transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 right-8 w-12 h-12 text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-40"
        style={{
          backgroundColor: 'var(--primary-600)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--primary-700)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'var(--primary-600)';
        }}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </footer>
  );
};

export default Footer;
