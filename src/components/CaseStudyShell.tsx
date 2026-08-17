import { BackToTop } from "@/components/BackToTop";
import { TopBar } from "@/components/TopBar";

export function CaseStudyShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full w-full">
      <TopBar />
      <div className="mx-auto w-full min-w-0 max-w-[1140px] bg-background">
        {children}
      </div>
      <BackToTop />
    </div>
  );
}
