export default function UploadSection() {
  return (
    <div className="bg-[#0f1930] rounded-xl p-2 min-h-[400px] flex flex-col">
      
      <div className="flex-1 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center p-6 text-center">
        
        <div className="text-4xl mb-4">☁️</div>

        <h2 className="text-xl font-bold mb-2">
          Drag & Drop Audio
        </h2>

        <p className="text-sm text-gray-400 mb-4">
          Upload MP3, WAV, AAC
        </p>

        <button className="px-5 py-2 border border-[#cc97ff] text-[#cc97ff] rounded-lg">
          Select File
        </button>
      </div>

      {/* Progress */}
      <div className="p-4">
        <div className="flex justify-between text-xs mb-2">
          <span>Processing</span>
          <span className="text-cyan-400">Live</span>
        </div>

        <div className="h-1 bg-gray-700 rounded-full">
          <div className="w-1/3 h-full bg-gradient-to-r from-[#cc97ff] to-[#9c48ea]" />
        </div>
      </div>
    </div>
  );
}