import Image from "next/image";

type ReachLogoProps = {
  className?: string;
  /** For a dark panel that stays dark in both themes: always the light logo. */
  onDark?: boolean;
};

/** The REACH.ai logo; follows the theme the same way TaapLogo does. */
export function ReachLogo({ className, onDark = false }: ReachLogoProps) {
  const logo = (src: string, extra: string) => (
    <Image
      src={src}
      alt="REACH.ai"
      width={183}
      height={39}
      className={`block size-full ${extra}`}
      priority
    />
  );

  return (
    <div className={className} style={{ width: 183, height: 39 }}>
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
