type DividerProps = {
  className?: string;
  padded?: boolean;
};

/** A hairline: rules across the site are never thicker than 1px. */
export function Divider({ className = "", padded = false }: DividerProps) {
  const line = (
    <div
      className={`h-px w-full bg-rule ${padded ? "" : className}`}
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
