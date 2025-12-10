import { Header } from '@/components/sections/header';
import { HeroSection } from '@/components/sections/hero-section';
import { ValuesSection } from '@/components/sections/values-section';
import { ExpertiseSection } from '@/components/sections/expertise-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { ClientTestimonialsSection } from '@/components/sections/client-testimonials-section';
import { ProjectsGallerySection } from '@/components/sections/projects-gallery-section';
import { ContactFormSection } from '@/components/sections/contact-form-section';
import { Footer } from '@/components/sections/footer';

export default async function Home() {
  return (
    <>
      <HeroSection />
      <ValuesSection />
      <ExpertiseSection />
      <TestimonialsSection />
      <ClientTestimonialsSection />
      <ProjectsGallerySection />
      <ContactFormSection />
    </>
  );
}
