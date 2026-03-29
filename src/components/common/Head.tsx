export default function Head({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#253d4e]">{title}</h1>
          <p className="text-sm md:text-base text-slate-500 mt-1">{description}</p>
        </div>
      </div>
    </div>
  );
}
