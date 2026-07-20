import { PublicFooter } from "@/components/footer";
import {
  FeaturesSection,
  HeroSection,
} from "@/components/layout/landing-sections";
import { PublicNavbar } from "@/components/navbar";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PublicNavbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
      </main>
      <PublicFooter />
    </div>
  );
}
