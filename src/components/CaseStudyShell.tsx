import { TopBar } from "@/components/TopBar";

export function CaseStudyShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-full bg-background">
      <TopBar />
      {children}
    </div>
  );
}
