"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Users, AlertTriangle, IndianRupee, Activity } from "lucide-react";

export default function Admin() {
  const [metrics, setMetrics] = useState({
    users: 1450,
    activePlans: 1200,
    flaggedClaims: 12,
    payouts: 45000
  });
  
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("user_email");
    const role = localStorage.getItem("user_role");
    
    if (!email) {
      router.push("/login");
    } else if (role !== "admin") {
      router.push("/dashboard"); // Redirect workers away from admin panel
    }
  }, [router]);

  const generateFraud = () => {
    setMetrics({ ...metrics, flaggedClaims: metrics.flaggedClaims + 1 });
    alert("🚨 Fraud Detected: Claim from an area with NO reported weather disruption flagged.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      <div className="flex justify-between items-center bg-gray-900 p-6 rounded-2xl shadow-md">
        <div>
          <h1 className="text-2xl font-bold text-white">Platform Admin</h1>
          <p className="text-gray-400">System Overview & Fraud Detection</p>
        </div>
        <button 
          onClick={generateFraud}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5" /> Trigger Fraud Simulation
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-gray-500 text-sm font-medium flex items-center mb-2"><Users className="w-4 h-4 mr-1"/> Total Users</div>
          <div className="text-3xl font-black text-gray-900">{metrics.users}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-green-600 text-sm font-medium flex items-center mb-2"><Activity className="w-4 h-4 mr-1"/> Active Plans</div>
          <div className="text-3xl font-black text-green-600">{metrics.activePlans}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-blue-600 text-sm font-medium flex items-center mb-2"><IndianRupee className="w-4 h-4 mr-1"/> Total Payouts</div>
          <div className="text-3xl font-black text-blue-600">₹{metrics.payouts}</div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="text-red-600 text-sm font-medium flex items-center mb-2"><AlertTriangle className="w-4 h-4 mr-1"/> Flagged (Fraud)</div>
          <div className="text-3xl font-black text-red-600">{metrics.flaggedClaims}</div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-6 mt-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Live Threat & Claim Stream</h2>
        <div className="space-y-4">
           {metrics.flaggedClaims > 12 && (
             <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex">
               <AlertTriangle className="text-red-500 mr-3 flex-shrink-0 mt-1" />
               <div>
                  <h3 className="font-bold text-red-800">Anomaly Detected (Score: 85/100)</h3>
                  <p className="text-sm text-red-600 mt-1">User attempted to claim weather disruption payout, but OpenWeather API reported clear skies in their zone.</p>
               </div>
             </div>
           )}
           <div className="p-4 rounded-xl border border-gray-100 flex justify-between items-center">
             <div>
               <h3 className="font-bold text-gray-900 text-sm">Valid Claim Automated</h3>
               <p className="text-xs text-gray-500 mt-1">AQI crossed 350 limit in Delhi NCR. 450 active users paid out.</p>
             </div>
             <div className="text-green-600 font-bold bg-green-50 px-3 py-1 rounded text-sm">PROCESSED</div>
           </div>
        </div>
      </div>

    </div>
  );
}
