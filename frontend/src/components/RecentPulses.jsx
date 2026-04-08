export default function RecentPulses({ pulses }) {
  return (
    <div className="bg-[#091328] rounded-xl p-5">
      <h3 className="text-xs text-[#a3aac4] uppercase mb-4">
        Recent Pulses
      </h3>
      <div className="space-y-3">
        {pulses.length === 0 ? (
          <p className="text-xs text-gray-500 italic text-center py-4">
            No pulses yet. Scan a song to start!
          </p>
        ) : (
          pulses.map((pulse, index) => (
            <div key={index} className="p-3 bg-[#0f1930] rounded-lg flex justify-between border-l-2 border-[#c084fc]">
              <div>
                <p className="font-bold text-sm">{pulse.title || "Unknown Track"}</p>
                <p className="text-xs text-gray-400">{pulse.artist || "Unknown Artist"} • {pulse.timeAgo}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
