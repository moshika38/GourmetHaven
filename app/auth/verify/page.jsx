"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/config/firebase";

export default function VerifyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const [user, setUser] = useState(null);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // If already verified, redirect to home
        if (currentUser.emailVerified) {
          toast.success("Email already verified!");
          router.push("/");
        }
      } else {
        // If no user, redirect to login
        router.push("/auth/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleResendEmail = async () => {
    if (!user) {
      toast.error("No user found. Please login again.");
      router.push("/auth/login");
      return;
    }

    setIsLoading(true);
    try {
      await sendEmailVerification(user);
      setEmailSent(true);
      toast.success("Verification email sent! Please check your inbox.");
    } catch (error) {
      console.error(error);

      toast.error("Too many requests. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckVerification = async () => {
    if (!user) {
      toast.error("No user found. Please login again.");
      router.push("/auth/login");
      return;
    }

    setIsChecking(true);
    try {
      // Reload user to get latest verification status
      await user.reload();
      const updatedUser = auth.currentUser;

      if (updatedUser && updatedUser.emailVerified) {
        toast.success("Email verified successfully! Redirecting...");
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        toast.error(
          "Email not verified yet. Please check your inbox and click the verification link."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to check verification status");
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary selection:text-white">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4 relative overflow-hidden mt-16">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/hero-pizza.png')] opacity-5 bg-cover bg-center pointer-events-none" />

        <div className="w-full max-w-md relative z-10 animate-fade-in">
          <div className="bg-card/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>

            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Verify Your Email</h1>
              <p className="text-muted-foreground">
                We've sent a verification link to
              </p>
              {user && (
                <p className="text-primary font-medium mt-1">{user.email}</p>
              )}
            </div>

            <div className="space-y-4">
              {/* Check Verification Button */}
              <Button
                onClick={handleCheckVerification}
                className="w-full"
                size="lg"
                disabled={isChecking}
              >
                {isChecking ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Checking...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    I've Verified My Email
                  </span>
                )}
              </Button>

              {/* Resend Email Button */}
              <Button
                onClick={handleResendEmail}
                variant="outline"
                className="w-full"
                size="lg"
                disabled={isLoading || emailSent}
              >
                {isLoading
                  ? "Sending..."
                  : emailSent
                  ? "Email Sent ✓"
                  : "Resend Verification Email"}
              </Button>

              {/* Info Box */}
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-6">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Note:</strong> After
                  clicking the verification link in your email, come back here
                  and click the "I've Verified My Email" button to continue.
                </p>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-muted/50"></span>
                </div>
              </div>

              {/* Back to Login */}
              <div className="text-center text-sm">
                <span className="text-muted-foreground">Wrong email? </span>
                <Link
                  href="/auth/login"
                  className="text-primary hover:underline font-medium"
                >
                  Sign in with a different account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
