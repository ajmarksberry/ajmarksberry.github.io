import Link from "next/link";

export function Footer() {
  return (
    <div className="w-full pt-10">
      <footer className="flex w-full flex-col items-start gap-16 bg-footer-bg px-5 pb-24 pt-20 sm:gap-20 sm:px-10 sm:pb-28 sm:pt-[100px] lg:px-20 lg:pt-[120px]">
        <div className="flex w-full flex-col items-start gap-8">
          <p
            className="w-full font-extrabold text-[36px] leading-[44px] tracking-[-0.9px] text-footer-fg sm:text-[48px] sm:leading-[58px] sm:tracking-[-1.2px] lg:text-[60px] lg:leading-[72px] lg:tracking-[-1.5px]"
            style={{ fontFeatureSettings: '"liga" 0' }}
          >
            Hire me.
          </p>
          <Link
            href="/contact"
            className="flex items-center justify-center rounded-full bg-primary-600 px-6 py-4 font-semibold text-sm leading-none text-white dark:text-ink"
          >
            START A DISCUSSION
          </Link>
        </div>
        <div className="flex w-full flex-col gap-4 border-t border-footer-border pt-8 text-sm leading-none sm:flex-row sm:items-start sm:justify-between sm:gap-0">
          <p className="text-footer-fg sm:w-[152px]">AJ Marksberry</p>
          <a
            href="#top"
            className="whitespace-nowrap text-footer-muted transition-opacity hover:opacity-80"
          >
            BACK TO TOP ↑
          </a>
        </div>
      </footer>
    </div>
  );
}
