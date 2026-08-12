import { CaseStudyShell } from "@/components/CaseStudyShell";
import { FontVersionToggle } from "@/components/FontVersionToggle";

export default function ProjectsLayout({
  children,
}: LayoutProps<"/projects">) {
  return (
    <CaseStudyShell>
      {children}
      <FontVersionToggle />
    </CaseStudyShell>
  );
}
