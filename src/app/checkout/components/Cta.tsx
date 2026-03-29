import Link from "next/link";

type CtaProps = {
  text: string;
  link: string;
};

export default function Cta({ text, link = "/" }: CtaProps) {
  return (
    <div className="my-10 flex justify-center lg:justify-start lg:ml-32 px-4">
      <Link
        href={link}
        className="
          w-full sm:w-96
          flex items-center justify-center
          bg-[#014162]
          text-white
          text-base sm:text-lg
          font-medium
          py-2
          rounded-xl
          hover:bg-[#012f47]
          transition-all duration-200
          active:scale-[0.98]
          shadow-md
        "
      >
        {text}
      </Link>
    </div>
  );
}