"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { BadgeCheck, Filter } from 'lucide-react';
import { toast } from 'sonner';

const MENU_ITEMS = [
  { id: '1', name: 'Signature Truffle Pizza', price: 18.50, category: 'Pizza', image: '/hero-pizza.png', description: 'Fresh mozzarella, truffle oil, basil, prosciutto.' },
  { id: '2', name: 'Margherita Classic', price: 14.00, category: 'Pizza', image: '/hero-pizza.png', description: 'San Marzano tomato sauce, fresh mozzarella, basil.' }, // Using hero pizza as placeholder
  { id: '3', name: 'Pepperoni Feast', price: 16.50, category: 'Pizza', image: '/hero-pizza.png', description: 'Double pepperoni, mozzarella, spicy honey drizzle.' },
  { id: '4', name: 'Morning Roast Cappuccino', price: 5.50, category: 'Coffee', image: '/featured-coffee.png', description: 'Premium arabica, steamed milk, latte art.' },
  { id: '5', name: 'Iced Caramel Macchiato', price: 6.00, category: 'Coffee', image: '/featured-coffee.png', description: 'Espresso, vanilla syrup, milk, caramel drizzle.' },
  { id: '6', name: 'Cold Brew', price: 4.50, category: 'Coffee', image: '/featured-coffee.png', description: 'Steeped for 12 hours for a smooth, bold taste.' },
];

export default function MenuPage() {
  const [filter, setFilter] = useState('All');
  const { addItem } = useCart();

  const filteredItems = filter === 'All' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === filter);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-24 px-4 pb-12">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Menu</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our selection of handcrafted pizzas and artisan coffees.
            </p>
          </div>

          {/* Filter */}
          <div className="flex justify-center gap-4 mb-12 animate-fade-in">
             {['All', 'Pizza', 'Coffee'].map((cat) => (
                <Button
                  key={cat}
                  variant={filter === cat ? 'default' : 'outline'}
                  onClick={() => setFilter(cat)}
                  className="rounded-full px-6"
                >
                  {cat}
                </Button>
             ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <Card key={item.id} className="overflow-hidden border-border/50 hover:border-primary/50 transition-all duration-300 group">
                <div className="relative h-56 overflow-hidden">
                   <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{item.name}</CardTitle>
                    <span className="font-bold text-primary">${item.price.toFixed(2)}</span>
                  </div>
                  <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      addItem({ id: item.id, name: item.name, price: item.price, image: item.image });
                      toast.success(`Added ${item.name} to cart`);
                    }}
                  >
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
