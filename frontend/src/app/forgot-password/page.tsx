"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Mail, ArrowRight, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        const data = await response.json();
        setError(data.detail || "No account found with that email address.");
      }
    } catch (err) {
      setError("Network error. Backend not reachable.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-96 bg-blue-600 transform skew-y-6 -translate-y-48 z-0 hidden md:block"></div>

      <div className="z-10 w-full max-w-md">
        <div className="text-center mb-8">
           <div className="inline-flex justify-center items-center bg-white p-3 rounded-2xl shadow-sm mb-4">
             <ShieldCheck className="w-10 h-10 text-blue-600" />
           </div>
           <h2 className="text-3xl font-extrabold text-gray-900 md:text-white">Reset Password</h2>
           <p className="mt-2 text-gray-600 md:text-blue-100">Enter your email to receive recovery instructions.</p>
        </div>

        <div className="bg-white py-8 px-8 shadow-2xl rounded-3xl border border-gray-100">
          
          {isSuccess ? (
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">Instructions Sent</h3>
              <p className="text-sm text-gray-500 mb-6">
                We've sent a password reset link to <strong>{email}</strong>. Please check your inbox.
              </p>
              <Link href="/login" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300">
                Return to Login
              </Link>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleReset}>
              {error && (
                <div className="bg-red-50 text-red-700 p-3 rounded-xl flex items-center text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" 
                    placeholder="you@example.com" 
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full flex justify-center items-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white transition-all duration-300 transform hover:-translate-y-1 bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:hover:translate-y-0">
                {isLoading ? "Sending..." : (
                  <>Send Reset Link <ArrowRight className="ml-2 w-4 h-4" /></>
                )}
              </button>
            </form>
          )}

          {!isSuccess && (
            <div className="mt-8 text-center">
              <Link href="/login" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition">
                &larr; Back to login
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
