import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100">
          <ShieldCheck className="w-10 h-10 text-blue-600" />
          <h1 className="text-3xl font-extrabold text-gray-900">Privacy Policy</h1>
        </div>
        
        <div className="prose prose-blue max-w-none space-y-6 text-gray-600">
          <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
          <p>We collect information you provide directly to us when opening an account, including your Name, Phone Number, Email, and Delivery Zone. We also collect automated environmental data (weather, AQI, traffic) connected to your registered zone.</p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Use of Information</h2>
          <p>Your information is primarily used to facilitate the AI Parametric Trigger system. We track external APIs mapped to your delivery zone to issue automatic payouts in the event of income disruption.</p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Data Security</h2>
          <p>We implement stringent security measures, including our AI Fraud Detection Module, to protect both your data and the integrity of the insurance pool.</p>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <Link href="/" className="text-blue-600 font-bold hover:text-blue-800 transition">
              &larr; Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
