import { useState } from "react";
export default function StreamInput() {
  const [url , setUrl] = useState("");
  const [timestamp , setTimestamp] = useState("");
  const [isLoading , setIsLoading] = useState(false);
  const [error , setError] = useState(null);
  // An array state to store the session history
  const [pulses, setPulses] = useState([]);

  const handleScan = async () => {
    if(!url)
      return alert("Please enter a youtube video or shorts link");
    setIsLoading(true);
    setError(null);
    try{
      //response - entire HTTP object returned by server
      const response = await fetch("http://localhost:5000/identify" , {
      method : "POST",
      headers: {"Content-Type" : "application/json"},
      body: JSON.stringify({url , start_time: timestamp})
    });
    const data = await response.json();
    if(response.ok){
      const pulse = {
        ...data,
        timestamp: Date.now(),
        timeAgo: "Just now"
      }
      //set the current pulse to the top of the list
      setPulses(prev => [pulse , ...prev]);
      //clear input fields after result is returned
      setUrl("");
      setTimestamp("");
    }
    else{
        setError(data.error || "Frequency alignment failed. Please try again.")
      }
  }
  catch(err){
    console.error(err);
    setError("An unexpected error occurred. Please try again.");
  }
  finally{
    setIsLoading(false);
  }
  };

  return (
    <section className="space-y-6">
      <div className="bg-[#0f1930] rounded-xl p-6">
        <h2 className="font-bold text-lg uppercase mb-6">
          🎵 Stream Link
        </h2>

        <div className="space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}
          {/* URL */}
          <div>
            <label className="text-xs text-[#a3aac4] uppercase">
              YouTube URL
            </label>
            <input
              type="text"
              value = {url}
              onChange = {(e) => setUrl(e.target.value)}
              placeholder="https://youtube.com/..."
              className="w-full mt-2 px-3 py-2 bg-[#091328] border border-gray-600 rounded-lg focus:outline-none focus:border-[#c084fc]"
            />
          </div>

          {/* Timestamp */}
          <div className="max-w-45">
            <label className="text-xs text-[#a3aac4] uppercase">
              Timestamp
            </label>
            <input
              type="text"
              value = {timestamp}
              onChange = {(e) => setTimestamp(e.target.value)}
              placeholder="mm:ss"
              className="w-full mt-2 px-3 py-2 text-center bg-[#091328] border border-gray-600 rounded-lg focus:outline-none focus:border-[#c084fc]"
            />
          </div>

          <button 
          onClick = {handleScan}
          disabled={isLoading}
          className="w-full py-3 rounded-lg bg-linear-to-r from-[#cc97ff] to-[#9c48ea] font-bold">
            {isLoading ? "Scanning..." : "SCAN FREQUENCY"}
          </button>
        </div>
      </div>

      {/* Recent */}
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
    </section>
  );
}