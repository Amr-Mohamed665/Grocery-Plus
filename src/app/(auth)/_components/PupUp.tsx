import { X } from "lucide-react";
import { useState } from "react";

interface SignUpPopupProps {
  onClose?: () => void;
  children: React.ReactNode;
}

export default function PupUp({ onClose, children }: SignUpPopupProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose?.(), 300);
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black/50 px-2 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`bg-white rounded-[39px] shadow-[18px_17px_35px_0px_rgba(0,0,0,0.25)] w-[475px] px-6 py-16 md:px-16 relative transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute right-[28px] top-[28px] w-8 h-8 flex items-center justify-center hover:opacity-70 transition-opacity"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
