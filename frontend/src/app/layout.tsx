"use client";
import './globals.css';
import Link from 'next/link';
import { ShieldCheck, LogOut } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Check auth status on route change or load
    const userEmail = localStorage.getItem("user_email");
    const userRole = localStorage.getItem("user_role");
    
    setIsLoggedIn(!!userEmail);
    setRole(userRole);
  }, [pathname]);

  const handleLogout = () => {
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_role");
    setIsLoggedIn(false);
    setRole(null);
    router.push("/login");
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-gray-50 min-h-screen font-sans text-gray-900 flex flex-col">
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-20">
                <div className="flex items-center">
                  <Link href="/" className="text-2xl font-extrabold text-blue-600 flex items-center gap-2 hover:text-blue-700 transition">
                    <ShieldCheck className="w-8 h-8 text-blue-500" />
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">SurakshaPay</span>
                  </Link>
                </div>
                <div className="flex items-center space-x-6">
                  {isLoggedIn ? (
                    <>
                      {role === "admin" ? (
                        <Link href="/admin" className="text-indigo-600 font-bold hover:text-indigo-800 transition">Admin Panel</Link>
                      ) : (
                        <Link href="/dashboard" className="text-blue-600 font-bold hover:text-blue-800 transition">My Dashboard</Link>
                      )}
                      <Link href="/profile" className="text-gray-600 font-medium hover:text-blue-600 transition">Profile</Link>
                      <button onClick={handleLogout} className="flex items-center text-gray-500 hover:text-red-500 transition font-medium">
                        <LogOut className="w-4 h-4 mr-1" /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" className="text-gray-600 font-medium hover:text-blue-600 transition">Log in</Link>
                      <Link href="/signup" className="hidden sm:inline-flex bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-5 py-2.5 rounded-full font-bold shadow hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">Sign Up Free</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </nav>
        <main className="flex-1">{children}</main>
        
        {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 py-12 mt-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 text-white font-bold text-xl mb-4">
                 <ShieldCheck className="w-6 h-6 text-blue-500" /> SurakshaPay
              </div>
              <p className="max-w-sm">The first AI-powered parametric income protection platform customized exclusively for India's gig economy workers.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Platform</h4>
              <ul className="space-y-2">
                <li><Link href="/dashboard" className="hover:text-blue-400 transition">Dashboard</Link></li>
                <li><Link href="/" className="hover:text-blue-400 transition">How it Works</Link></li>
                <li><Link href="/" className="hover:text-blue-400 transition">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><Link href="/legal/privacy" className="hover:text-blue-400 transition">Privacy Policy</Link></li>
                <li><Link href="/legal/terms" className="hover:text-blue-400 transition">Terms of Service</Link></li>
                <li><Link href="/legal/claims" className="hover:text-blue-400 transition">Claims Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-800 text-sm">
             <p>&copy; {new Date().getFullYear()} SurakshaPay Inc. All rights reserved. Not actual insurance (Parametric contract model).</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
