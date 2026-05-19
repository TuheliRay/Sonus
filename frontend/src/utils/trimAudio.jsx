// import toWav from 'audiobuffer-to-wav';

// export async function trimAudio(file, startSec = 0, durationSec = 10) {
//   const audioCtx = new AudioContext();
//   const decoded = await audioCtx.decodeAudioData(await file.arrayBuffer());
//   await audioCtx.close();

//   const frames = Math.max(1, Math.min(
//     Math.floor(durationSec * decoded.sampleRate),
//     decoded.length - Math.floor(startSec * decoded.sampleRate)
//   ));

//   const offlineCtx = new OfflineAudioContext(decoded.numberOfChannels, frames, decoded.sampleRate);
//   const source = offlineCtx.createBufferSource();
//   source.buffer = decoded;
//   source.connect(offlineCtx.destination);
//   source.start(0, startSec, durationSec);

//   const trimmed = await offlineCtx.startRendering();
//   const wav = toWav(trimmed);
//   return new Blob([wav], { type: 'audio/wav' });
// }
import toWav from 'audiobuffer-to-wav';

// We pass the whole file, not just a static start time, to allow smart skipping
export async function trimAudioForACR(file) {
  const audioCtx = new AudioContext();
  const decoded = await audioCtx.decodeAudioData(await file.arrayBuffer());
  await audioCtx.close();

  // 1. SMART TRIM LOGIC (The "Chorus Drop")
  // If the file is longer than 60s, skip the first 45s. Otherwise, start at 0.
  const startSec = decoded.duration > 60 ? 10 : 0;
  // Grab max 10 seconds of audio
  const durationSec = Math.min(10, decoded.duration - startSec);

  // 2. EXTREME COMPRESSION LOGIC (For Latency Reduction)
  const targetSampleRate = 8000; // Force 8kHz instead of decoded.sampleRate
  const targetChannels = 1;      // Force Mono instead of decoded.numberOfChannels

  const frames = Math.floor(durationSec * targetSampleRate);

  // Notice we use the TARGET settings here, not the decoded settings
  const offlineCtx = new OfflineAudioContext(targetChannels, frames, targetSampleRate);
  const source = offlineCtx.createBufferSource();
  source.buffer = decoded;
  source.connect(offlineCtx.destination);
  
  // The browser automatically downsamples the high-quality buffer as it plays
  source.start(0, startSec, durationSec);

  const trimmed = await offlineCtx.startRendering();
  
  // Convert the 8kHz Mono buffer to a tiny WAV blob
  const wav = toWav(trimmed);
  return new Blob([wav], { type: 'audio/wav' });
}
