import React, { useState } from "react";
import { X, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from "lucide-react";

interface CarouselIteration {
  title?: string;
  beforeImage?: string;
  afterImage?: string;
}

interface FullScreenCarouselProps {
  iterations: CarouselIteration[];
  currentIndex: number;
  onClose: () => void;
  onPrevIteration: () => void;
  onNextIteration: () => void;
}

export default function FullScreenCarousel({
  iterations,
  currentIndex,
  onClose,
  onPrevIteration,
  onNextIteration,
}: FullScreenCarouselProps) {
  const iteration = iterations[currentIndex];
  const { title, beforeImage, afterImage } = iteration;
  const [currentView, setCurrentView] = useState<"before" | "after">("before");
  const src = currentView === "before" ? beforeImage : afterImage;

  const resolveSrc = (s?: string) =>
    s?.startsWith("http") || s?.startsWith("/") ? s : `/${s}`;

  const altText =
    `${currentView === "before" ? "Before" : "After"} - ${
      title || `Iteration ${currentIndex + 1}`
    }`;

  // Determine disabled states for image carousel
  const canPrevImage = currentView === "after";
  const canNextImage = currentView === "before";

  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-3 sm:p-2 rounded-full text-white hover:bg-white/10 transition"
        aria-label="Close carousel"
      >
        <X size={24} />
      </button>

      {/* Iteration navigation - responsive stack on mobile */}
      <div className="flex flex-row items-center justify-center mt-6 px-4 sm:space-y-0 sm:space-x-4 gap-1">
        <button
          onClick={onPrevIteration}
          className="p-3 sm:p-2 rounded-full text-white hover:bg-white/10 transition"
          aria-label="Previous iteration"
        >
          <ChevronLeftIcon size={28} />
        </button>

        <h2 className="text-white text-2xl text-center">
          {title || `Iteration ${currentIndex + 1}`}
        </h2>

        <button
          onClick={onNextIteration}
          className="p-3 sm:p-2 rounded-full text-white hover:bg-white/10 transition"
          aria-label="Next iteration"
        >
          <ChevronRightIcon size={28} />
        </button>
      </div>

      {/* Image display with view navigation */}
      <div className="flex-1 relative flex items-center justify-center px-4">
        {src && (
          <>
            {/* Label above image */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white text-lg px-3 py-1 rounded">
              {currentView === "before" ? "Before" : "After"}
            </div>

            {/* Prev image arrow */}
            <button
              onClick={() => canPrevImage && setCurrentView("before")}
              disabled={!canPrevImage}
              className={`absolute left-2 sm:left-4 p-3 sm:p-2 rounded-full text-white transition z-10 ${
                canPrevImage ? "hover:bg-white/10" : "opacity-50 cursor-not-allowed !bg-none"
              }`}
              aria-label="Show before image"
            >
              <ChevronLeftIcon size={32} />
            </button>

            {/* Main image */}
            <img
              src={resolveSrc(src)}
              alt={altText}
              className="object-contain max-h-[80vh]"
            />

            {/* Next image arrow */}
            <button
              onClick={() => canNextImage && setCurrentView("after")}
              disabled={!canNextImage}
              className={`absolute right-2 sm:right-4 p-3 sm:p-2 rounded-full text-white transition z-10 ${
                canNextImage ? "hover:bg-white/10" : "opacity-50 cursor-not-allowed !bg-none"
              }`}
              aria-label="Show after image"
            >
              <ChevronRightIcon size={32} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}