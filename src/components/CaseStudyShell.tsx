import { TopBar } from "@/components/TopBar";

export function CaseStudyShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full bg-background">
      <TopBar />
      <div className="mx-auto w-full max-w-[1440px]">{children}</div>
    </div>
  );
}
