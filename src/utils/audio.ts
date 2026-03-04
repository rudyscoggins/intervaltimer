let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  return audioContext;
};

// Map to store pre-loaded audio buffers
const audioBuffers: Map<string, AudioBuffer> = new Map();

// Pre-load audio files
const preloadAudio = async (url: string) => {
  const ctx = getAudioContext();
  if (!ctx || audioBuffers.has(url)) return;

  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    audioBuffers.set(url, audioBuffer);
  } catch (error) {
    console.error(`Failed to preload audio: ${url}`, error);
  }
};

// Initial pre-load of common sounds
if (typeof window !== 'undefined') {
  ['/audio/halfway.wav', '/audio/halfwaybro.wav', '/audio/NextExercise.wav', '/audio/NextExerciseBro.wav'].forEach(preloadAudio);
}

const playBuffer = (buffer: AudioBuffer) => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.connect(ctx.destination);
  source.start();
};

const playFile = async (url: string) => {
  if (audioBuffers.has(url)) {
    playBuffer(audioBuffers.get(url)!);
  } else {
    // Fallback if not loaded yet
    const ctx = getAudioContext();
    if (!ctx) return;
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      audioBuffers.set(url, audioBuffer);
      playBuffer(audioBuffer);
    } catch (e) {
      console.error(`Error playing file: ${url}`, e);
    }
  }
};

export const playBeep = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(880, ctx.currentTime); // A5

  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.5, ctx.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.5);
};

export const playTick = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(440, ctx.currentTime); // A4

  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.1);
};

export const playDing = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(1320, ctx.currentTime); // E6

  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.8);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.8);
};

export const playHalfway = (broMode: boolean) => {
  if (broMode) {
    const isBro = Math.random() < 0.3;
    playFile(isBro ? '/audio/halfwaybro.wav' : '/audio/halfway.wav');
  } else {
    playDing();
  }
};

export const playNextExercise = (broMode: boolean) => {
  if (broMode) {
    const isBro = Math.random() < 0.3;
    playFile(isBro ? '/audio/NextExerciseBro.wav' : '/audio/NextExercise.wav');
  } else {
    playDing();
  }
};