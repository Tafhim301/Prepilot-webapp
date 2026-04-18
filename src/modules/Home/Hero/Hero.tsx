

import { Button } from "@/components/ui/button";
import { ArrowRight} from "lucide-react";

export default function Hero() {


  return (
    <section
      
      className="relative min-h-[80vh] flex flex-col items-center justify-center overflow-hidden w-full px-6 py-20 hover:border-primary"
    >
      {/* Floating collaborator badges */}
      <div className="absolute top-[28%] left-[6%] flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md text-sm font-medium z-10 pointer-events-none select-none">
        <span className="w-2.5 h-2.5 rounded-full bg-green-400 inline-block" />
        Alice
      </div>
      <div className="absolute top-[48%] left-[14%] flex items-center gap-2 bg-[#fde047] rounded-full px-4 py-2 shadow-md text-sm font-semibold z-10 pointer-events-none select-none">
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-600 inline-block" />
        Client
      </div>
      <div className="absolute top-[22%] right-[8%] flex items-center gap-2 bg-[#a78bfa] text-white rounded-full px-4 py-2 shadow-md text-sm font-medium z-10 pointer-events-none select-none">
        <span className="w-2.5 h-2.5 rounded-full bg-white inline-block" />
        Dev Team
      </div>

      {/* Center content */}
      <div className="text-center max-w-4xl z-10 flex flex-col items-center gap-6">
        {/* Top badge */}
        <div className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 text-sm bg-white/70 backdrop-blur-sm">
          <span className="text-violet-600 font-semibold">500+ Projects</span>
          <span className="text-gray-600">delivered to enterprise clients worldwide</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight text-gray-950 font-serif">
          Enterprise web built{" "}
          <span className="italic font-normal">&amp; owned</span>
          <br />
          by your team, forever.
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed">
          We deliver full autonomy for marketing teams at global brands — secure,
          high-performance applications on open-source tech. Fully owned.
          Free from vendor lock-in. At a fraction of the TCO.
        </p>

   
        <div className="flex items-center gap-4 mt-2">
          <Button
            className="flex items-center gap-2 h-10 border border-gray-900 text-gray-900 rounded-full px-6 py-3 text-base font-semibold bg-background transition-colors hover: hover:text-white"
            
         
          >
            OUR WORK <ArrowRight size={16} />
          </Button>
          <button className="text-gray-500 hover:text-gray-900 text-base transition-colors underline underline-offset-4">
            View case studies
          </button>
        </div>
      </div>

    
    </section>
  );
}