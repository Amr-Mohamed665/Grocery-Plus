"use client";

import { useRouter } from "next/navigation";

type CtaProps = {
  text: string;
  link?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export default function Cta({ text, link = "/", type = "button", onClick, disabled = false }: CtaProps) {
  const router = useRouter();
  
  const baseClasses = `
    w-full sm:w-96
    flex items-center justify-center
    text-white
    text-base sm:text-lg
    font-medium
    py-2
    rounded-xl
    transition-all duration-200
    active:scale-[0.98]
    shadow-md
    border-none
    ${disabled 
      ? "bg-gray-400 cursor-not-allowed" 
      : "bg-[#014162] hover:bg-[#012f47] cursor-pointer"
    }
  `;

  const handleClick = () => {
    if (disabled) return;
    console.log("Button clicked! Link:", link);
    if (onClick) {
      onClick();
    } else if (link) {
      console.log("Navigating to:", link);
      router.push(link);
    }
  };

  if (type === "submit") {
    return (
      <div className="my-10 flex justify-center lg:justify-start px-4">
        <button type="submit" onClick={onClick} disabled={disabled} className={baseClasses}>
          {text}
        </button>
      </div>
    );
  }

  return (
    <div className="my-10 flex justify-center lg:justify-start px-4">
      <button onClick={handleClick} disabled={disabled} className={baseClasses}>
        {text}
      </button>
    </div>
  );
}