import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useSearchParams } from 'react-router-dom';
import { Menu, User, Home, Wallet, CheckCircle, Twitter, Camera, X, BadgeCheck } from 'lucide-react';
import { auth, db } from './firebase';
import { ref, set, onValue } from "firebase/database";

const avatars = [
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Dusty",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Nala",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Milo",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Luna",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Buster",
  "https://api.dicebear.com/7.x/avataaars/svg?seed=Shadow"
];

// --- Main Dashboard Component ---
const MainDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [userData, setUserData] = useState({ name: 'User Name', email: '', avatar: avatars[0], verified: true });
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between p-4 bg-[#1e293b] border-b border-gray-700 sticky top-0 z-40">
        <Menu onClick={() => setMenuOpen(true)} className="cursor-pointer text-blue-400" />
        <div className="text-xl font-black tracking-tighter text-blue-500">EARNING X</div>
        <div onClick={() => setShowProfile(true)} className="cursor-pointer border-2 border-blue-500 rounded-full p-0.5">
           <img src={userData.avatar} className="w-8 h-8 rounded-full bg-gray-700" alt="profile" />
        </div>
      </nav>

      {/* Sidebar Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex">
          <div className="w-72 bg-[#1e293b] h-full p-6 shadow-2xl animate-slide-in">
            <div className="flex justify-between items-center mb-10">
              <span className="font-bold text-xl">Menu</span>
              <X onClick={() => setMenuOpen(false)} className="cursor-pointer" />
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4 text-lg hover:text-blue-400 cursor-pointer transition"><Home /> Main Home</div>
              <div className="flex items-center gap-4 text-lg hover:text-blue-400 cursor-pointer transition"><CheckCircle /> All Tasks</div>
              <div className="flex items-center gap-4 text-lg hover:text-blue-400 cursor-pointer transition"><Wallet /> Withdraw</div>
              <div className="flex items-center gap-4 text-lg hover:text-blue-400 cursor-pointer transition"><User /> My Account</div>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMenuOpen(false)}></div>
        </div>
      )}

      {/* Profile/User Settings Modal */}
      {showProfile && (
        <div className="fixed inset-0 bg-[#0f172a] z-50 overflow-y-auto p-6">
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-2xl font-bold">Your Profile</h2>
             <X onClick={() => setShowProfile(false)} className="cursor-pointer" />
          </div>
          
          <div className="flex flex-col items-center">
            <div className="relative group">
              <img src={userData.avatar} className="w-32 h-32 rounded-full border-4 border-blue-600 mb-4 bg-gray-800" />
              <div className="absolute bottom-4 right-0 bg-blue-600 p-2 rounded-full cursor-pointer"><Camera size={18}/></div>
            </div>
            <div className="flex items-center gap-2 mb-8">
              <span className="text-xl font-bold uppercase">{userData.name}</span>
              {userData.verified && <BadgeCheck className="text-blue-400 fill-blue-400/20" size={24} />}
            </div>

            <div className="w-full max-w-md space-y-4">
               <div><label className="text-gray-400 text-sm">Full Name</label><input className="w-full bg-[#1e293b] p-3 rounded-lg mt-1 border border-gray-700" value={userData.name} /></div>
               <div><label className="text-gray-400 text-sm">Email Address</label><input className="w-full bg-[#1e293b] p-3 rounded-lg mt-1 border border-gray-700" value={userData.email} disabled /></div>
               <div className="grid grid-cols-2 gap-4">
                  <div><label className="text-gray-400 text-sm">Birthday</label><input type="date" className="w-full bg-[#1e293b] p-3 rounded-lg mt-1 border border-gray-700" /></div>
                  <div><label className="text-gray-400 text-sm">Gender</label><select className="w-full bg-[#1e293b] p-3 rounded-lg mt-1 border border-gray-700"><option>Male</option><option>Female</option></select></div>
               </div>
            </div>

            <div className="mt-8 w-full max-w-md">
              <h3 className="mb-4 font-bold text-gray-300 uppercase text-xs tracking-widest">Select Avatar</h3>
              <div className="flex flex-wrap gap-4 justify-center">
                {avatars.map((av, i) => (
                  <img key={i} src={av} onClick={() => setUserData({...userData, avatar: av})} className={`w-14 h-14 rounded-full cursor-pointer border-2 ${userData.avatar === av ? 'border-blue-500 shadow-lg shadow-blue-500/50' : 'border-transparent opacity-60'}`} />
                ))}
              </div>
            </div>
            <button className="mt-10 bg-blue-600 w-full max-w-md py-4 rounded-2xl font-bold shadow-lg shadow-blue-600/30">SAVE CHANGES</button>
          </div>
        </div>
      )}

      {/* Hero Section & Task */}
      <div className="p-6 max-w-lg mx-auto">
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 rounded-[2rem] shadow-xl mb-8">
          <p className="text-blue-100 text-sm mb-1">Total Balance</p>
          <h1 className="text-4xl font-black mb-4">$ 250.50</h1>
          <button className="bg-white/20 backdrop-blur-md px-6 py-2 rounded-full font-semibold text-sm">Withdraw Money</button>
        </div>

        <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><Twitter className="text-blue-400"/> Twitter Verification</h3>
        <div className="bg-[#1e293b] p-5 rounded-2xl border border-gray-700 mb-6">
          <p className="text-sm text-gray-400 mb-4 italic">To verify your account, please repost our official post and click verify.</p>
          <a href="YOUR_TWITTER_POST_LINK" target="_blank" className="block text-center bg-blue-500 py-3 rounded-xl font-bold mb-3">Repost on Twitter</a>
          <button className="w-full border border-blue-500 py-3 rounded-xl font-bold text-blue-400 hover:bg-blue-500/10">Verify Re-post</button>
        </div>
      </div>
    </div>
  );
};

// --- App Routing ---
export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/register" element={<RegisterComponent />} />
      <Route path="/main" element={<MainDashboard />} />
      <Route path="/" element={<LoginComponent />} />
    </Routes>
  );
}

// (লগইন এবং রেজিস্ট্রেশন পেজ আগের মতো সুন্দর Tailwind ডিজাইন দিয়ে সাজাবেন)
const LoginComponent = () => (
  <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-6 text-white">
    <div className="w-full max-w-md space-y-8 bg-[#1e293b] p-8 rounded-[2.5rem] border border-gray-700 shadow-2xl">
      <div className="text-center">
        <h2 className="text-4xl font-black text-blue-500 italic">EARNING X</h2>
        <p className="mt-2 text-gray-400">Welcome back, login to continue</p>
      </div>
      <div className="space-y-4">
        <input className="w-full p-4 bg-gray-800 rounded-2xl border border-gray-700 outline-none focus:border-blue-500" placeholder="Email Address" />
        <input className="w-full p-4 bg-gray-800 rounded-2xl border border-gray-700 outline-none focus:border-blue-500" type="password" placeholder="Password" />
        <button className="w-full bg-blue-600 py-4 rounded-2xl font-bold shadow-lg shadow-blue-600/30">SIGN IN</button>
      </div>
    </div>
  </div>
);

const RegisterComponent = () => {
    const [searchParams] = useSearchParams();
    const invite = searchParams.get('invitationCode') || '';
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center p-6 text-white">
        <div className="w-full max-w-md space-y-6 bg-[#1e293b] p-8 rounded-[2.5rem] border border-gray-700">
          <h2 className="text-3xl font-bold text-center">Join <span className="text-blue-500">Earning X</span></h2>
          <input className="w-full p-4 bg-gray-800 rounded-2xl border border-gray-700" placeholder="Username" />
          <input className="w-full p-4 bg-gray-800 rounded-2xl border border-gray-700" placeholder="Email" />
          <input className="w-full p-4 bg-gray-800 rounded-2xl border border-gray-700" defaultValue={invite} placeholder="Invitation Code" />
          <button className="w-full bg-blue-600 py-4 rounded-2xl font-bold">CREATE ACCOUNT</button>
        </div>
      </div>
    );
};
