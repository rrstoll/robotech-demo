"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react";
import { useReducedMotion } from "@/lib/use-reduced-motion";
import OptimizedVideo from "./OptimizedVideo";
import { cn } from "@/lib/utils";

interface VideoItem {
  id: string;
  src: string;
  poster?: string;
  title: string;
  description?: string;
  duration?: string;
}

interface VideoGalleryProps {
  videos: VideoItem[];
  className?: string;
  autoPlay?: boolean;
  showThumbnails?: boolean;
}

const VideoGallery = ({
  videos,
  className,
  autoPlay = false,
  showThumbnails = true,
}: VideoGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || prefersReducedMotion || videos.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % videos.length);
    }, 8000); // Change video every 8 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [autoPlay, prefersReducedMotion, videos.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  const openFullscreen = () => {
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  const currentVideo = videos[currentIndex];

  return (
    <div className={cn("relative", className)}>
      {/* Main Video Display */}
      <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            className="absolute inset-0"
          >
            <OptimizedVideo
              src={currentVideo.src}
              poster={currentVideo.poster}
              alt={currentVideo.title}
              className="w-full h-full"
              autoPlay={autoPlay}
              controls={true}
              preload="metadata"
            />
          </motion.div>
        </AnimatePresence>

        {/* Video Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-semibold text-lg mb-1">
            {currentVideo.title}
          </h3>
          {currentVideo.description && (
            <p className="text-white/90 text-sm mb-2">
              {currentVideo.description}
            </p>
          )}
          {currentVideo.duration && (
            <span className="text-white/70 text-xs">
              Duration: {currentVideo.duration}
            </span>
          )}
        </div>

        {/* Navigation Arrows */}
        {videos.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
              aria-label="Previous video"
            >
              <ChevronLeft className="w-6 h-6 text-gray-900" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
              aria-label="Next video"
            >
              <ChevronRight className="w-6 h-6 text-gray-900" />
            </button>
          </>
        )}

        {/* Fullscreen Button */}
        <button
          onClick={openFullscreen}
          className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
          aria-label="Open fullscreen"
        >
          <Play className="w-5 h-5 text-gray-900" />
        </button>

        {/* Video Counter */}
        {videos.length > 1 && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 rounded-full text-sm font-medium text-gray-900">
            {currentIndex + 1} / {videos.length}
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {showThumbnails && videos.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {videos.map((video, index) => (
            <button
              key={video.id}
              onClick={() => handleThumbnailClick(index)}
              className={cn(
                "relative flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden transition-all",
                index === currentIndex
                  ? "ring-2 ring-primary-600 scale-105"
                  : "hover:scale-105 opacity-70 hover:opacity-100"
              )}
            >
              {video.poster ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={video.poster}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <Play className="w-4 h-4 text-gray-500" />
                </div>
              )}
              {index === currentIndex && (
                <div className="absolute inset-0 bg-primary-600/20" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-6xl aspect-video"
            >
              <button
                onClick={closeFullscreen}
                className="absolute -top-12 right-0 p-2 bg-white/90 hover:bg-white rounded-full transition-colors z-10"
                aria-label="Close fullscreen"
              >
                <X className="w-6 h-6 text-gray-900" />
              </button>
              
              <OptimizedVideo
                src={currentVideo.src}
                poster={currentVideo.poster}
                alt={currentVideo.title}
                className="w-full h-full rounded-lg"
                autoPlay={true}
                controls={true}
                preload="auto"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoGallery;
