import { Globe, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border px-6 py-6 flex flex-col md:flex-row items-center justify-between text-sm text-textSub gap-4 w-full">
      <div className="w-full md:w-1/3 flex justify-center md:justify-start">
        <div className="text-primaryFrom font-bold text-base">Sonus</div>
      </div>

      <div className="w-full md:w-1/3 flex justify-center text-center">
        <p>© 2024 Sonus. The Kinetic Pulse.</p>
      </div>
      
      <div className="w-full md:w-1/3 flex justify-center md:justify-end gap-4 text-gray-400">
        <Globe size={18} className="cursor-pointer hover:text-gray-200 transition-colors" />
        <Share2 size={18} className="cursor-pointer hover:text-gray-200 transition-colors" />
      </div>
    </footer>
    
  );
}