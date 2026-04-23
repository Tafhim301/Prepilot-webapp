import Hero from "@/modules/Home/Hero/Hero";
import ServicesSection from "@/modules/Home/services/ServicesSection";
import OurWorkSection from "@/modules/Home/Our-Work/OurWorkSection";
import Reviews from "@/modules/Home/reviews/Reviews";

export default function Home() {
  return (
    <main>
      <Hero />
      <ServicesSection />
      <OurWorkSection />
      <Reviews />
    </main>
  );
}
