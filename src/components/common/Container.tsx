export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`container max-w-[1240px] mx-auto px-4 ${className}`}>
      {children}
    </div>
  );
}
