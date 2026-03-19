"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { ShieldAlert, CheckCircle, CloudRain, ShieldCheck, Wallet } from "lucide-react";

export default function Dashboard() {
  const [riskData, setRiskData] = useState([
    { day: "Mon", risk: 20 },
    { day: "Tue", risk: 45 },
    { day: "Wed", risk: 85 },
    { day: "Thu", risk: 30 },
    { day: "Fri", risk: 10 },
    { day: "Sat", risk: 60 },
  ]);

  const [activePlan, setActivePlan] = useState(false);
  const [currentRisk, setCurrentRisk] = useState({ score: 45, level: "Medium", premium: 50.0 });
  const [claims, setClaims] = useState<any[]>([]);
  const [upiId, setUpiId] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("user_email");
    const role = localStorage.getItem("user_role");
    
    if (!email) {
      router.push("/login");
    } else if (role === "admin") {
      router.push("/admin"); // Redirect admins away from worker dashboard
    }
    
    const savedUpi = localStorage.getItem("user_upi");
    if (savedUpi) setUpiId(savedUpi);
  }, [router]);

  // Simulate buying a plan
  const buyPlan = () => {
    if (!upiId) {
      alert("Please configure your Payout Method (UPI ID) first.");
      return;
    }
    setActivePlan(true);
    alert("Plan purchased successfully! Premium: ₹" + currentRisk.premium);
  };

  const saveUpi = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("user_upi", upiId);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Simulate external disruption (weather/traffic)
  const triggerSimulation = () => {
    if (!activePlan) {
      alert("You need an active plan to receive payouts.");
      return;
    }
    
    // Simulate high rain
    const disruptionScore = 90;
    
    // Auto-create claim
    const newClaim = {
      id: Math.random().toString(36).substr(2, 5),
      amount: 2000,
      reason: "Heavy Rain (API Trigger)",
      time: new Date().toLocaleTimeString(),
      status: "PROCESSED"
    };
    
    setClaims([newClaim, ...claims]);
    alert("🌧️ Heavy Rain Detected! Parametric Claim Automatically Processed for ₹2000.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Delivery Partner Dashboard</h1>
          <p className="text-gray-500">Welcome back. Here is your weekly risk overview.</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          {activePlan ? (
             <div className="flex items-center px-4 py-2 bg-green-50 text-green-700 rounded-full font-medium shadow-sm border border-green-200">
                <CheckCircle className="w-5 h-5 mr-2" />
                Active Coverage (₹2000)
             </div>
          ) : (
            <button onClick={buyPlan} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
              Buy Weekly Plan (₹{currentRisk.premium})
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Risk Level Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
          <div className={`p-4 rounded-full ${currentRisk.level === 'High' ? 'bg-red-100 text-red-600' : currentRisk.level === 'Medium' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
             <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="mt-4 text-xl font-bold text-gray-900">Current AI Risk</h2>
          <p className={`text-2xl font-black mt-2 ${currentRisk.level === 'High' ? 'text-red-500' : currentRisk.level === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
            {currentRisk.level} ({currentRisk.score}/100)
          </p>
          <p className="text-sm text-gray-500 mt-2 text-center">Based on real-time AQI, Weather, and Traffic APIs.</p>
        </div>

        {/* Prediction Chart */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <h2 className="text-lg font-bold text-gray-900 mb-4">7-Day Risk Prediction</h2>
           <div className="h-64 w-full">
             <ResponsiveContainer width="100%" height="100%">
                <LineChart data={riskData}>
                  <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="risk" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </LineChart>
             </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Simulator & Claims */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white">
          <h2 className="text-lg font-bold text-indigo-900 flex items-center">
            <CloudRain className="mr-2 h-5 w-5" />
            Parametric Trigger Simulation
          </h2>
          <p className="text-indigo-700 text-sm mt-2 mb-6">
            For demo purposes, manually trigger a bad weather or traffic event to see the parametric engine auto-process a claim.
          </p>
          <button 
            onClick={triggerSimulation}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3.5 rounded-xl font-bold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex justify-center items-center">
            Simulate Heavy Rain Event
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <h2 className="text-lg font-bold text-gray-900 flex items-center mb-4">
              <ShieldCheck className="mr-2 h-5 w-5 text-green-500" />
              Recent Auto-Payouts
           </h2>
           
           {claims.length === 0 ? (
             <p className="text-gray-500 text-sm italic">No recent claims.</p>
           ) : (
             <div className="space-y-3">
               {claims.map(claim => (
                 <div key={claim.id} className="p-3 bg-gray-50 rounded-lg flex justify-between items-center border border-gray-100">
                    <div>
                      <p className="text-sm font-bold text-gray-900">₹{claim.amount} - {claim.reason}</p>
                      <p className="text-xs text-gray-500">{claim.time} • ID: {claim.id}</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded">
                      {claim.status}
                    </span>
                 </div>
               ))}
             </div>
           )}
        </div>

      </div>

      {/* Payout Details */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-900 flex items-center mb-4">
          <Wallet className="mr-2 h-5 w-5 text-blue-500" />
          Payout Details (UPI / Bank Account)
        </h2>
        <p className="text-sm text-gray-500 mb-6">Enter your details to receive automatic parametric claim payouts instantly to your account without any paperwork.</p>
        
        <form onSubmit={saveUpi} className="max-w-md flex flex-col sm:flex-row gap-3">
          <input 
            type="text" 
            placeholder="e.g. 9876543210@ybl or account number" 
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            required
            className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
          />
          <button 
            type="submit" 
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-sm flex items-center justify-center min-w-[120px]"
          >
            {isSaved ? "Saved ✓" : "Save Details"}
          </button>
        </form>
      </div>
    </div>
  );
}
