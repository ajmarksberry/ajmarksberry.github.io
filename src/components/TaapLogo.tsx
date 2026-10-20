import Image from "next/image";

type TaapLogoProps = {
  className?: string;
  /** For a dark panel that stays dark in both themes: always the light-text logo. */
  onDark?: boolean;
};

/**
 * The Expedia TAAP logo. On the page itself it follows the theme: dark text on
 * the light theme, light text on the dark one (both are in the markup and
 * globals.css hides the one that does not apply).
 */
export function TaapLogo({ className, onDark = false }: TaapLogoProps) {
  const logo = (src: string, extra: string) => (
    <Image
      src={src}
      alt="Expedia TAAP"
      width={200}
      height={25}
      className={`block size-full ${extra}`}
      priority
    />
  );

  return (
    <div className={className} style={{ width: 200, height: 25 }}>
      {onDark ? (
        logo("/images/taap/logo-dark.svg", "")
      ) : (
        <>
          {logo("/images/taap/logo.svg", "logo-on-light")}
          {logo("/images/taap/logo-dark.svg", "logo-on-dark")}
        </>
      )}
    </div>
  );
}
