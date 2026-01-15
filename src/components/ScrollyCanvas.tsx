"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

// Total number of frames in the sequence
const TOTAL_FRAMES = 76;

// Generate frame file paths
const getFramePath = (index: number): string => {
  const paddedIndex = index.toString().padStart(2, "0");
  // Alternating delay pattern from original files
  const delay = index % 3 === 1 ? "0.066s" : "0.067s";
  return `/Sequence/frame_${paddedIndex}_delay-${delay}.webp`;
};

export default function ScrollyCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const currentFrameRef = useRef(0);

  // Scroll progress tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring animation for frame transitions
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Map scroll progress to frame index
  const frameIndex = useTransform(
    smoothProgress,
    [0, 1],
    [0, TOTAL_FRAMES - 1]
  );

  // Preload all images
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises: Promise<HTMLImageElement>[] = [];
      let loadedCount = 0;

      for (let i = 0; i < TOTAL_FRAMES; i++) {
        const promise = new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            loadedCount++;
            setLoadProgress((loadedCount / TOTAL_FRAMES) * 100);
            resolve(img);
          };
          img.onerror = reject;
          img.src = getFramePath(i);
        });
        imagePromises.push(promise);
      }

      try {
        const loadedImages = await Promise.all(imagePromises);
        setImages(loadedImages);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
      }
    };

    loadImages();
  }, []);

  // Draw image on canvas with cover fit - biased toward showing face (top portion)
  const drawImageCover = useCallback(
    (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
      const canvas = ctx.canvas;
      const dpr = window.devicePixelRatio || 1;

      // Use actual display dimensions (not scaled by DPR)
      const displayWidth = canvas.width / dpr;
      const displayHeight = canvas.height / dpr;

      const canvasAspect = displayWidth / displayHeight;
      const imgAspect = img.width / img.height;

      let drawWidth: number;
      let drawHeight: number;
      let offsetX = 0;
      let offsetY = 0;

      if (imgAspect > canvasAspect) {
        // Image is wider - fit height, crop width (center horizontally)
        drawHeight = displayHeight;
        drawWidth = img.width * (displayHeight / img.height);
        offsetX = (displayWidth - drawWidth) / 2;
      } else {
        // Image is taller - fit width, crop height
        drawWidth = displayWidth;
        drawHeight = img.height * (displayWidth / img.width);
        // Position to show the face (top 20-30% of image instead of center)
        // This keeps the face visible instead of cropping it
        const verticalBias = 0.2; // 0 = top, 0.5 = center, 1 = bottom
        offsetY = (displayHeight - drawHeight) * verticalBias;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    },
    []
  );

  // Render frame based on scroll position
  useEffect(() => {
    if (images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match window
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);

      // Redraw current frame after resize
      const idx = currentFrameRef.current;
      if (images[idx]) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        drawImageCover(ctx, images[idx]);
        ctx.restore();
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Subscribe to frame index changes
    const unsubscribe = frameIndex.on("change", (latest) => {
      const idx = Math.min(Math.max(Math.round(latest), 0), TOTAL_FRAMES - 1);

      if (idx !== currentFrameRef.current && images[idx]) {
        currentFrameRef.current = idx;
        const dpr = window.devicePixelRatio || 1;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        drawImageCover(ctx, images[idx]);
        ctx.restore();
      }
    });

    // Draw initial frame
    if (images[0]) {
      const dpr = window.devicePixelRatio || 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      drawImageCover(ctx, images[0]);
      ctx.restore();
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      unsubscribe();
    };
  }, [images, frameIndex, drawImageCover]);

  return (
    <div ref={containerRef} className="relative h-[500vh]">
      {/* Loading screen */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080C14]"
        >
          <div className="relative mb-8">
            <motion.div
              className="h-24 w-24 rounded-full border-2 border-[#E8873C]/20"
              style={{ borderTopColor: "#E8873C" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-medium text-white/80">
                {Math.round(loadProgress)}%
              </span>
            </div>
          </div>
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#E8873C] to-[#FFB366]"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="mt-4 text-white/50 text-sm tracking-widest uppercase">
            Loading Experience
          </p>
        </motion.div>
      )}

      {/* Sticky canvas container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ background: "#080C14" }}
        />

        {/* Subtle vignette overlay */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 0%, rgba(18,18,18,0.3) 70%, rgba(18,18,18,0.8) 100%)",
          }}
        />
      </div>
    </div>
  );
}
