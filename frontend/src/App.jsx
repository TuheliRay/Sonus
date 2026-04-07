import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StreamInput from "./components/StreamInput";
import UploadSection from "./components/UploadSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-[#060e20] text-[#dee5ff] min-h-screen font-body">
      <Navbar />

      <main className="pt-20 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <Hero />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <StreamInput />
          </div>

          <div className="lg:col-span-5">
            <UploadSection />
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

