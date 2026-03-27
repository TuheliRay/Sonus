// import { useState } from 'react'
// import { Music, Clock, Link as LinkIcon, AlertCircle, Zap, Youtube, ExternalLink } from 'lucide-react'

// function App() {
//   const [formData, setFormData] = useState({
//     url: '',
//     start_time: '',
//   })
//   const [status, setStatus] = useState('idle')
//   const [result, setResult] = useState(null)
//   const [error, setError] = useState('')

//   function handleChange(event) {
//     const { name, value } = event.target
//     setFormData((current) => ({
//       ...current,
//       [name]: value,
//     }))
//   }

//   async function handleSubmit(event) {
//     event.preventDefault()
//     setStatus('loading')
//     setResult(null)
//     setError('')

//     try {
//       const response = await fetch('/identify', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       })

//       const data = await response.json()

//       if (!response.ok || data.error) {
//         throw new Error(data.error || 'Something went wrong while identifying the song.')
//       }

//       setResult(data)
//       setStatus('success')
//     } catch (submitError) {
//       setError(submitError.message)
//       setStatus('error')
//     }
//   }

//   return (
//     <div className="h-dvh bg-[#0b1016] text-[#e2e8f0] font-sans relative flex flex-col items-center overflow-hidden mix-blend-mode-normal">
      
//       {/* Dark gradient backdrop to simulate the subtle glow */}
//       <div className="absolute top-0 left-0 w-full h-[60%] bg-[linear-gradient(to_bottom,rgba(16,25,35,0.8),transparent)] pointer-events-none" />
//       <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-200 h-100 bg-[#1a2f3f]/40 blur-[100px] rounded-full pointer-events-none" />

//       {/* Faint Waveform graphics overlay on background */}
//       <div className="absolute inset-x-0 top-[35%] h-50 opacity-[0.03] flex justify-center gap-1.5 pointer-events-none overflow-hidden">
//         {Array.from({ length: 40 }).map((_, i) => (
//            <div key={`wave-${i}`} className="w-2 bg-white rounded-full h-full" style={{ height: `${20 + Math.random() * 80}%`, opacity: Math.random() }} />
//         ))}
//       </div>

//       <main className="relative z-10 w-full max-w-200 px-6 py-10 flex flex-col items-center h-full gap-8">
        
//         {/* Header Section */}
//         <div className="flex flex-col items-center text-center shrink-0 w-full pt-4">
//           <div className="flex items-center gap-2 mb-3">
//             <div className="h-6 w-6 rounded-full bg-[#cbd5e1] flex items-center justify-center">
//               <Zap className="h-4 w-4 text-[#0b1016] fill-[#0b1016]" />
//             </div>
//             <span className="text-[1.2rem] font-bold tracking-tight text-[#cbd5e1]">Sonus</span>
//           </div>
//           <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#64748b] mb-4">
//             YouTube song finder
//           </p>
//           <h1 className="text-[clamp(1.4rem,3.5vw,2.1rem)] font-bold leading-[1.3] text-[#f1f5f9] max-w-[28ch]">
//             Paste a video link, choose the exact moment, and let Sonus identify the music.
//           </h1>
//         </div>

//         {/* Content Container (Will hold both cards to enforce exact same width) */}
//         <div className="w-full flex flex-col gap-6 items-center">
          
//           {/* Form Card */}
//           <section className="w-full rounded-3xl bg-[linear-gradient(135deg,rgba(200,210,220,0.85),rgba(220,230,240,0.7))] backdrop-blur-2xl px-6 py-6 pb-9 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/40 shrink-0 relative">
//             <form className="flex flex-col gap-5 w-full" onSubmit={handleSubmit}>
//               <div className="grid gap-6 sm:grid-cols-[1.8fr_1fr]">
//                 <label className="flex flex-col gap-2">
//                   <span className="text-[12px] font-bold text-[#1e293b] ml-1">YouTube or Shorts URL</span>
//                   <div className="relative flex items-center">
//                     <Youtube className="absolute left-4 h-5 w-5 text-[#94a3b8]" />
//                     <input
//                       name="url"
//                       type="url"
//                       value={formData.url}
//                       onChange={handleChange}
//                       placeholder="https://www.youtube.com/watch?v=..."
//                       required
//                       className="w-full rounded-full bg-[#303842] hover:bg-[#39424e] focus:bg-[#2a313a] border-2 border-transparent focus:border-[#4ade80]/50 outline-none pl-12 pr-4 py-[14px] text-sm text-[#f1f5f9] transition-all font-medium placeholder:text-[#64748b] shadow-inner"
//                     />
//                   </div>
//                 </label>

//                 <label className="flex flex-col gap-2">
//                   <span className="text-[12px] font-bold text-[#1e293b] ml-1">Timestamp</span>
//                   <div className="relative flex items-center">
//                     <Clock className="absolute left-4 h-5 w-5 text-[#94a3b8]" />
//                     <input
//                       name="start_time"
//                       type="text"
//                       value={formData.start_time}
//                       onChange={handleChange}
//                       placeholder="0:10"
//                       required
//                       className="w-full rounded-full bg-[#303842] hover:bg-[#39424e] focus:bg-[#2a313a] border-2 border-transparent focus:border-[#4ade80]/50 outline-none pl-12 pr-4 py-[14px] text-sm text-[#f1f5f9] transition-all font-medium placeholder:text-[#64748b] shadow-inner"
//                     />
//                   </div>
//                 </label>
//               </div>

//               {/* Positioned Button slightly overlapping or just below inner content */}
//               <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 z-20">
//                 <button
//                   type="submit"
//                   disabled={status === 'loading'}
//                   className="rounded-full bg-[linear-gradient(to_bottom,#1a8362,#0e4835)] active:scale-[0.98] text-[#f1f5f9] font-semibold flex items-center justify-center px-[4.5rem] py-[13px] text-[15px] transition-all border shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),0_8px_20px_rgba(10,50,40,0.6)] border-[#34d399]/40 disabled:opacity-70 disabled:cursor-wait"
//                 >
//                   {status === 'loading' ? 'Identifying...' : 'Identify Music'}
//                 </button>
//               </div>
//             </form>
//           </section>

//           {/* Spacer for button overlap */}
//           <div className="h-2"></div>

//           {/* Result States Card */}
//           <section className="w-full rounded-3xl bg-[linear-gradient(135deg,rgba(200,210,220,0.85),rgba(220,230,240,0.7))] backdrop-blur-2xl px-8 py-6 pb-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/40 flex-1 min-h-[160px] flex flex-col justify-center transition-all duration-300 relative text-[#0f172a] mb-15" aria-live="polite">
            
//             {status === 'idle' && (
//               <div className="flex flex-col w-full h-full animate-in fade-in zoom-in-95 duration-400 justify-center items-center">
//                 <p className="absolute top-5 left-6 text-[11px] font-bold uppercase tracking-[0.15em] text-[#334155]">Ready</p>
//                 <div className="flex flex-col items-center justify-center mt-3">
//                   <div className="text-[#64748b] mb-3">
//                     <Music className="h-8 w-8" strokeWidth={1.5} />
//                   </div>
//                   <h3 className="font-bold text-[#0f172a] text-[15px] mb-1">Results will appear here.</h3>
//                   <p className="text-[13px] text-[#475569] leading-relaxed max-w-75 text-center">
//                     Pick a timestamp with audible music, like <span className="font-semibold text-[#1e293b]">0:10</span>.
//                   </p>
//                 </div>
//               </div>
//             )}

//             {status === 'loading' && (
//               <div className="flex flex-col w-full h-full animate-in fade-in zoom-in-95 duration-400 justify-center items-center">
//                 <p className="absolute top-5 left-6 text-[11px] font-bold uppercase tracking-[0.15em] text-[#334155]">Loading</p>
                
//                 <div className="w-full max-w-125 rounded-[20px] bg-[linear-gradient(90deg,rgba(255,255,255,0.4),rgba(255,255,255,0.1))] border border-white/30 backdrop-blur-md px-6 py-6 shadow-[0_0_40px_rgba(40,200,160,0.25)] flex flex-col items-center justify-center relative mt-4">
//                   <h3 className="font-bold text-[#0f172a] text-[15px] mb-4">Listening to your selected clip...</h3>
//                   <div className="flex h-8 w-full justify-center items-center gap-1.5 mb-2">
//                     {Array.from({ length: 9 }).map((_, i) => (
//                       <div
//                         key={i}
//                         className="w-1 bg-[#1a8362] rounded-full animate-waveform"
//                         style={{
//                           height: '20%',
//                           animationDelay: `${i * 0.15}s`,
//                           animationDuration: '1.2s'
//                         }}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {status === 'success' && result && (
//               <div className="flex flex-col w-full h-full animate-in fade-in zoom-in-95 duration-400">
//                 <p className="absolute top-5 left-6 text-[11px] font-bold uppercase tracking-[0.15em] text-[#334155]">Match Found</p>
                
//                 {/* Inner Glowing Plate Container */}
//                 <div className="w-full flex flex-col sm:flex-row items-center sm:items-stretch sm:justify-between gap-6 mt-6 rounded-[22px] bg-[linear-gradient(90deg,rgba(255,255,255,0.5),rgba(255,255,255,0.2))] border border-white/40 backdrop-blur-md px-6 py-5 shadow-[0_0_50px_rgba(50,220,180,0.2)] relative z-10">
                  
//                   <div className="flex items-center gap-5 flex-1">
//                     {/* Metallic Avatars */}
//                     <div className="flex gap-3 items-center">
//                       <div className="h-14 w-14 rounded-full bg-[#1e242d] border-[3px] border-[#8a96a5] shadow-[inset_0_2px_4px_rgba(0,0,0,0.6),0_4px_10px_rgba(0,0,0,0.2)] shrink-0 flex items-center justify-center text-[18px] font-bold text-[#94a3b8]">
//                         {result.artist ? result.artist.substring(0, 2).toUpperCase() : 'JO'}
//                       </div>
//                       <div className="h-13 w-13 rounded-xl bg-[linear-gradient(135deg,#d1d5db,#94a3b8)] border border-[#cbd5e1] shadow-inner shrink-0 hidden sm:block"></div>
//                     </div>

//                     <div className="flex flex-col justify-center">
//                       <div className="flex items-center gap-1.5">
//                         <span className="text-[13px] font-semibold text-[#334155]">{result.artist || 'Joe Layne'}</span>
//                       </div>
//                       <div className="text-[19px] font-bold text-[#0f172a] leading-tight">
//                         {result.title || 'Portrait'}
//                       </div>
//                     </div>
//                   </div>
                  
//                   <div className="flex flex-col justify-center gap-3 sm:border-l border-[#94a3b8]/30 sm:pl-6 sm:min-w-[180px]">
//                     <div className="flex justify-between sm:flex-col sm:justify-center items-center sm:items-start gap-0.5 w-full text-[12px]">
//                       <div className="flex items-center gap-1.5 text-[#475569]">
//                         <Clock className="h-3.5 w-3.5" /> 
//                         <span className="font-medium">Checked clip</span>
//                       </div>
//                       <span className="font-bold text-[#0f172a] sm:pl-5">Around {formData.start_time || '0:10'}</span>
//                     </div>
//                     <div className="flex justify-between sm:flex-col sm:justify-center items-center sm:items-start gap-0.5 w-full text-[12px]">
//                       <div className="flex items-center gap-1.5 text-[#475569]">
//                         <LinkIcon className="h-3.5 w-3.5" /> 
//                         <span className="font-medium">Source</span>
//                       </div>
//                       <span className="font-bold text-[#0f172a] sm:pl-5 truncate max-w-30">YouTube video link</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {status === 'error' && (
//               <div className="flex flex-col w-full h-full animate-in fade-in zoom-in-95 duration-400 justify-center items-center">
//                 <p className="absolute top-5 left-6 text-[11px] font-bold uppercase tracking-[0.15em] text-red-600">Error</p>
//                 <div className="flex flex-col items-center justify-center mt-3">
//                   <div className="text-red-500 mb-3">
//                     <AlertCircle className="h-8 w-8" strokeWidth={1.5} />
//                   </div>
//                   <h3 className="font-bold text-[#0f172a] text-[15px] mb-1">No match returned</h3>
//                   <p className="text-[13px] text-[#475569] leading-relaxed max-w-75 text-center">
//                     {error || 'Something went wrong while identifying the song.'}
//                   </p>
//                 </div>
//               </div>
//             )}
            
//           </section>

//         </div>
//       </main>
//     </div>
//   )
// }

// export default App
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import StreamInput from "./components/StreamInput";
import UploadSection from "./components/UploadSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="bg-[#060e20] text-[#dee5ff] min-h-screen font-body">
      <Navbar />

      <main className="pt-20 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <Hero />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7">
            <StreamInput />
          </div>

          <div className="lg:col-span-5">
            <UploadSection />
          </div>
        </div>
      </main>

      <Footer />
      <div className="fixed bottom-0 left-0 w-full pointer-events-none opacity-10 z-0">
  <svg viewBox="0 0 1440 320" className="w-full h-auto">
    <path
      d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L0,320Z"
      fill="#cc97ff"
    />
  </svg>
</div>
    </div>
  );
}

