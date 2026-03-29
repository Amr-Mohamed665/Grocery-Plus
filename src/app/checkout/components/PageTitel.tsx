"use client";

import Link from "next/link";

type PageTitelProps = {
  track: string;
  current_page: string;
};

const trackLinks: Record<string, string> = {
  "Home": "/",
  "Fresh Products": "/shop",
  "Shop": "/shop",
  "Cart": "/cart",
};

export default function PageTitel({ track, current_page }: PageTitelProps) {
  const parts = track.split("/").filter(Boolean);

  return (
    <div className="bg-white mt-4 sm:mt-6 pr-4 font-medium text-sm sm:text-base lg:text-xl text-[#BCB8B1] text-left">
      {parts.map((part, index) => {
        const trimmedPart = part.trim();
        const link = trackLinks[trimmedPart];
        const isLast = index === parts.length - 1;

        return (
          <span key={index}>
            {link ? (
              <Link
                href={link}
                className="hover:text-[#014162] transition-colors cursor-pointer"
              >
                {trimmedPart}
              </Link>
            ) : (
              trimmedPart
            )}
            {!isLast && " / "}
          </span>
        );
      })}
      <span className="text-[#014162]"> / {current_page}</span>
    </div>
  );
}
