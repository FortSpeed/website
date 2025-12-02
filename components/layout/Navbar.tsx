"use client";
import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarLogo,
  NavBody,
  NavItems,
} from "@/components/ui/resizable-navbar";
import { navItems } from "@/data/navbar";
import Link from "next/link";
import { useState } from "react";
import { InteractiveHoverButton } from "../ui/interactive-hover-button";
import { useRouter } from "next/navigation";

export default function NavbarDemo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleMobileNavClick = (href: string) => {
    // Close mobile menu
    setIsMobileMenuOpen(false);

    // Handle navigation
    if (href.startsWith('#')) {
      // For hash links, scroll to the section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        // If element doesn't exist on current page, navigate to home with hash
        router.push(`/${href}`);
      }
    } else {
      // For regular links, use router
      router.push(href);
    }
  };

  return (
    <Navbar className="fixed top-4">
      {/* Desktop Navigation */}
      <NavBody>
        <NavbarLogo />
        <NavItems items={navItems} />
        <div className="flex items-center gap-4">
          <Link href={"#contact"}>
            <InteractiveHoverButton className="py-1 text-sm" dotClassName="bg-green-500">
              Get Started
            </InteractiveHoverButton>
          </Link>
        </div>
      </NavBody>

      {/* Mobile Navigation */}
      <MobileNav>
        <MobileNavHeader>
          <NavbarLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>

        <MobileNavMenu isOpen={isMobileMenuOpen}>
          {navItems.map((item, idx) => (
            <button
              key={`mobile-link-${idx}`}
              onClick={() => handleMobileNavClick(item.link)}
              className="relative text-neutral-300 hover:text-gray-200 hover:bg-gray-200/10 active:bg-gray-200/10 w-full p-3 rounded-lg px-5 text-left transition-colors"
            >
              <span className="block">{item.name}</span>
            </button>
          ))}
          <div className="flex w-full justify-center items-center flex-col gap-4 text-md mt-5">
            <div onClick={() => handleMobileNavClick('#contact')} className="w-full">
              <InteractiveHoverButton dotClassName="bg-green-500">
                <div className="w-60">Get Started</div>
              </InteractiveHoverButton>
            </div>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
