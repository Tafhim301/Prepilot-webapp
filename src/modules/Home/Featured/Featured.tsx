import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";

export default function Featured() {
  return (
    <section className="px-16 mb-10 w-[80%]">
      <div className="flex items-center space-x-20">
        <div className="grid grid-cols-4 gap-5 space-y-5 w-full h-30 items-center flex-1">
          <Image className="bg-primary p-3 rounded-md" src="/assets/miro.png" alt="Miro" width={100} height={60} />
          <Image className="bg-primary p-3 rounded-md" src="/assets/amazon.png" alt="Amazon" width={100} height={60} />
          <Image className="bg-primary p-3 rounded-md" src="/assets/miro.png" alt="Miro" width={100} height={60} />
          <Image className="bg-primary p-3 rounded-md" src="/assets/notion.svg" alt="Notion" width={100} height={60} />
          <Image className="bg-primary p-3 rounded-md" src="/assets/samsung.svg" alt="Samsung" width={100} height={60} />
          <Image className="bg-primary p-3 rounded-md" src="/assets/miro.png" alt="Miro" width={100} height={60} />
          <Image className="bg-primary p-3 rounded-md" src="/assets/amazon.png" alt="Amazon" width={100} height={60} />
          <Image className="bg-primary p-3 rounded-md" src="/assets/notion.svg" alt="Notion" width={100} height={60} />
        </div>

        <div>
          <Button
            className="border border-primary bg-transparent text-primary p-5 text-lg font-semibold rounded-3xl size-full our-work-btn"
          >
            OUR WORK <ArrowRightIcon />
          </Button>
        </div>
      </div>

      <style>{`
        .our-work-btn {
          transition: background 0.35s ease, color 0.35s ease;
        }
        .our-work-btn:hover {
          background: linear-gradient(
            135deg,
            oklch(53.78% 0.1561 3.111) 0%,
            oklch(57.76% 0.1648 17.71) 48%,
            oklch(61.73% 0.1786 28.24) 100%
          ) !important;
          color: white !important;
          border-color: transparent !important;
        }
      `}</style>
    </section>
  );
}