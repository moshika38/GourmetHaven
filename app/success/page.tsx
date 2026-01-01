import { Button } from '@/components/ui/Button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function SuccessPage() {
  
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-grow flex items-center justify-center p-4 mt-16">
          <div className="text-center max-w-md w-full bg-card p-8 rounded-2xl border border-white/10 animate-fade-in shadow-2xl">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for your order. We're preparing your delicious meal now.
            </p>
            <Link href="/">
            <Button className="w-full" >
              Back to Home
            </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
}
 
