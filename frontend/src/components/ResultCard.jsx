export default function ResultCard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center w-full">

      {/* LEFT: Artwork */}
      <div className="lg:col-span-5 relative group">

        {/* Glow */}
        <div className="absolute -inset-4 bg-gradient-to-r from-primaryFrom to-primaryTo opacity-20 blur-3xl rounded-full group-hover:opacity-30 transition" />

        {/* Image */}
        <div className="relative rounded-xl overflow-hidden bg-card border border-border aspect-square shadow-2xl">

          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
            alt="Album Art"
            className="w-full h-full object-cover"
          />

          {/* Match Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-bg/80 backdrop-blur px-4 py-2 rounded-full border border-purple-400/20">
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-widest text-purple-300">
              Match 99%
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT: Info */}
      <div className="lg:col-span-7 space-y-8">

        {/* Title */}
        <div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black leading-none">
            Midnight City
          </h1>

          <h2 className="text-2xl sm:text-3xl text-textSub mt-2">
            M83
          </h2>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          {/* Spotify */}
          <button className="h-14 rounded-xl font-bold flex items-center justify-center gap-2 bg-gradient-to-r from-primaryFrom to-primaryTo hover:shadow-[0_0_25px_rgba(168,85,247,0.6)] transition active:scale-95">
            ▶ Listen on Spotify
          </button>

          {/* YouTube */}
          <button className="h-14 rounded-xl font-bold bg-card border border-border hover:bg-[#222c44] transition active:scale-95">
            📺 Watch on YouTube
          </button>

          {/* Identify Another */}
          <button className="sm:col-span-2 flex justify-between items-center border-b border-border py-4 group">
            <span className="text-textSub uppercase text-sm font-bold group-hover:text-primaryFrom transition">
              Identify Another Track
            </span>

            <span className="group-hover:translate-x-2 transition">
              →
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}