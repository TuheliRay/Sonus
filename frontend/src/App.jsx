import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import UploadSection from "./components/UploadSection";
import Footer from "./components/Footer";
import RecentPulses from "./components/RecentPulses";


export default function App() {
  const [pulses, setPulses] = useState([]);

  const addPulse = (data) => {
    const pulse = {
      ...data,
      timestamp: Date.now(),
      timeAgo: "Just now"
    };
    setPulses(prev => [pulse, ...prev]);
  };

  return (
    <div className="bg-[#060e20] text-[#dee5ff] min-h-screen font-body">
      <Navbar />

      <main className="pt-20 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <Hero />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left Column: Identify Track */}
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold mb-2">Identify Track</h2>
            <p className="text-[#a3aac4] text-sm mb-6">
              Capture the essence. Upload an audio fragment to
              analyze the sonic pulse.
            </p>
            <UploadSection onAddPulse={addPulse} />
          </div>

          {/* Right Column: Recent Pulses */}
          <div className="flex flex-col">
            <h2 className="text-3xl font-bold mb-2">Recent Pulses</h2>
            <p className="text-[#a3aac4] text-xs font-semibold uppercase tracking-wider mb-6">
              Your identification history
            </p>
            <RecentPulses pulses={pulses} />
            <div className="mt-8 text-center lg:text-right">
              <span className="text-xs font-bold text-[#cc97ff] uppercase tracking-wider">
                {pulses.length} {pulses.length === 1 ? "song" : "songs"} detected
              </span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <div className="fixed bottom-0 left-0 w-full pointer-events-none opacity-10 z-0">
        <svg viewBox="0 0 1440 320" className="w-full h-auto">
          <path
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L0,320Z"
            fill="#cc97ff"
          />
        </svg>
      </div>
    </div>
  );
}

