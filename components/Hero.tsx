"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { useReducedMotion } from "@/lib/use-reduced-motion";

const Hero = () => {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoRef3 = useRef<HTMLVideoElement>(null);
  const [isVideo1Loaded, setIsVideo1Loaded] = useState(false);
  const [isVideo2Loaded, setIsVideo2Loaded] = useState(false);
  const [isVideo3Loaded, setIsVideo3Loaded] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(1);
  const prefersReducedMotion = useReducedMotion();

  // Video loading and cycling based on video completion
  useEffect(() => {
    const setupVideo = (videoRef: React.RefObject<HTMLVideoElement | null>, setLoaded: (loaded: boolean) => void) => {
      const video = videoRef.current;
      if (!video) return;

      const handleCanPlay = () => {
        setLoaded(true);
      };
      
      const handleError = (e: Event) => {
        console.warn('Video loading interrupted or failed:', e);
        setLoaded(false);
      };

      const handleAbort = () => {
        console.warn('Video loading aborted');
        setLoaded(false);
      };

      const handleEnded = () => {
        // Seamless transition to next video
        setCurrentVideo(prev => prev === 3 ? 1 : prev + 1);
      };
      
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);
      video.addEventListener('abort', handleAbort);
      video.addEventListener('ended', handleEnded);
      
      // Set preload to metadata to avoid aggressive loading
      video.preload = 'metadata';
      
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
        video.removeEventListener('abort', handleAbort);
        video.removeEventListener('ended', handleEnded);
      };
    };

    // Setup all videos with proper cleanup
    const cleanup1 = setupVideo(videoRef1, setIsVideo1Loaded);
    const cleanup2 = setupVideo(videoRef2, setIsVideo2Loaded);
    const cleanup3 = setupVideo(videoRef3, setIsVideo3Loaded);

    return () => {
      cleanup1?.();
      cleanup2?.();
      cleanup3?.();
    };
  }, []);

  // Effect to handle video playback when currentVideo changes
  useEffect(() => {
    const playCurrentVideo = () => {
      const videos = [videoRef1.current, videoRef2.current, videoRef3.current];
      const currentVideoElement = videos[currentVideo - 1];
      
      if (currentVideoElement) {
        // Pause all videos first
        videos.forEach(video => {
          if (video && video !== currentVideoElement) {
            video.pause();
            video.currentTime = 0; // Reset to beginning
          }
        });
        
        // Play the current video
        currentVideoElement.currentTime = 0; // Reset to beginning
        currentVideoElement.play().catch(error => {
          console.warn('Failed to play video:', error);
        });
      }
    };

    playCurrentVideo();
  }, [currentVideo]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion ? { duration: 0 } : {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const floatingVariants = {
    initial: { y: 0 },
    animate: prefersReducedMotion ? { y: 0 } : {
      y: [-10, 10, -10],
    },
  };

  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8"
      role="banner"
      aria-label="Hero section introducing RoboTech robot rental service"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        
        {/* Video 1 - Full Screen */}
        <video
          ref={videoRef1}
          muted
          playsInline
          preload="metadata"
          poster="/stills/demo-still.webp"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: currentVideo === 1 && isVideo1Loaded ? 0.8 : 0,
            transition: prefersReducedMotion ? 'none' : 'opacity 0.3s ease-in-out',
            zIndex: 1
          }}
          onMouseEnter={() => videoRef1.current?.pause()}
          onMouseLeave={() => videoRef1.current?.play()}
          onError={(e) => {
            console.warn('Video 1 failed to load:', e);
            setIsVideo1Loaded(false);
          }}
          onAbort={() => {
            console.warn('Video 1 loading aborted');
            setIsVideo1Loaded(false);
          }}
          aria-label="Background video showing robot demonstrations"
          title="Robot demonstration video"
        >
          <source src="/demo-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Video 2 - Full Screen */}
        <video
          ref={videoRef2}
          muted
          playsInline
          preload="metadata"
          poster="/stills/demo-still-2.webp"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: currentVideo === 2 && isVideo2Loaded ? 0.8 : 0,
            transition: prefersReducedMotion ? 'none' : 'opacity 0.3s ease-in-out',
            zIndex: 1
          }}
          onMouseEnter={() => videoRef2.current?.pause()}
          onMouseLeave={() => videoRef2.current?.play()}
          onError={(e) => {
            console.warn('Video 2 failed to load:', e);
            setIsVideo2Loaded(false);
          }}
          onAbort={() => {
            console.warn('Video 2 loading aborted');
            setIsVideo2Loaded(false);
          }}
          aria-label="Background video showing robot demonstrations"
          title="Robot demonstration video"
        >
          <source src="/demo-video-2.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Video 3 - Full Screen */}
        <video
          ref={videoRef3}
          muted
          playsInline
          preload="metadata"
          poster="/stills/demo-still-3.webp"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: currentVideo === 3 && isVideo3Loaded ? 0.8 : 0,
            transition: prefersReducedMotion ? 'none' : 'opacity 0.3s ease-in-out',
            zIndex: 1
          }}
          onMouseEnter={() => videoRef3.current?.pause()}
          onMouseLeave={() => videoRef3.current?.play()}
          onError={(e) => {
            console.warn('Video 3 failed to load:', e);
            setIsVideo3Loaded(false);
          }}
          onAbort={() => {
            console.warn('Video 3 loading aborted');
            setIsVideo3Loaded(false);
          }}
          aria-label="Background video showing robot demonstrations"
          title="Robot demonstration video"
        >
          <source src="/demo-video-3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto mt-[48px] mb-[88px] md:my-0 text-center relative z-20"
      >
        {/* Badge */}
        <motion.div 
          variants={itemVariants} 
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 inline-flex"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium border border-white/30">
            <Sparkles className="w-4 h-4" />
            Join 50,000+ households
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemVariants}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl sm:text-6xl lg:text-7xl font-semi text-white mb-6 drop-shadow-2xl"
        >
          Your Personal Robot<br />
          <span className="text-transparent bg-clip-text bg-[linear-gradient(90deg,#bfdbfe_4.25%,#93c5fd_51.61%,#60a5fa_80.43%,#3b82f6_93.03%)]">
            Assistant Awaits
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={itemVariants}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xl sm:text-2xl text-gray-100 mb-12 max-w-3xl mx-auto drop-shadow-lg"
        >
          Rent cutting-edge home robots on demand. No commitment, no maintenance
          hassles. From cleaning to companionship, discover the perfect robot
          for your lifestyle.
        </motion.p>

               {/* CTA Buttons */}
               <motion.div
                 variants={itemVariants}
                 transition={{ duration: 0.8, ease: "easeOut" }}
                 className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
               >
                 <motion.button
                   whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                   whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                   className="group px-8 py-4 bg-primary-600 text-black rounded-lg font-semibold text-lg shadow-lg shadow-primary-600/50 hover:bg-primary-700 transition-colors flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-primary-300 focus:ring-offset-2"
                   aria-label="Browse available robots for rental"
                   onKeyDown={(e) => {
                     if (e.key === 'Enter' || e.key === ' ') {
                       e.preventDefault();
                       // Add navigation logic here
                     }
                   }}
                 >
                   Browse robots
                   <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                 </motion.button>

                 <motion.button
                   whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
                   whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                   className="px-8 py-4 bg-white/90 backdrop-blur-sm text-black rounded-lg font-semibold hover:bg-white transition-colors focus:outline-none focus:ring-4 focus:ring-white/50 focus:ring-offset-2"
                   aria-label="Watch robot demonstrations in action"
                   onKeyDown={(e) => {
                     if (e.key === 'Enter' || e.key === ' ') {
                       e.preventDefault();
                       // Add navigation logic here
                     }
                   }}
                 >
                   See them in action
                 </motion.button>
               </motion.div>

        {/* Social proof */}
        <motion.div
          variants={itemVariants}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-gray-200"
        >
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full bg-[linear-gradient(90deg,#bfdbfe_4.25%,#93c5fd_51.61%,#60a5fa_80.43%,#3b82f6_93.03%)] border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                >
                  {i === 1 && "JM"}
                  {i === 2 && "RC"}
                  {i === 3 && "SK"}
                  {i === 4 && "TL"}
                </div>
              ))}
            </div>
            <span className="drop-shadow-lg">50,000+ happy households</span>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                className="w-5 h-5 text-yellow-400 fill-current drop-shadow-lg"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
            <span className="ml-2 drop-shadow-lg">4.9/5 from real users</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center p-2"
        >
          <motion.div className="w-1.5 h-3 bg-white/60 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;