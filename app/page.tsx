"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/ui/Loading";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-semibold">
        <Loading />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-pizza.png"
              alt="Artisan Pizza"
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
          </div>

          <div className="container relative z-10 px-4 text-center animate-fade-in">
            <span className="inline-block py-1 px-3 rounded-full bg-primary/20 text-primary border border-primary/20 text-sm font-medium mb-6 uppercase tracking-wider backdrop-blur-md">
              Established 2025
            </span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight">
              Taste the <span className="text-primary italic">Passion</span>
              <br /> in Every Bite.
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Experience the authentic flavors of locally sourced ingredients,
              handcrafted with love and tradition. Best pizza and coffee in
              town.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/menu">
                <Button
                  size="lg"
                  className="rounded-full px-8 text-lg font-semibold shadow-xl shadow-primary/20"
                >
                  Order Now <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-8 text-lg backdrop-blur-sm bg-white/5 border-white/20 hover:bg-white/10"
                >
                  View Menu
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features / Info strip */}
        <section className="py-8 border-y border-white/5 bg-white/5 backdrop-blur-sm">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <Clock className="w-8 h-8 text-primary mb-2" />
              <h3 className="text-lg font-semibold">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">Within 30 minutes</p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Star className="w-8 h-8 text-primary mb-2" />
              <h3 className="text-lg font-semibold">Premium Quality</h3>
              <p className="text-sm text-muted-foreground">
                Fresh ingredients daily
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MapPin className="w-8 h-8 text-primary mb-2" />
              <h3 className="text-lg font-semibold">Local Favorite</h3>
              <p className="text-sm text-muted-foreground">
                Voted #1 in the city
              </p>
            </div>
          </div>
        </section>

        {/* Featured Items */}
        <section className="py-24 relative overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">
                Our Favorites
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Handpicked by our chefs, these are the dishes that keep our
                customers coming back for more.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Item 1 */}
              <div className="group rounded-2xl bg-card border border-white/5 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/hero-pizza.png"
                    alt="Signature Pizza"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold border border-white/10">
                    $18.50
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">
                      Signature Truffle Pizza
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    Fresh mozzarella, truffle oil, basil, and prosciutto on a
                    sourdough crust.
                  </p>
                  <Button className="w-full" size="sm">
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Item 2 */}
              <div className="group rounded-2xl bg-card border border-white/5 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/featured-coffee.png"
                    alt="Artisan Coffee"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold border border-white/10">
                    $5.50
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">
                      Morning Roast Cappuccino
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    Premium arabica beans matched with creamy steamed milk and
                    latte art.
                  </p>
                  <Button className="w-full" size="sm">
                    Add to Cart
                  </Button>
                </div>
              </div>

              {/* Item 3 (Placeholder for variety) */}
              <div className="group rounded-2xl bg-card border border-white/5 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10">
                <div className="relative h-64 bg-secondary flex items-center justify-center">
                  <span className="text-muted-foreground">Coming Soon</span>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">Chef's Special Pasta</h3>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    Homemade pasta with rich tomato basil sauce and parmesan
                    cheese.
                  </p>
                  <Button
                    className="w-full"
                    variant="secondary"
                    disabled
                    size="sm"
                  >
                    Out of Stock
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link href="/menu">
                <Button variant="outline" size="lg" className="px-8">
                  View Full Menu
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {/* CTA Section */}
        <section className="relative py-32 flex items-center justify-center overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/hero-pizza.png"
              alt="Pizza Background"
              fill
              className="object-cover scale-105"
            />
            {/* Dark elegant overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl relative overflow-hidden group">
              {/* Decorative shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
                Ready to <span className="text-primary italic">Indulge?</span>
              </h2>

              <p className="text-lg md:text-xl mb-10 text-gray-200 max-w-2xl mx-auto leading-relaxed">
                Skip the wait. Order your favorites online for instant pickup or
                have them delivered piping hot to your doorstep.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    className="h-14 px-8 text-lg rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Create Account
                  </Button>
                </Link>
                <Link href="/menu">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-14 px-8 text-lg rounded-full border-white/20 bg-transparent text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
                  >
                    Browse Menu
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
