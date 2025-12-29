"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { cartTotal, clearCart } = useCart();
  const [isOrdered, setIsOrdered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setIsOrdered(true);
      clearCart();
    }, 1500);
  };

  if (isOrdered) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="text-center max-w-md w-full bg-card p-8 rounded-2xl border border-white/10 animate-fade-in shadow-2xl">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your order. We're preparing your delicious meal now.
            </p>
            <Button className="w-full" onClick={() => window.location.href = '/'}>
              Back to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-24 px-4 pb-12">
         <div className="container mx-auto max-w-2xl">
           <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Checkout</h1>
           
           <div className="bg-card rounded-xl border border-border/50 p-6 md:p-8">
             <form onSubmit={handleSubmit} className="space-y-6">
               <div className="space-y-4">
                 <h2 className="text-xl font-bold">Billing Details</h2>
                 <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label htmlFor="firstName" className="text-sm font-medium">First Name</label>
                     <Input id="firstName" required placeholder="John" />
                   </div>
                   <div className="space-y-2">
                     <label htmlFor="lastName" className="text-sm font-medium">Last Name</label>
                     <Input id="lastName" required placeholder="Doe" />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label htmlFor="email" className="text-sm font-medium">Email</label>
                   <Input id="email" type="email" required placeholder="john@example.com" />
                 </div>
                 <div className="space-y-2">
                   <label htmlFor="address" className="text-sm font-medium">Address</label>
                   <Input id="address" required placeholder="123 Street Name" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                     <label htmlFor="city" className="text-sm font-medium">City</label>
                     <Input id="city" required placeholder="City" />
                   </div>
                   <div className="space-y-2">
                     <label htmlFor="zip" className="text-sm font-medium">Zip Code</label>
                     <Input id="zip" required placeholder="10001" />
                   </div>
                 </div>
               </div>
               
               <div className="space-y-4 pt-4 border-t border-border">
                  <h2 className="text-xl font-bold">Payment Method</h2>
                  <div className="bg-secondary/50 p-4 rounded-lg flex items-center justify-between">
                     <span className="text-sm font-medium">Mock Payment (Credit Card)</span>
                     <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Test Mode</span>
                  </div>
                  <div className="space-y-2">
                     <label htmlFor="card" className="text-sm font-medium">Card Number</label>
                     <Input id="card" placeholder="0000 0000 0000 0000" />
                   </div>
               </div>

               <div className="pt-6 border-t border-border">
                 <div className="flex justify-between items-center mb-6">
                   <span className="text-lg font-bold">Total to Pay</span>
                   <span className="text-2xl font-bold text-primary">${(cartTotal + 2.99 + cartTotal * 0.08).toFixed(2)}</span>
                 </div>
                 <Button type="submit" size="lg" className="w-full">
                   Place Order
                 </Button>
               </div>
             </form>
           </div>
         </div>
      </main>
      
      <Footer />
    </div>
  );
}
