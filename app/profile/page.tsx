"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/ui/Loading";
import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { User, Mail, Calendar, LogOut } from "lucide-react";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);





  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    } 
  }, [user, loading, router]);

  const handleSignOut = async () => {
    try {
      setSigningOut(true);
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
      setSigningOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Get user initials for avatar
  const getInitials = (email: string) => {
    return email.charAt(0).toUpperCase();
  };

  // Get member since date
  const getMemberSince = () => {
    if (user.metadata.creationTime) {
      return new Date(user.metadata.creationTime).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
    }
    return "Recently";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* Hero Profile Section */}
          <div className="relative mb-12 animate-fade-in">
            {/* Background Card */}
            <div className="glass rounded-3xl overflow-hidden border border-white/10 relative">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-orange-500/10 to-transparent" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />

              {/* Content */}
              <div className="relative z-10 p-8 md:p-12">
                <div className="flex flex-col items-center text-center">
                  {/* Avatar with Glow */}
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-orange-600 rounded-full blur-2xl opacity-40 animate-pulse" />
                    <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary via-orange-500 to-orange-600 flex items-center justify-center text-5xl font-bold text-white shadow-2xl shadow-primary/30 ring-4 ring-white/20">
                      {getInitials(user.email || "U")}
                    </div>
                  </div>

                  {/* User Info */}
                  <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                    Welcome Back!
                  </h1>
                  <p className="text-muted-foreground text-lg mb-6 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-primary" />
                    {user.email}
                  </p>

                  {/* Member Badge */}
                  <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-orange-500/20 border border-primary/30 backdrop-blur-sm">
                    <Calendar className="w-5 h-5 text-primary" />
                    <span className="font-medium">
                      Member since {getMemberSince()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-6">
            {/* Account Details Card */}
            <Card className="border-white/5 bg-card/50 backdrop-blur-sm animate-slide-up hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <User className="w-6 h-6 text-primary" />
                  Account Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-colors">
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </p>
                    <p className="font-semibold text-lg break-all">
                      {user.email}
                    </p>
                  </div>

                  {/* Account Created */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-colors">
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Account Created
                    </p>
                    <p className="font-semibold text-lg">{getMemberSince()}</p>
                  </div>

                  {/* User ID */}
                  <div className="md:col-span-2 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/20 transition-colors">
                    <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      User ID
                    </p>
                    <p className="font-mono text-sm break-all bg-black/20 p-3 rounded-lg border border-white/5">
                      {user.uid}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions Card */}
            <Card className="border-white/5 bg-card/50 backdrop-blur-sm animate-slide-up hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5">
              <CardHeader>
                <CardTitle className="text-2xl">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button
                    className="h-auto py-6 flex flex-col gap-3 hover:scale-105 transition-all duration-300 bg-gradient-to-br from-primary/10 to-transparent hover:from-primary/20 border-primary/20"
                    variant="outline"
                    onClick={() => router.push("/menu")}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-semibold">Browse Menu</span>
                  </Button>

                  <Button
                    className="h-auto py-6 flex flex-col gap-3 hover:scale-105 transition-all duration-300 bg-gradient-to-br from-orange-500/10 to-transparent hover:from-orange-500/20 border-orange-500/20"
                    variant="outline"
                    onClick={() => router.push("/cart")}
                  >
                    <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <User className="w-6 h-6 text-orange-500" />
                    </div>
                    <span className="font-semibold">View Cart</span>
                  </Button>

                  <Button
                    className="h-auto py-6 flex flex-col gap-3 hover:scale-105 transition-all duration-300 bg-gradient-to-br from-red-500/10 to-transparent hover:from-red-500/20 border-red-500/20 text-red-400 hover:text-red-300"
                    variant="outline"
                    onClick={handleSignOut}
                    disabled={signingOut}
                  >
                    <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                      <LogOut className="w-6 h-6 text-red-400" />
                    </div>
                    <span className="font-semibold">
                      {signingOut ? "Signing Out..." : "Sign Out"}
                    </span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
