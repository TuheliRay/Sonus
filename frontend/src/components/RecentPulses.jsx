export default function RecentPulses({ pulses }) {
  return (
    <div className="space-y-4">
      {pulses.length === 0 ? (
        <p className="text-sm text-gray-500 italic py-4">
          No pulses yet. Scan a song to start!
        </p>
      ) : (
        pulses.map((pulse, index) => (
          <div key={index} className="p-4 bg-[#0f1930] rounded-xl flex justify-between border-l-2 border-[#c084fc]">
            <div>
              <p className="font-bold text-sm">{pulse.title || "Unknown Track"}</p>
              <p className="text-xs text-gray-400 mt-1">{pulse.artist || "Unknown Artist"} • {pulse.timeAgo}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
