import Link from "next/link";
import { ShieldCheck, CloudLightning, Activity, ChevronRight, Zap, CheckCircle2, TrendingUp, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gray-50 pt-20 pb-32">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-indigo-50/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-medium text-sm mb-4 animate-fade-in-up">
            <Zap className="w-4 h-4 mr-2" />
            Zero Paperwork. Instant Payouts.
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight">
            Protect Your Income <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Against The Unexpected.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Whether it's heavy rain, high pollution, or extreme traffic, SurakshaPay automatically triggers income replacement straight to your account.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 pt-8">
            <Link href="/signup" className="group bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center">
              Start Free Trial
              <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="#how-it-works" className="bg-white hover:bg-gray-50 text-gray-900 font-bold py-4 px-10 rounded-full shadow-md hover:shadow-lg border border-gray-200 transition-all duration-300 flex items-center justify-center">
              How it Works
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-blue-400">
            <div className="p-4">
               <div className="text-5xl font-black text-white mb-2">₹1Cr+</div>
               <div className="text-blue-100 font-medium">Auto-payouts Processed</div>
            </div>
            <div className="p-4">
               <div className="text-5xl font-black text-white mb-2">10k+</div>
               <div className="text-blue-100 font-medium">Protected Gig Workers</div>
            </div>
            <div className="p-4">
               <div className="text-5xl font-black text-white mb-2">&lt; 1s</div>
               <div className="text-blue-100 font-medium">Claim Approval Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-indigo-600 font-bold tracking-wide uppercase">AI-Powered Protection</h2>
            <p className="mt-2 text-4xl font-extrabold text-gray-900">How SurakshaPay Works</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            
            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                <CloudLightning size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">1. Live Environment Tracking</h3>
              <p className="text-gray-600 leading-relaxed">Our AI constantly monitors local OpenWeather and AQI APIs. If conditions become hazardous in your delivery zone, we know immediately.</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-indigo-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                <Activity size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">2. Parametric Smart Triggers</h3>
              <p className="text-gray-600 leading-relaxed">No claims to file. Once weather hits our predefined disruption threshold (e.g. 50mm rain in 2hrs), the system marks your zone as affected automatically.</p>
            </div>

            <div className="bg-gray-50 p-8 rounded-3xl border border-gray-100 hover:border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">3. Instant UPI Payouts</h3>
              <p className="text-gray-600 leading-relaxed">Funds are routed directly into your linked UPI account within seconds to cover your missed income for the entire day. Zero delays.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl font-extrabold mb-6 leading-tight">Built for Zomato, Swiggy, and Zepto Partners.</h2>
            <p className="text-xl text-gray-400 mb-8">We know how much a rainy day costs you. Stop letting unpredictable weather dictate your weekly earnings.</p>
            <ul className="space-y-4">
               <li className="flex items-center"><CheckCircle2 className="text-green-400 mr-3" /> <span className="text-lg">Flexible Weekly Premiums (Starting ₹49/week)</span></li>
               <li className="flex items-center"><CheckCircle2 className="text-green-400 mr-3" /> <span className="text-lg">No deductible or hidden fees</span></li>
               <li className="flex items-center"><CheckCircle2 className="text-green-400 mr-3" /> <span className="text-lg">Syncs with your Delivery App ID</span></li>
               <li className="flex items-center"><CheckCircle2 className="text-green-400 mr-3" /> <span className="text-lg">AI Fraud Detection prevents scams</span></li>
            </ul>
          </div>
          <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl relative transform hover:scale-[1.02] transition-transform duration-500">
             <div className="absolute top-0 right-0 -mr-4 -mt-4 bg-blue-600 text-white font-bold px-4 py-2 rounded-full shadow-lg transform rotate-6">Actual App View</div>
             <div className="bg-gray-900 rounded-xl p-6 mb-4">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-gray-400 text-sm">Active Coverage</p>
                    <p className="text-2xl font-bold text-green-400">₹2,000 / week</p>
                  </div>
                  <TrendingUp className="text-gray-500 w-8 h-8" />
                </div>
                <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-500 w-3/4"></div>
                </div>
             </div>
             
             <div className="space-y-3">
               <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-green-400">Payout Issued</p>
                    <p className="text-xs text-gray-400">Heavy Rainfall • Mumbai South</p>
                  </div>
                  <p className="font-bold text-white">+ ₹650</p>
               </div>
               <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-gray-300">Weekly Premium Paid</p>
                    <p className="text-xs text-gray-500">Auto-deduct</p>
                  </div>
                  <p className="font-bold text-gray-400">- ₹55</p>
               </div>
             </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="bg-blue-600 py-20">
         <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">Ready to secure your payouts?</h2>
            <Link href="/signup" className="inline-block bg-white text-blue-600 font-extrabold text-lg py-4 px-12 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
              Create Free Account
            </Link>
         </div>
      </section>
    </div>
  );
}
