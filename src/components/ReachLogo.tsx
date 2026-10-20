import Image from "next/image";

type ReachLogoProps = {
  className?: string;
  /** Multiplier on the logo's 183x39 size. */
  scale?: number;
  /** For a dark panel that stays dark in both themes: always the light logo. */
  onDark?: boolean;
};

/** The REACH.ai logo; follows the theme the same way TaapLogo does. */
export function ReachLogo({
  className,
  scale = 1,
  onDark = false,
}: ReachLogoProps) {
  const width = Math.round(183 * scale);
  const height = Math.round(39 * scale);
  const logo = (src: string, extra: string) => (
    <Image
      src={src}
      alt="REACH.ai"
      width={width}
      height={height}
      className={`block size-full ${extra}`}
      priority
    />
  );

  return (
    <div className={className} style={{ width, height }}>
      {onDark ? (
        logo("/images/reach/logo-shape-dark.svg", "")
      ) : (
        <>
          {logo("/images/reach/logo-shape.svg", "logo-on-light")}
          {logo("/images/reach/logo-shape-dark.svg", "logo-on-dark")}
        </>
      )}
    </div>
  );
}
