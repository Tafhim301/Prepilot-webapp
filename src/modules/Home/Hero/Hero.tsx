import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Featured from "../Featured/Featured";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center overflow-hidden w-full px-4 sm:px-8 md:px-12 lg:px-16 pb-16 sm:py-20">

      {/* Floating badges — hidden on mobile, visible md+ */}
      <div className="hidden md:flex absolute top-[28%] left-[4%] lg:left-[6%] items-center gap-2 bg-white rounded-full px-3 py-1.5 lg:px-4 lg:py-2 shadow-md text-xs lg:text-sm font-medium z-10 pointer-events-none select-none">
        <span className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-green-400 inline-block" />
        Alice
      </div>

      <div className="hidden md:flex absolute top-[48%] left-[10%] lg:left-[14%] items-center gap-2 bg-[#fde047] rounded-full px-3 py-1.5 lg:px-4 lg:py-2 shadow-md text-xs lg:text-sm font-semibold z-10 pointer-events-none select-none">
        <span className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-yellow-600 inline-block" />
        Client
      </div>

      <div className="hidden md:flex absolute top-[22%] right-[4%] lg:right-[8%] items-center gap-2 bg-[#a78bfa] text-white rounded-full px-3 py-1.5 lg:px-4 lg:py-2 shadow-md text-xs lg:text-sm font-medium z-10 pointer-events-none select-none">
        <span className="w-2 h-2 lg:w-2.5 lg:h-2.5 rounded-full bg-white inline-block" />
        Dev Team
      </div>

      {/* Center content */}
      <div className="text-center w-full max-w-xs sm:max-w-lg md:max-w-2xl lg:max-w-4xl z-10 flex flex-col items-center gap-4 sm:gap-6">

        {/* Trust badge */}
        <div className="inline-flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 border border-gray-300 rounded-full px-3 sm:px-4 py-1.5 text-xs sm:text-sm bg-white/70 backdrop-blur-sm">
          <span className="text-violet-600 font-semibold">500+ Projects</span>
          <span className="text-gray-600">delivered to enterprise clients worldwide</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-gray-950 font-serif">
          Enterprise web built{" "}
          <span className="italic font-normal">&amp; owned</span>
          <br className="hidden sm:block" />
          {" "}by your team, forever.
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-xs sm:max-w-lg md:max-w-2xl leading-relaxed">
          We deliver full autonomy for marketing teams at global brands — secure,
          high-performance applications on open-source tech. Fully owned.
          Free from vendor lock-in. At a fraction of the TCO.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-2 w-full sm:w-auto">
          <Button
            className="w-full sm:w-auto flex items-center justify-center gap-2 h-11 border border-primary text-gray-900 rounded-full px-6 py-3 text-sm sm:text-base font-semibold bg-background transition-all duration-300 hover:text-white hover:bg-primary-gradaint"
     
          >
            OUR WORK <ArrowRight size={15} />
          </Button>

          <button className="w-full sm:w-auto text-gray-500 hover:text-gray-900 text-sm sm:text-base transition-colors underline underline-offset-4">
           <Link href="/our-work">
           View case studies
           </Link>
          </button>
        </div>
      </div>
      <Featured />
    </section>
  );
}