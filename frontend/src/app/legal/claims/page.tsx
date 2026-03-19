import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function ClaimsPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100">
          <ShieldCheck className="w-10 h-10 text-blue-600" />
          <h1 className="text-3xl font-extrabold text-gray-900">Parametric Claims Policy</h1>
        </div>
        
        <div className="prose prose-blue max-w-none space-y-6 text-gray-600">
          <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">How Claims Work</h2>
          <p>SurakshaPay represents a paradigm shift. Unlike traditional insurance, <strong>you do not file claims</strong>. Our system handles everything.</p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Trigger Thresholds</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Rainfall:</strong> &gt; 50mm within a continuous 3-hour window.</li>
            <li><strong>Air Quality Index:</strong> Sustained AQI levels over 350 for a 12-hour duration.</li>
            <li><strong>Traffic Disruption:</strong> Unprecedented gridlock triggered by city administration APIs.</li>
          </ul>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">Payout Process</h2>
          <p>When an API trigger condition is met in your designated zone, the predefined payout limit (up to ₹2000 per week) is automatically routed to your connected UPI ID within 1 millisecond. We assume 100% loss of income capability during trigger events.</p>

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
