import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

export default function Featured() {
  return (
    <section className="px-16 py-10 w-full max-w-6xl">
      <div className="flex items-center gap-16">
     
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-12 gap-y-8 flex-1 items-center">
          {[
            { src: "/assets/brand1.png", alt: "Brand 1", },
            { src: "/assets/brand2.png", alt: "Brand 2" },
            { src: "/assets/brand3.png", alt: "Brand 3" },
            { src: "/assets/brand4.png", alt: "Brand 4" },
            { src: "/assets/brand5.png", alt: "Brand 5" },
            { src: "/assets/brand6.png", alt: "Brand 6" },
            { src: "/assets/brand7.png", alt: "Brand 7" },
            { src: "/assets/brand8.png", alt: "Brand 8" },
          ].map((brand) => (
            <div key={brand.alt} className="flex items-center justify-center h-10">
              <Image
                src={brand.src}
                alt={brand.alt}
                width={110}
                height={40}
                className="object-contain grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="shrink-0">
          <button className="our-work-btn px-7 py-3 rounded-full border border-primary text-primary bg-transparent text-sm font-semibold tracking-widest flex items-center gap-2 uppercase whitespace-nowrap hover:bg-primary-gradaint hover:text-white transition-all duration-300 hover:shadow-lg hover:border-transparent">
            Our Work <ArrowRightIcon size={16} />
          </button>
        </div>
      </div>


    </section>
  );
}