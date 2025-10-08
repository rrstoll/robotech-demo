/**
 * Video optimization utilities for the RoboTech demo
 */

// Video optimization configuration
export const VIDEO_CONFIG = {
  // Preload strategies
  PRELOAD_STRATEGIES: {
    NONE: 'none',           // Don't preload
    METADATA: 'metadata',   // Preload metadata only
    AUTO: 'auto',           // Preload entire video
  },
  
  // Quality settings for different connection types
  QUALITY_SETTINGS: {
    SLOW_CONNECTION: {
      maxBitrate: 1000000,  // 1 Mbps
      resolution: '720p',
      preload: 'none',
    },
    MEDIUM_CONNECTION: {
      maxBitrate: 2500000,  // 2.5 Mbps
      resolution: '1080p',
      preload: 'metadata',
    },
    FAST_CONNECTION: {
      maxBitrate: 5000000,  // 5 Mbps
      resolution: '1080p',
      preload: 'auto',
    },
  },
};

// Detect connection speed
export const getConnectionSpeed = (): 'slow' | 'medium' | 'fast' => {
  if (typeof navigator === 'undefined') return 'medium';
  
  const nav = navigator as Navigator & {
    connection?: { effectiveType?: string };
    mozConnection?: { effectiveType?: string };
    webkitConnection?: { effectiveType?: string };
  };
  
  const connection = nav.connection || nav.mozConnection || nav.webkitConnection;
  
  if (!connection) return 'medium';
  
  const effectiveType = connection.effectiveType;
  
  switch (effectiveType) {
    case 'slow-2g':
    case '2g':
      return 'slow';
    case '3g':
      return 'medium';
    case '4g':
    default:
      return 'fast';
  }
};

// Get optimal video source based on connection
export const getOptimalVideoSource = (baseName: string, connectionSpeed: 'slow' | 'medium' | 'fast' = 'medium') => {
  const sources = [];
  
  switch (connectionSpeed) {
    case 'slow':
      // Use compressed versions for slow connections
      sources.push(
        { src: `/${baseName}-compressed.mp4`, type: 'video/mp4' },
        { src: `/${baseName}-compressed.webm`, type: 'video/webm' }
      );
      break;
    case 'medium':
      // Use standard versions
      sources.push(
        { src: `/${baseName}.mp4`, type: 'video/mp4' },
        { src: `/${baseName}.webm`, type: 'video/webm' }
      );
      break;
    case 'fast':
      // Use high-quality versions
      sources.push(
        { src: `/${baseName}-hq.mp4`, type: 'video/mp4' },
        { src: `/${baseName}-hq.webm`, type: 'video/webm' }
      );
      break;
  }
  
  return sources;
};

// Video loading optimization
export const optimizeVideoLoading = (videoElement: HTMLVideoElement, connectionSpeed: 'slow' | 'medium' | 'fast' = 'medium') => {
  const configKey = `${connectionSpeed.toUpperCase()}_CONNECTION` as keyof typeof VIDEO_CONFIG.QUALITY_SETTINGS;
  const config = VIDEO_CONFIG.QUALITY_SETTINGS[configKey];
  
  if (config) {
    videoElement.preload = config.preload as 'none' | 'metadata' | 'auto';
  }
  
  // Add loading optimization attributes
  videoElement.setAttribute('loading', 'lazy');
  videoElement.setAttribute('decoding', 'async');
};

// Intersection Observer for lazy loading
export const createVideoIntersectionObserver = (
  callback: (entries: IntersectionObserverEntry[]) => void,
  options: IntersectionObserverInit = { rootMargin: '50px' }
) => {
  if (typeof IntersectionObserver === 'undefined') {
    return null;
  }
  
  return new IntersectionObserver(callback, options);
};

// Preload video when it's about to be needed
export const preloadVideoWhenNeeded = (videoElement: HTMLVideoElement) => {
  const observer = createVideoIntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && videoElement.preload === 'none') {
        videoElement.preload = 'metadata';
        videoElement.load();
        observer?.unobserve(entry.target);
      }
    });
  }, { rootMargin: '100px' });
  
  if (observer) {
    observer.observe(videoElement);
  }
  
  return observer;
};

// Video compression recommendations
export const VIDEO_COMPRESSION_TIPS = {
  MP4: {
    codec: 'H.264',
    bitrate: '1-2 Mbps for 720p, 2-4 Mbps for 1080p',
    framerate: '24-30 fps',
    resolution: '720p for mobile, 1080p for desktop',
  },
  WEBM: {
    codec: 'VP9',
    bitrate: '0.8-1.5 Mbps for 720p, 1.5-3 Mbps for 1080p',
    framerate: '24-30 fps',
    resolution: '720p for mobile, 1080p for desktop',
  },
};

// Generate optimized video sources
export const generateVideoSources = (baseName: string) => {
  return [
    // High quality for fast connections
    { src: `/${baseName}-hq.mp4`, type: 'video/mp4', media: '(min-width: 1024px)' },
    { src: `/${baseName}-hq.webm`, type: 'video/webm', media: '(min-width: 1024px)' },
    
    // Standard quality for medium connections
    { src: `/${baseName}.mp4`, type: 'video/mp4', media: '(min-width: 768px)' },
    { src: `/${baseName}.webm`, type: 'video/webm', media: '(min-width: 768px)' },
    
    // Compressed for slow connections and mobile
    { src: `/${baseName}-compressed.mp4`, type: 'video/mp4', media: '(max-width: 767px)' },
    { src: `/${baseName}-compressed.webm`, type: 'video/webm', media: '(max-width: 767px)' },
  ];
};
