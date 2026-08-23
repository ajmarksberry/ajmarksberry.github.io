type DividerProps = {
  className?: string;
  thin?: boolean;
  padded?: boolean;
};

export function Divider({
  className = "",
  thin = false,
  padded = false,
}: DividerProps) {
  const line = (
    <div
      className={`w-full bg-rule ${thin ? "h-px" : "h-0.5"} ${padded ? "" : className}`}
      aria-hidden
    />
  );

  if (padded) {
    return (
      <div
        className={`mx-auto w-full max-w-[620px] py-16 lg:max-w-full ${className}`}
        aria-hidden
      >
        {line}
      </div>
    );
  }

  return line;
}
