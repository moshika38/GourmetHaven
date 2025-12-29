import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "sonner";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gourmet Haven | Premium Local Flavors",
  description: "Experience the best local cuisine with our modern ordering experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${outfit.variable} font-sans antialiased min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground`}>
        <CartProvider>
          {children}
          <Toaster position="top-center" richColors theme="dark" closeButton />
        </CartProvider>
      </body>
    </html>
  );
}

