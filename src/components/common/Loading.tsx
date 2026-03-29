"use client";

export default function Loading() {
  return (
    <div className="absolute z-9999 flex flex-col items-center justify-center bg-white/40 backdrop-blur-md w-full h-[calc(100vh-100px)]">
      <div className="relative flex items-center justify-center">
        {/* Outer Ring */}
        <div className="h-24 w-24 rounded-full border-4 border-t-primary border-primary/10 animate-spin"></div>

        {/* Middle Ring - Rotating Opposite */}
        <div
          className="absolute h-16 w-16 rounded-full border-4 border-b-primary border-primary/10 animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        ></div>

        {/* Inner Ring */}
        <div
          className="absolute h-8 w-8 rounded-full border-4 border-l-primary border-primary/10 animate-spin"
          style={{ animationDuration: "0.8s" }}
        ></div>

        {/* Center Pulse */}
        <div className="absolute h-2 w-2 rounded-full bg-primary animate-pulse"></div>
      </div>

      {/* Loading Text */}
      <span className="mt-6 text-sm font-semibold tracking-[0.2em] text-primary animate-pulse">
        LOADING
      </span>
    </div>
  );
}
