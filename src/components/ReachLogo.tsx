import Image from "next/image";

type ReachLogoProps = {
  className?: string;
};

export function ReachLogo({ className }: ReachLogoProps) {
  return (
    <div className={className} style={{ width: 183, height: 39 }}>
      <Image
        src="/images/reach/logo-shape-dark.svg"
        alt="REACH.ai"
        width={183}
        height={39}
        className="block size-full"
        priority
      />
    </div>
  );
}
