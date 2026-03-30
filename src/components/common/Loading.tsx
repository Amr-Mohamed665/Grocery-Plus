"use client";

export default function Loading() {
  return (
    <div className="absolute inset-0 z-9999 flex flex-col items-center justify-center bg-white/60 dark:bg-zinc-950/60 backdrop-blur-sm w-full h-full min-h-[400px]">
      <div className="relative flex items-center justify-center">
        {/* Only one spinning circle */}
        <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
      </div>

      {/* Loading Text */}
      <span className="mt-4 text-sm font-bold tracking-widest text-primary animate-pulse">
        LOADING...
      </span>
    </div>
  );
}
