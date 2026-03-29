function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0A4868]">
      <Icon className="h-4 w-4" />
      {title}
    </div>
  );
}

export default SectionTitle;
