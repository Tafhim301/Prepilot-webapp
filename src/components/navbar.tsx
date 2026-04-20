"use client";

import { Contact2Icon, Menu, Phone } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
  /** ID of the section to smooth-scroll to on the homepage */
  scrollTo?: string;
}

interface NavbarProps {
  className?: string;
  logo?: {
    url: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
}

/**
 * Returns a click handler that:
 * - If already on `/`, scrolls smoothly to `#sectionId`
 * - Otherwise navigates to `/#sectionId` (browser will jump; falls back gracefully)
 */
function useSmoothScroll() {
  const router = useRouter();
  const pathname = usePathname();

  return (sectionId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (pathname === "/") {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // Navigate to homepage; after load the hash will be visible in URL
      // and the user can scroll. For a better UX we push then scroll after a tick.
      router.push(`/#${sectionId}`);
    }
  };
}

const Navbar = ({
  logo = { url: "/", alt: "PrePilot", title: "PrePilot" },
  menu = [
    { title: "Home", url: "/" },
    { title: "Services",  url: "/#services",  scrollTo: "services"  },
    { title: "Our Work",  url: "/#our-work",  scrollTo: "our-work"  },
    { title: "Pricing",   url: "/pricing"                            },
    { title: "About Us",  url: "/about"                              },
  ],
  className,
}: NavbarProps) => {
  const smoothScroll = useSmoothScroll();

  return (
    <section
      className={cn(
        "py-4 px-10 sticky top-0 z-50 bg-background/80 backdrop-blur-md",
        className
      )}
    >
      <div className="w-full mx-auto">

        {/* ── Desktop ── */}
        <nav className="hidden items-center justify-between lg:flex px-6 py-2 rounded-lg border shadow-accent shadow-b-lg">

          <Link href={logo.url} className="flex items-center gap-2">
            <p>{logo.title}</p>
          </Link>

          <div className="flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item) => {
                  if (item.items) {
                    return (
                      <NavigationMenuItem key={item.title}>
                        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-popover text-popover-foreground">
                          {item.items.map((sub) => (
                            <NavigationMenuLink asChild key={sub.title} className="w-80">
                              <SubMenuLink item={sub} />
                            </NavigationMenuLink>
                          ))}
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    );
                  }

                  return (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink
                        href={item.url}
                        onClick={item.scrollTo ? smoothScroll(item.scrollTo) : undefined}
                        className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-accent-foreground"
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex gap-2">
            <Button asChild className="rounded-sm">
              <Link href="/contact">
                <Phone /> Contact Us
              </Link>
            </Button>
          </div>
        </nav>

        {/* ── Mobile ── */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link href={logo.url} className="flex items-center gap-2">
              <p>{logo.title}</p>
            </Link>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>

              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url} className="flex items-center gap-2">
                      <p>{logo.title}</p>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col gap-6 p-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => {
                      if (item.items) {
                        return (
                          <AccordionItem
                            key={item.title}
                            value={item.title}
                            className="border-b-0"
                          >
                            <AccordionTrigger className="text-md py-0 font-semibold hover:no-underline">
                              {item.title}
                            </AccordionTrigger>
                            <AccordionContent className="mt-2">
                              {item.items.map((sub) => (
                                <SubMenuLink key={sub.title} item={sub} />
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        );
                      }

                      return (
                        <a
                          key={item.title}
                          href={item.url}
                          onClick={item.scrollTo ? smoothScroll(item.scrollTo) : undefined}
                          className="text-md font-semibold"
                        >
                          {item.title}
                        </a>
                      );
                    })}
                  </Accordion>

                  <div className="flex flex-col gap-3">
                    <Button asChild>
                      <Link href="/contact">
                        <Contact2Icon /> Contact Us
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

      </div>
    </section>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => (
  <Link
    className="flex min-w-80 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-muted hover:text-accent-foreground"
    href={item.url}
  >
    <div className="text-foreground">{item.icon}</div>
    <div>
      <div className="text-sm font-semibold">{item.title}</div>
      {item.description && (
        <p className="text-sm leading-snug text-muted-foreground">
          {item.description}
        </p>
      )}
    </div>
  </Link>
);

export { Navbar };