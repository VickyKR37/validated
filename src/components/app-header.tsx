'use client';

import Link from 'next/link';
import { Mountain, Lightbulb, MessageCircle, Users, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useState } from 'react';

export function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '#submit-idea', label: 'Submit Idea', icon: Lightbulb },
    { href: '#view-feedback', label: 'View Feedback', icon: MessageCircle },
    { href: '#find-testers', label: 'Find Testers', icon: Users },
  ];

  const NavLink = ({ href, label, icon: IconElement }: { href: string; label: string; icon: React.ElementType }) => (
    <Link
      href={href}
      className="flex items-center gap-2 text-sm font-medium text-primary-foreground hover:text-accent-foreground transition-colors px-3 py-2 rounded-md hover:bg-primary-foreground/10"
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <IconElement className="h-5 w-5" />
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-primary shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Mountain className="h-6 w-6 text-primary-foreground" />
          <span className="text-xl font-semibold text-primary-foreground">TestFlight Finder</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map(item => <NavLink key={item.href} href={item.href} label={item.label} icon={item.icon} />)}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] bg-primary p-4">
              <div className="flex flex-col gap-4 pt-8">
                {navItems.map(item => <NavLink key={item.href} href={item.href} label={item.label} icon={item.icon} />)}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
