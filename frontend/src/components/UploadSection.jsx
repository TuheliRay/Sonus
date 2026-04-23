import { useState, useRef } from "react";

const API_URL = import.meta.env.DEV
  ? "http://localhost:5000"
  : "https://sonus-pnku.onrender.com";

export default function UploadSection({ onAddPulse }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const progressInterval = useRef(null);

  const startSimulatedProgress = () => {
    setProgress(0);
    setIsProcessing(true);
    setError(null);
    setScanResult(null);
    //setInterval returns an ID and stores it in the ref
    progressInterval.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 92) {
          clearInterval(progressInterval.current);
          return 92;
        }
        const increment = Math.random() * 5;
        return prev + increment;
      })
    }, 600)
  }

  const handleUpload = async (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile)
      return;
    setFile(selectedFile);
    startSimulatedProgress();

    //formdata = send data to a server in the same format as html form
    //used because normal JSON cannot send audio files
    //most backends expect file uploads as formd data
    const formData = new FormData();
    formData.append("audio", selectedFile);
    const e2eStart = performance.now();
    try {
      const response = await fetch(`${API_URL}/identify-upload`, {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      const e2eLatency = performance.now() - e2eStart;
      console.log(`e2e_latency_ms: ${e2eLatency.toFixed(2)}`);  
      clearInterval(progressInterval.current);

      if (response.ok) {
        setProgress(100);
        setTimeout(() => {
          setIsProcessing(false);
          if (!data.error) {
            setScanResult("success");
            console.log(`⏱️ ACRCloud API Match Time: ${data.acrcloud_time}s`);
            console.log(`⏱️ Total Backend Processing Time: ${data.total_backend_time.toFixed(2)}s`);
            if (onAddPulse) onAddPulse(data);
          } else {
            setScanResult("not_recognized");
          }
        }, 700);
      }
      else {
        setIsProcessing(false);
        setError(data.error || "Failed to process audio file");
      }
    }
    catch (err) {
      console.error(err);
      setIsProcessing(false);
      setError("An unexpected error occurred. Please try again.");
    }
  }
  return (
    <div className="bg-[#0f1930] rounded-xl p-2 min-h-[300px] lg:min-h-[360px] flex flex-col h-full">

      <div className="flex-1 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center p-6 text-center">
        <input
          type="file"
          id="upload-audio"
          hidden
          onChange={handleUpload}
          accept="audio/*"
        />

        <div className="text-4xl mb-4">☁️</div>

        <h2 className="text-xl font-bold mb-2">
          {file ? file.name : "Drop your audio"}
        </h2>

        <p className="text-[10px] sm:text-xs font-semibold tracking-wider text-gray-400 uppercase mb-6">
          {file ? "File Uploaded" : "WAV, MP3, OR FLAC UP TO 20MB"}
        </p>

        <label className="px-6 py-2 bg-[#d1a3ff] hover:bg-[#bd7cfc] text-black font-bold uppercase tracking-wide rounded-md cursor-pointer inline-block transition-colors" htmlFor="upload-audio">
          {isProcessing ? "PROCESSING..." : "SELECT FILE"}
        </label>
      </div>

      {/* Progress / Result */}
      <div className="p-4 min-h-[80px] flex flex-col justify-center">
        {error ? (
          <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center animate-fade-in">
            {error}
          </div>
        ) : scanResult ? (
          <div className="text-center animate-fade-in">
            {scanResult === "success"
              ? <p className="text-[#cc97ff] text-sm font-semibold tracking-wide">You can find your song in the recent pulses section</p>
              : <p className="text-red-400 text-sm font-semibold tracking-wide">Song not recognized</p>
            }
          </div>
        ) : (
          <div className={`transition-opacity duration-500 ${isProcessing ? "opacity-100" : "opacity-0"}`}>
            <div className="flex justify-between text-xs mb-2">
              <span className="text-[#a3aac4] uppercase font-semibold">
                {progress < 100 ? "Analyzing Pulse..." : "Frequency Locked"}
              </span>
              <span className="text-cyan-400 font-mono">{Math.floor(progress)}%</span>
            </div>

            <div className="h-1.5 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#cc97ff] to-[#9c48ea] transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}