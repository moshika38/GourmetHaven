"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock send
    setTimeout(() => {
        setIsLoading(false);
        setIsSent(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in">
           <div className="bg-card border border-white/10 p-8 rounded-2xl shadow-xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
              <p className="text-muted-foreground">Enter your email to receive instructions</p>
            </div>
            
            {isSent ? (
                 <div className="text-center">
                    <div className="bg-green-500/10 text-green-500 p-4 rounded-lg mb-6">
                        Check your email for the reset link!
                    </div>
                    <Link href="/auth/login">
                        <Button className="w-full">Back to Login</Button>
                    </Link>
                 </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input id="email" type="email" placeholder="name@example.com" />
                </div>
                
                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                    {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>
                </form>
            )}
            
            {!isSent && (
                <div className="mt-6 text-center text-sm">
                <Link href="/auth/login" className="text-muted-foreground hover:text-white transition-colors">
                    Back to Login
                </Link>
                </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
