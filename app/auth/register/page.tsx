"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { toast } from "sonner";
import { auth } from "@/config/firebase";

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const emailInput = document.getElementById("email") as HTMLInputElement;
    const passInput = document.getElementById("password") as HTMLInputElement;
    const lastNameInput = document.getElementById("last") as HTMLInputElement;
    const firstNameInput = document.getElementById("first") as HTMLInputElement;

    if (
      emailInput.value === "" ||
      passInput.value === "" ||
      lastNameInput.value === "" ||
      firstNameInput.value === ""
    ) {
      setIsLoading(false);
      toast.error("Please fill all fields");
      return;
    } else {
      createUserWithEmailAndPassword(auth, emailInput.value, passInput.value)
        .then(async (userCredential) => {
          const user = userCredential.user;
          toast.success("Account Created Successfully");
          // Send verification email
          await sendEmailVerification(user);
          router.push("/auth/verify");
          setIsLoading(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode === "auth/email-already-in-use") {
            toast.error("Email already in use, try logging in");
          } else {
            toast.error(errorMessage.split(":")[1].split("(")[0]);
          }
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-grow flex items-center justify-center p-4 relative mt-15">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/featured-coffee.png')] opacity-5 bg-cover bg-center pointer-events-none" />

        <div className="w-full max-w-md relative z-10 animate-slide-up">
          <div className="bg-card/80 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Create Account</h1>
              <p className="text-muted-foreground">
                Join us for exclusive offers
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="first" className="text-sm font-medium ">
                    First Name
                  </label>
                  <Input id="first" placeholder="John" className="mt-1" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="last" className="text-sm font-medium">
                    Last Name
                  </label>
                  <Input id="last" placeholder="Doe" className="mt-1" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="mt-1"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="mt-1"
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                Already have an account?{" "}
              </span>
              <Link
                href="/auth/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
