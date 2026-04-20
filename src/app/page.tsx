import Reviews from "@/modules/Home/reviews/Reviews";
import Hero from "../modules/Home/Hero/Hero";
import ServicesSection from "@/modules/Home/services/ServicesSection";
import OurWorkSection from "@/modules/Home/Our-Work/OurWorkSection";




export default function Home() {
  return (
    <div className="">
      <Hero />
      <ServicesSection />
      <OurWorkSection />
      <Reviews />

      
      </div>
  );
}
