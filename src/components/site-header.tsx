"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "./logo";
import * as React from "react";
import { useTheme } from "next-themes";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHomePage = pathname === '/';

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
       isScrolled ? "border-b bg-background/80 backdrop-blur-sm" : (isHomePage ? "bg-transparent" : "bg-background")
    )}>
      <div className="container mx-auto flex h-16 items-center">
        <Logo layout="horizontal" />
        <div className="flex-1 flex justify-center">
          <nav className="hidden md:flex md:items-center md:gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-foreground/60"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="hidden items-center space-x-2 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
        <div className="md:hidden ml-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <Logo />
              <div className="mt-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "transition-colors hover:text-primary",
                      pathname === link.href ? "text-primary" : "text-foreground/60"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                   <Button variant="ghost" asChild>
                      <Link href="/login">Login</Link>
                   </Button>
                   <Button asChild>
                      <Link href="/signup">Sign Up</Link>
                   </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
