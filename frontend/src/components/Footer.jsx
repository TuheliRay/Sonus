export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-textSub gap-4">
      <div>
        <div className="text-primaryFrom font-bold">Sonus</div>
        <p>© 2024 Sonus. The Kinetic Pulse.</p>
      </div>

      <div className="flex gap-6">
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
        <a href="#">Support</a>
        <a href="#">Careers</a>
      </div>
      
      <div className="flex gap-4 text-lg">
        🌐 🔗
      </div>
    </footer>
    
  );
}