import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100">
          <ShieldCheck className="w-10 h-10 text-blue-600" />
          <h1 className="text-3xl font-extrabold text-gray-900">Terms of Service</h1>
        </div>
        
        <div className="prose prose-blue max-w-none space-y-6 text-gray-600">
          <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>By registering on SurakshaPay, you agree to these Terms of Service. Note that SurakshaPay operates on a <strong>Parametric Contract Model</strong>, meaning payouts are algorithmic and based on predefined external API thresholds, not individual assessments of loss.</p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">2. Eligibility</h2>
          <p>You must be an active delivery partner for acknowledged gig-economy platforms (e.g., Zomato, Swiggy, Zepto, Amazon) operating in a supported Indian city.</p>
          
          <h2 className="text-xl font-bold text-gray-900 mt-8 mb-4">3. Fraudulent Activity</h2>
          <p>Any attempt to falsify location data or manipulate API triggers will result in immediate termination of the account and forfeiture of the active premium.</p>

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
