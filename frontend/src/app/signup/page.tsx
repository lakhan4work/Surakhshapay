"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, Mail, Lock, User, Phone, MapPin, Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form State
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Mumbai - South");
  const [password, setPassword] = useState("");
  
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          name, 
          phone, 
          email, 
          city, 
          password, 
          platform: "Unknown", 
          weekly_avg_income: 0, 
          work_hours: 0, 
          is_admin: false 
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        alert(data.detail || "Registration failed");
        setIsLoading(false);
        return;
      }
      
      // Auto-login
      localStorage.setItem("user_email", email);
      localStorage.setItem("user_role", "worker");
      localStorage.setItem("user_name", name);
      
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Network error. Please make sure the backend is running.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-full h-96 bg-indigo-600 transform skew-y-6 -translate-y-48 z-0 hidden md:block"></div>

      <div className="z-10 w-full max-w-lg">
        <div className="text-center mb-8">
           <div className="inline-flex justify-center items-center bg-white p-3 rounded-2xl shadow-sm mb-4">
             <ShieldCheck className="w-10 h-10 text-indigo-600" />
           </div>
           <h2 className="text-3xl font-extrabold text-gray-900 md:text-white">Create Account</h2>
           <p className="mt-2 text-gray-600 md:text-indigo-100">Join thousands of protected gig workers.</p>
        </div>

        <div className="bg-white py-8 px-8 shadow-2xl rounded-3xl border border-gray-100">
          
          <form className="space-y-5" onSubmit={handleSignup}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="text" required value={name} onChange={e => setName(e.target.value)} className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow" placeholder="Ravi Kumar" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)} className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow" placeholder="9876543210" />
                  </div>
                </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow" placeholder="ravi@example.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City / Zone</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <select value={city} onChange={e => setCity(e.target.value)} className="appearance-none block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-700 transition-shadow">
                  <option>Mumbai - South</option>
                  <option>Mumbai - North</option>
                  <option>Delhi NCR</option>
                  <option>Bangalore</option>
                </select>
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
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow" 
                  placeholder="••••••••" 
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

            <button 
              type="submit" 
              disabled={isLoading}
              className={`w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-lg text-sm font-bold text-white transition-all duration-300 transform hover:-translate-y-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:hover:translate-y-0`}>
              {isLoading ? "Creating Account..." : "Create Protected Account"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
             <span className="text-gray-500">Already have an account? </span>
             <Link href="/login" className="font-bold text-indigo-600 hover:text-indigo-500 transition">
               Log in here
             </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
