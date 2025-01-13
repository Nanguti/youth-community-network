"use client";

import React from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const navLinks = [
    { title: "Home", href: "/" },
    { title: "About", href: "/about-us" },
    { title: "Forum", href: "/forum" },
    { title: "Polls & Survey", href: "/polls-survey" },
    { title: "Lead Board", href: "/leadboard" },
    { title: "Contact Us", href: "/contact-us" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 px-4 py-2.5">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap">
            <Image src="/typni.jpg" alt="typni Logo" width={180} height={60} />
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              {link.title}
            </Link>
          ))}
          <Button>Get Started</Button>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {link.title}
                  </Link>
                ))}
                <Button>Get Started</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
