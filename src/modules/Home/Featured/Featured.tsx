import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";


export default function Featured() {
  return (
    <section className="px-16 mb-10 w-[80%]">

        <div className="flex items-center space-x-20">
            <div className="grid grid-cols-4 gap-5 space-y-5 w-full h-30 items-center flex-1">
             <Image 
                className="bg-primary p-3 rounded-md"
                src="/assets/miro.png"
                alt="Google"
                width={100}
                height={60}
            />
           <Image 
                className="bg-primary p-3 rounded-md"
                src="/assets/amazon.png"
                alt="Google"
                width={100}
                height={60}
            />
           <Image 
                className="bg-primary p-3 rounded-md"
                src="/assets/miro.png"
                alt="Google"
                width={100}
                height={60}
            />
           <Image   
                className="bg-primary p-3 rounded-md"
                src="/assets/notion.svg"
                alt="Google"
                width={100}
                height={60}
            />
           <Image 
                className="bg-primary p-3 rounded-md"
                src="/assets/samsung.svg"
                alt="Google"
                width={100}
                height={60}
            />
           <Image 
                className="bg-primary p-3 rounded-md"
                src="/assets/miro.png"
                alt="Google"
                width={100}
                height={60}
            />
           <Image 
                className="bg-primary p-3 rounded-md"
                src="/assets/amazon.png"
                alt="Google"
                width={100}
                height={60}
            />
           <Image 
                className="bg-primary p-3 rounded-md"
                src="/assets/notion.svg"
                alt="Google"
                width={100}
                height={60}
            />
            </div>
            <div>
                <Button className="bg-input p-5 rounded-lg">Our Work <ArrowRightIcon /></Button>
            </div>
        </div>
      
  
         

        

    </section>
  )
}
