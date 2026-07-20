import { PublicFooter } from "@/components/footer";
import {
  AiInterviewSection,
  CtaSection,
  FaqSection,
  FeaturesSection,
  GeneralAptitudeSection,
  HeroSection,
  HowItWorksSection,
  HrInterviewSection,
  ReportsSection,
  TestimonialsSection,
} from "@/components/layout/landing-sections";
import { PublicNavbar } from "@/components/navbar";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <PublicNavbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <GeneralAptitudeSection />
        <HrInterviewSection />
        <AiInterviewSection />
        <ReportsSection />
        <TestimonialsSection />
        <FaqSection />
        <CtaSection />
      </main>
      <PublicFooter />
    </div>
  );
}
