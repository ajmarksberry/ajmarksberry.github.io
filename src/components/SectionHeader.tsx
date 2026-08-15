type SectionHeaderProps = {
  overline: string;
  title: string;
  subtitle?: string;
  description?: string;
  className?: string;
  inverse?: boolean;
};

export function SectionHeader({
  overline,
  title,
  subtitle,
  description,
  className = "",
  inverse = false,
}: SectionHeaderProps) {
  return (
    <div className={`flex flex-col gap-6 items-start ${className}`}>
      <p className="font-extrabold text-xs uppercase text-accent leading-none">
        {overline}
      </p>
      <div className="flex flex-col gap-4 items-start w-full">
        <h2
          className={`w-full font-extrabold text-[36px] leading-[44px] tracking-[-0.9px] sm:text-[48px] sm:leading-[58px] sm:tracking-[-1.2px] lg:text-[60px] lg:leading-[72px] lg:tracking-[-1.5px] ${inverse ? "text-white" : "text-ink"}`}
          style={{ fontFeatureSettings: '"liga" 0' }}
        >
          {title}
        </h2>
        {subtitle ? (
          <p
            className={`font-bold text-base leading-none w-full ${inverse ? "text-white" : "text-ink"}`}
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            {subtitle}
          </p>
        ) : null}
        {description ? (
          <p
            className={`font-serif w-full max-w-[640px] text-base leading-7 ${inverse ? "text-white" : "text-ink"}`}
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            {description}
          </p>
        ) : null}
      </div>
    </div>
  );
}
