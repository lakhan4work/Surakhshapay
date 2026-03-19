"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Mail, Lock, User, Briefcase, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [role, setRole] = useState<"worker" | "admin">("worker");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    // Admin bypass for testing
    if (email === "admin@surakshapay.com" && password === "admin123") {
        localStorage.setItem("user_role", "admin");
        localStorage.setItem("user_email", email);
        router.push("/admin");
        return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        const user = await response.json();
        localStorage.setItem("user_role", user.is_admin ? "admin" : "worker");
        localStorage.setItem("user_email", user.email);
        localStorage.setItem("user_name", user.name);
        router.push(user.is_admin ? "/admin" : "/dashboard");
      } else {
        const data = await response.json();
        setError(data.detail || "Invalid email or password");
        setIsLoading(false);
      }
    } catch (err) {
      setError("Network error. Make sure the backend is running.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-96 bg-blue-600 transform -skew-y-6 -translate-y-32 z-0 hidden md:block"></div>

      <div className="z-10 w-full max-w-md">
        <div className="text-center mb-10">
           <div className="inline-flex justify-center items-center bg-white p-3 rounded-2xl shadow-sm mb-4">
             <ShieldCheck className="w-10 h-10 text-blue-600" />
           </div>
           <h2 className="text-3xl font-extrabold text-gray-900 md:text-white">Welcome back</h2>
           <p className="mt-2 text-gray-600 md:text-blue-100">Sign in to your SurakshaPay account</p>
        </div>

        <div className="bg-white py-8 px-8 shadow-2xl rounded-3xl border border-gray-100">
          
          <div className="flex bg-gray-100 p-1 rounded-xl mb-8">
            <button 
              type="button"
              onClick={() => setRole("worker")}
              className={`flex-1 flex justify-center items-center py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${role === "worker" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>
              <User className="w-4 h-4 mr-2" /> Gig Worker
            </button>
            <button 
              type="button"
              onClick={() => setRole("admin")}
              className={`flex-1 flex justify-center items-center py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${role === "admin" ? "bg-white text-indigo-600 shadow-sm" : "text-gray-500 hover:text-gray-900"}`}>
              <Briefcase className="w-4 h-4 mr-2" /> Admin
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleLogin}>
            
            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-xl flex items-center text-sm">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
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
                  className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" 
                  placeholder="you@example.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  required 
                  className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500 transition">
                  Forgot password?
                </Link>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white transition-all duration-300 transform hover:-translate-y-1 ${role === "worker" ? "bg-blue-600 hover:bg-blue-700" : "bg-indigo-600 hover:bg-indigo-700"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:hover:translate-y-0`}>
              {isLoading ? "Authenticating..." : `Sign in as ${role === 'worker' ? 'Partner' : 'Admin'}`}
            </button>
            <div className="text-center text-xs text-gray-500 mt-2">
               Admin Login: admin@surakshapay.com / admin123
            </div>
          </form>

          <div className="mt-8">
             <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">New to SurakshaPay?</span>
                </div>
             </div>
             <div className="mt-6">
                <Link href="/signup" className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200">
                  Create an account
                </Link>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
