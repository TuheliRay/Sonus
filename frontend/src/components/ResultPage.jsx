import Navbar from "../components/Navbar";
import ResultCard from "../components/ResultCard";
import Footer from "../components/Footer";

export default function ResultPage() {
  return (
    <div className="bg-bg text-textMain min-h-screen flex flex-col relative overflow-hidden">

      {/* Background Wave */}
      <div className="absolute bottom-0 w-full opacity-20 pointer-events-none">
        <svg viewBox="0 0 1440 320">
          <path
            fill="#a855f7"
            d="M0,224L80,208C160,192,320,160,480,165.3C640,171,800,213,960,218.7C1120,224,1280,192,1360,176L1440,160L1440,320L0,320Z"
          />
        </svg>
      </div>

      <Navbar />

      <main className="pt-28 pb-16 px-4 sm:px-6 max-w-7xl mx-auto flex-1 flex items-center">
        <ResultCard />
      </main>

      <Footer />
    </div>
  );
}