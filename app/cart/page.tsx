"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useCart } from '@/context/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, cartTotal, clearCart } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow pt-24 px-4 pb-12">
        <div className="container mx-auto max-w-4xl">
           <h1 className="text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>
           
           {items.length === 0 ? (
             <div className="text-center py-24 bg-card rounded-xl border border-border/50">
               <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
               <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
               <Link href="/menu">
                 <Button size="lg">Browse Menu</Button>
               </Link>
             </div>
           ) : (
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* Cart Items */}
               <div className="lg:col-span-2 space-y-4">
                 {items.map((item) => (
                   <div key={item.id} className="flex gap-4 p-4 bg-card rounded-xl border border-border/50 items-center">
                     <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                        {item.image && (
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        )}
                     </div>
                     <div className="flex-grow">
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-primary font-medium">${item.price.toFixed(2)}</p>
                     </div>
                     {/* Quantity */}
                     <div className="flex items-center gap-2 bg-secondary rounded-lg p-1">
                        <button 
                          className="w-8 h-8 flex items-center justify-center hover:bg-background rounded-md transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button 
                          className="w-8 h-8 flex items-center justify-center hover:bg-background rounded-md transition-colors"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                     </div>
                     <button 
                       className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                       onClick={() => removeItem(item.id)}
                     >
                       <Trash2 className="w-5 h-5" />
                     </button>
                   </div>
                 ))}
                 
                 <div className="flex justify-end pt-4">
                   <Button variant="ghost" className="text-red-500 hover:text-red-600 hover:bg-red-500/10" onClick={clearCart}>
                     Clear Cart
                   </Button>
                 </div>
               </div>
               
               {/* Summary */}
               <div className="h-fit">
                 <div className="bg-card rounded-xl border border-border/50 p-6 sticky top-24">
                   <h3 className="text-xl font-bold mb-4">Order Summary</h3>
                   <div className="space-y-2 mb-4 text-sm">
                     <div className="flex justify-between">
                       <span className="text-muted-foreground">Subtotal</span>
                       <span>${cartTotal.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-muted-foreground">Delivery Fee</span>
                       <span>$2.99</span>
                     </div>
                     <div className="flex justify-between">
                       <span className="text-muted-foreground">Tax</span>
                       <span>${(cartTotal * 0.08).toFixed(2)}</span>
                     </div>
                     <div className="border-t border-border pt-2 mt-4 flex justify-between font-bold text-lg">
                       <span>Total</span>
                       <span className="text-primary">${(cartTotal + 2.99 + cartTotal * 0.08).toFixed(2)}</span>
                     </div>
                   </div>
                   <Link href="/checkout">
                     <Button className="w-full" size="lg">
                       Checkout <ArrowRight className="w-4 h-4 ml-2" />
                     </Button>
                   </Link>
                 </div>
               </div>
             </div>
           )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
