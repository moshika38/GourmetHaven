"use client";

import Link from 'next/link';
import { ShoppingBag, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 glass border-b border-white/10">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="font-bold text-white">G</span>
          </div>
          <span className="text-xl font-bold font-sans tracking-tight">Gourmet<span className="text-primary">Haven</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link href="/menu" className="text-sm font-medium hover:text-primary transition-colors">Menu</Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>

        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
            </Button>
          </Link>
          <Link href="/auth/login" className="hidden md:block">
            <Button size="sm">
              <User className="w-4 h-4 mr-2" />
              Sign In
            </Button>
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-black/95 backdrop-blur-xl p-4 flex flex-col gap-4 animate-slide-up">
           <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
          <Link href="/menu" className="text-sm font-medium hover:text-primary transition-colors">Menu</Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>

          <Link href="/auth/login" className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors">
            Sign In
          </Link>
        </div>
      )}
    </header>
  );
}
