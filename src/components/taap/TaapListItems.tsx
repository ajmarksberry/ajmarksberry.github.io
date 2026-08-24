import type { ReactNode } from "react";

function CheckIcon() {
  return (
    <svg
      width={10.3087}
      height={7.48333}
      viewBox="0 0 10.3087 7.48333"
      fill="none"
      aria-hidden
    >
      <path
        d="M3.52533 5.85L9.17533 0.2C9.30867 0.0666667 9.46422 0 9.642 0C9.81978 0 9.97533 0.0666667 10.1087 0.2C10.242 0.333333 10.3087 0.491667 10.3087 0.675C10.3087 0.858333 10.242 1.01667 10.1087 1.15L3.992 7.28333C3.85867 7.41667 3.70311 7.48333 3.52533 7.48333C3.34756 7.48333 3.192 7.41667 3.05867 7.28333L0.192 4.41667C0.0586667 4.28333 -0.00522222 4.125 0.000333333 3.94167C0.00588889 3.75833 0.0753333 3.6 0.208667 3.46667C0.342 3.33333 0.500333 3.26667 0.683667 3.26667C0.867 3.26667 1.02533 3.33333 1.15867 3.46667L3.52533 5.85Z"
        fill="white"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width={10} height={10} viewBox="0 0 10 10" fill="none" aria-hidden>
      <path
        d="M8.5 1.5L1.5 8.5M1.5 1.5L8.5 8.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function AlertMark() {
  return (
    <svg width={10} height={10} viewBox="0 0 10 10" fill="none" aria-hidden>
      <path
        d="M5 1.6V5.5"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="5" cy="7.7" r="0.8" fill="white" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 7.5V12L15 14.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ItemText({
  children,
  inverse = false,
}: {
  children: ReactNode;
  inverse?: boolean;
}) {
  return (
    <p
      className={`min-w-0 flex-1 text-sm font-medium leading-5 ${inverse ? "text-white" : "text-ink"}`}
      style={{ fontFeatureSettings: '"liga" 0' }}
    >
      {children}
    </p>
  );
}

export function TaapXItem({
  children,
  inverse = false,
}: {
  children: string;
  inverse?: boolean;
}) {
  return (
    <div className="flex w-full max-w-[420px] items-center gap-2">
      <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent">
        <XIcon />
      </span>
      <ItemText inverse={inverse}>{children}</ItemText>
    </div>
  );
}

export function TaapAlertItem({ children }: { children: string }) {
  return (
    <div className="flex w-full items-center gap-2">
      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-accent">
        <AlertMark />
      </span>
      <ItemText>{children}</ItemText>
    </div>
  );
}

export function TaapCheckItem({ children }: { children: string }) {
  return (
    <div className="flex w-full max-w-[564px] items-start gap-2">
      <span className="mt-0 flex size-6 shrink-0 items-center justify-center rounded-full bg-secondary-600">
        <CheckIcon />
      </span>
      <ItemText>{children}</ItemText>
    </div>
  );
}

export function TaapClockItem({ children }: { children: string }) {
  return (
    <div className="flex w-full max-w-[564px] items-start gap-2">
      <span className="flex size-6 shrink-0 items-center justify-center text-ink">
        <ClockIcon />
      </span>
      <ItemText>{children}</ItemText>
    </div>
  );
}

export function TaapNumberItem({
  n,
  children,
  tone = "primary",
  inverse = false,
}: {
  n: number;
  children: ReactNode;
  tone?: "primary" | "ink" | "white";
  inverse?: boolean;
}) {
  const badge =
    tone === "white"
      ? "bg-white text-ink"
      : tone === "ink"
        ? "bg-ink text-white"
        : "bg-primary-600 text-on-primary";

  return (
    <div className="flex w-full items-center gap-2">
      <span
        className={`flex size-6 shrink-0 items-center justify-center rounded-full font-bold text-base leading-7 ${badge}`}
        aria-hidden
      >
        {n}
      </span>
      <ItemText inverse={inverse}>{children}</ItemText>
    </div>
  );
}
