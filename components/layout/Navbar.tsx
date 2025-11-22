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

export default function NavbarDemo() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
            <Link
              key={`mobile-link-${idx}`}
              href={item.link}
              onClick={() => setIsMobileMenuOpen(false)}
              className="relative  text-neutral-300 hover:text-gray-200 hover:bg-gray-200/10 active:bg-gray-200/10 w-full p-2 rounded-lg px-5 "
            >
              <span className="block">{item.name}</span>
            </Link>
          ))}
          <div className="flex w-full justify-center items-center flex-col gap-4 text-md mt-5">
            <Link href={"#contact"} >
              <InteractiveHoverButton dotClassName="bg-green-500"><div className="w-60">Get Started</div></InteractiveHoverButton>
            </Link>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </Navbar>
  );
}
