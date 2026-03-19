"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, MapPin, ShieldCheck, Briefcase } from "lucide-react";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const email = localStorage.getItem("user_email");
    const role = localStorage.getItem("user_role");
    
    if (!email) {
      router.push("/login");
      return;
    }
    
    if (role === "admin") {
      setUser({
        name: "Platform Administrator",
        email: email,
        phone: "N/A",
        city: "Global HQ",
        role: "Admin"
      });
    } else {
      // Find user from mock DB
      const usersStr = localStorage.getItem("registered_users");
      const users = usersStr ? JSON.parse(usersStr) : [];
      const data = users.find((u: any) => u.email === email);
      
      if (data) {
        setUser(data);
      } else {
        // Fallback for demo
        setUser({
          name: localStorage.getItem("user_name") || "Delivery Partner",
          email: email,
          phone: "9876543210",
          city: "Mumbai",
          role: "Gig Worker"
        });
      }
    }
  }, [router]);

  if (!user) return <div className="min-h-[80vh] flex items-center justify-center">Loading Profile...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Cover & Avatar */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
        <div className="px-8 pb-8 relative">
           <div className="absolute -top-12 border-4 border-white bg-white rounded-full p-2 shadow-sm">
             <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center">
               <User className="w-10 h-10 text-gray-400" />
             </div>
           </div>
           
           <div className="mt-14 flex justify-between items-start">
             <div>
               <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
               <p className="text-gray-500 font-medium flex items-center mt-1">
                 {user.role === 'Admin' ? <Briefcase className="w-4 h-4 mr-1" /> : <ShieldCheck className="w-4 h-4 mr-1 text-green-500" />}
                 {user.role}
               </p>
             </div>
             <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium transition">
               Edit Profile
             </button>
           </div>
        </div>
        
        {/* Details Grids */}
        <div className="px-8 pb-10 border-t border-gray-100 pt-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            <div className="flex items-start bg-gray-50 p-4 rounded-xl">
               <Mail className="w-5 h-5 text-blue-500 mt-1 mr-4" />
               <div>
                  <p className="text-sm font-medium text-gray-500">Email Address</p>
                  <p className="text-gray-900 font-medium">{user.email}</p>
               </div>
            </div>

            <div className="flex items-start bg-gray-50 p-4 rounded-xl">
               <Phone className="w-5 h-5 text-indigo-500 mt-1 mr-4" />
               <div>
                  <p className="text-sm font-medium text-gray-500">Phone Number</p>
                  <p className="text-gray-900 font-medium">{user.phone}</p>
               </div>
            </div>

            <div className="flex items-start bg-gray-50 p-4 rounded-xl">
               <MapPin className="w-5 h-5 text-red-500 mt-1 mr-4" />
               <div>
                  <p className="text-sm font-medium text-gray-500">Service Zone</p>
                  <p className="text-gray-900 font-medium">{user.city}</p>
               </div>
            </div>
            
            <div className="flex items-start bg-gray-50 p-4 rounded-xl">
               <ShieldCheck className="w-5 h-5 text-green-500 mt-1 mr-4" />
               <div>
                  <p className="text-sm font-medium text-gray-500">Coverage Status</p>
                  <p className="text-green-600 font-bold">Standard Risk Setup</p>
               </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
