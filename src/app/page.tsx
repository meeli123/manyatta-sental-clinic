import { Hero, ServicesMarquee, ValueStrip } from "@/components/home/hero";
import { FeaturedService, ServicesSection } from "@/components/home/services";
import {
  AboutPreview,
  ApproachSection,
  ExperienceSection,
} from "@/components/home/experience";
import {
  FaqSection,
  FinalCtaSection,
  LocationSection,
  TestimonialsSection,
} from "@/components/home/closing";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesMarquee />
      <ValueStrip />
      <ServicesSection />
      <FeaturedService />
      <ExperienceSection />
      <AboutPreview />
      <ApproachSection />
      <TestimonialsSection />
      <FaqSection />
      <LocationSection />
      <FinalCtaSection />
    </>
  );
}
