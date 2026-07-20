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
    <main>
      <h1>InterviewIQ</h1>
      <p>Landing page architecture placeholder.</p>
      <p>TODO: Implement landing page UI.</p>

      <PublicNavbar />
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
      <PublicFooter />
    </main>
  );
}
