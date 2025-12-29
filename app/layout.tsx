import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import ClientProviders from "@/context/Providers/Providers";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gourmet Haven | Premium Local Flavors",
  description:
    "Experience the best local cuisine with our modern ordering experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${outfit.variable} font-sans antialiased min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground`}
      >
        <ClientProviders>
          {children}
          <Toaster position="top-center" richColors theme="dark" closeButton />
        </ClientProviders>
      </body>
    </html>
  );
}
