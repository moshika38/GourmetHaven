"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-[60vh] flex items-center justify-center">
            <div className="absolute inset-0">
                <Image
                    src="/hero-pizza.png" // Placeholder
                    alt="Restaurant Interior"
                    fill
                    className="object-cover opacity-40"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>
            <div className="relative z-10 text-center px-4 animate-fade-in">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Our Story</h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                    A journey of flavors, passion, and community since 2010.
                </p>
            </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-16 space-y-24">
            
            {/* Mission */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 animate-slide-up">
                    <h2 className="text-3xl font-bold text-primary">Philosophy</h2>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        At GourmetHaven, we believe that food is more than just sustenance—it's an experience that brings people together. Our philosophy is simple: use the freshest local ingredients, cook with passion, and serve with a smile.
                    </p>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        Every dish that leaves our kitchen is a testament to our commitment to culinary excellence. Whether it's our hand-tossed pizzas or our artisanal coffees, we strive for perfection in every bite and sip.
                    </p>
                </div>
                <div className="relative h-96 rounded-2xl overflow-hidden glass border border-white/10 group">
                    <Image
                        src="/hero-pizza.png" 
                        alt="Chefs at work"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
            </div>

            {/* Team/community */}
            <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                 <div className="relative h-96 rounded-2xl overflow-hidden glass border border-white/10 group md:order-2">
                    <Image
                        src="/featured-coffee.png" 
                        alt="Community"
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                </div>
                <div className="space-y-6 animate-slide-up md:order-1">
                    <h2 className="text-3xl font-bold text-primary">Community</h2>
                    <p className="text-lg leading-relaxed text-muted-foreground">
                        We are proud to be a part of the Foodie City community. From sourcing ingredients from local farmers to hosting community events, we are dedicated to giving back to the place we call home.
                    </p>
                    <div className="pt-4">
                        <Button size="lg">Join Our Team</Button>
                    </div>
                </div>
            </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
