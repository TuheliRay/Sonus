export default function StreamInput() {
  return (
    <section className="space-y-6">
      <div className="bg-[#0f1930] rounded-xl p-6">
        <h2 className="font-bold text-lg uppercase mb-6">
          🎵 Stream Link
        </h2>

        <div className="space-y-6">
          {/* URL */}
          <div>
            <label className="text-xs text-[#a3aac4] uppercase">
              YouTube URL
            </label>
            <input
              type="text"
              placeholder="https://youtube.com/..."
              className="w-full mt-2 px-3 py-2 bg-[#091328] border border-gray-600 rounded-lg focus:outline-none focus:border-[#c084fc]"
            />
          </div>

          {/* Timestamp */}
          <div className="max-w-[180px]">
            <label className="text-xs text-[#a3aac4] uppercase">
              Timestamp
            </label>
            <input
              type="text"
              placeholder="mm:ss"
              className="w-full mt-2 px-3 py-2 text-center bg-[#091328] border border-gray-600 rounded-lg focus:outline-none focus:border-[#c084fc]"
            />
          </div>

          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-[#cc97ff] to-[#9c48ea] font-bold">
            SCAN FREQUENCY
          </button>
        </div>
      </div>

      {/* Recent */}
      <div className="bg-[#091328] rounded-xl p-5">
        <h3 className="text-xs text-[#a3aac4] uppercase mb-4">
          Recent Pulses
        </h3>

        <div className="p-3 bg-[#0f1930] rounded-lg flex justify-between">
          <div>
            <p className="font-bold text-sm">Midnight City</p>
            <p className="text-xs text-gray-400">M83 • 2m ago</p>
          </div>
        </div>
      </div>
    </section>
  );
}