import Image from "next/image";

type TaapLogoProps = {
  className?: string;
};

export function TaapLogo({ className }: TaapLogoProps) {
  return (
    <div className={className} style={{ width: 200, height: 25 }}>
      <Image
        src="/images/taap/logo.svg"
        alt="Expedia TAAP"
        width={200}
        height={25}
        className="block size-full"
        priority
      />
    </div>
  );
}
