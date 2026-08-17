// Web Audio Engine for FPwonderful
// Provides zero-dependency procedural audio synthesis for placeholders
// as well as seamless playback for real uploaded audio files.

class AudioEngine {
  private ctx: AudioContext | null = null;
  private activeNodes: { [key: string]: { stop: () => void } } = {};
  private analyser: AnalyserNode | null = null;

  public getContext(): AudioContext {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public getAnalyser(): AnalyserNode {
    const ctx = this.getContext();
    if (!this.analyser) {
      this.analyser = ctx.createAnalyser();
      this.analyser.fftSize = 64;
    }
    return this.analyser;
  }

  // Play procedural generative soundscape for a beat or track
  public playSynthesizedBeat(id: string, bpm: number = 130, mood: string = 'chill'): { stop: () => void } {
    this.stop(id);
    const ctx = this.getContext();
    const analyser = this.getAnalyser();

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.15, ctx.currentTime);
    masterGain.connect(analyser);
    analyser.connect(ctx.destination);

    // Warm sub-bass pulse
    const subOsc = ctx.createOscillator();
    const subGain = ctx.createGain();
    subOsc.type = 'sine';
    const baseFreq = mood === 'dark' ? 48.99 : 55; // G1 or A1
    subOsc.frequency.setValueAtTime(baseFreq, ctx.currentTime);

    // Sub LFO
    const beatInterval = 60 / bpm;
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.value = 1 / beatInterval;
    lfoGain.gain.value = 0.08;
    lfo.connect(subGain.gain);
    subGain.gain.setValueAtTime(0.12, ctx.currentTime);

    subOsc.connect(subGain);
    subGain.connect(masterGain);

    // Ambient filtered chord / pad
    const padOsc1 = ctx.createOscillator();
    const padOsc2 = ctx.createOscillator();
    const padFilter = ctx.createBiquadFilter();
    const padGain = ctx.createGain();

    padOsc1.type = 'triangle';
    padOsc2.type = 'sawtooth';
    padOsc1.frequency.setValueAtTime(baseFreq * 4, ctx.currentTime); // 220Hz
    padOsc2.frequency.setValueAtTime(baseFreq * 4.02, ctx.currentTime); // detuned

    padFilter.type = 'lowpass';
    padFilter.frequency.setValueAtTime(800, ctx.currentTime);
    padFilter.Q.setValueAtTime(3, ctx.currentTime);

    padGain.gain.setValueAtTime(0.04, ctx.currentTime);

    padOsc1.connect(padFilter);
    padOsc2.connect(padFilter);
    padFilter.connect(padGain);
    padGain.connect(masterGain);

    // Hi-hat / tick pulse
    let isRunning = true;
    let step = 0;
    const stepInterval = (beatInterval / 2) * 1000;

    const timer = setInterval(() => {
      if (!isRunning || ctx.state === 'closed') return;
      try {
        const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.03, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < noiseBuffer.length; i++) {
          output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (noiseBuffer.length * 0.3));
        }
        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const noiseFilter = ctx.createBiquadFilter();
        noiseFilter.type = 'highpass';
        noiseFilter.frequency.value = step % 4 === 2 ? 3000 : 7000;

        const noiseGain = ctx.createGain();
        noiseGain.gain.value = step % 4 === 2 ? 0.06 : 0.02;

        whiteNoise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(masterGain);

        whiteNoise.start();
        step = (step + 1) % 16;
      } catch {
        // ignore
      }
    }, stepInterval);

    subOsc.start();
    lfo.start();
    padOsc1.start();
    padOsc2.start();

    const stopFn = () => {
      isRunning = false;
      clearInterval(timer);
      try {
        const now = ctx.currentTime;
        masterGain.gain.setTargetAtTime(0.0001, now, 0.05);
        setTimeout(() => {
          try {
            subOsc.stop();
            lfo.stop();
            padOsc1.stop();
            padOsc2.stop();
            subOsc.disconnect();
            padOsc1.disconnect();
            masterGain.disconnect();
          } catch {
            // cleanup
          }
        }, 100);
      } catch {
        // ignore
      }
      delete this.activeNodes[id];
    };

    this.activeNodes[id] = { stop: stopFn };
    return { stop: stopFn };
  }

  // Create dual synchronized unmixed vs mastered generator for Before/After demo
  public createDualSynchronizedSource(id: string): {
    start: () => void;
    setCrossfade: (ratio: number) => void; // 0 = unmixed (100% A), 1 = mastered (100% B)
    stop: () => void;
    getAnalyserData: (array: Uint8Array) => void;
  } {
    this.stop(id);
    const ctx = this.getContext();

    const analyser = ctx.createAnalyser();
    analyser.fftSize = 64;

    const masterOutput = ctx.createGain();
    masterOutput.gain.setValueAtTime(0.18, ctx.currentTime);
    masterOutput.connect(analyser);
    analyser.connect(ctx.destination);

    // Track A (Unmixed / Raw): bandlimited, muffled, slightly dry, lower punch
    const gainA = ctx.createGain();
    gainA.gain.setValueAtTime(1.0, ctx.currentTime);

    const filterA = ctx.createBiquadFilter();
    filterA.type = 'lowpass';
    filterA.frequency.setValueAtTime(3200, ctx.currentTime); // Dull top end
    filterA.connect(gainA);
    gainA.connect(masterOutput);

    // Track B (Mastered / FPwonderful Polished): wide, crisp presence, rich low-end saturation, air
    const gainB = ctx.createGain();
    gainB.gain.setValueAtTime(0.0, ctx.currentTime);

    const filterB = ctx.createBiquadFilter();
    filterB.type = 'highshelf';
    filterB.frequency.setValueAtTime(6000, ctx.currentTime);
    filterB.gain.setValueAtTime(4.5, ctx.currentTime); // Brilliant airy sparkle

    const lowWarmth = ctx.createBiquadFilter();
    lowWarmth.type = 'peaking';
    lowWarmth.frequency.setValueAtTime(65, ctx.currentTime);
    lowWarmth.gain.setValueAtTime(3.5, ctx.currentTime); // Solid punch

    filterB.connect(lowWarmth);
    lowWarmth.connect(gainB);
    gainB.connect(masterOutput);

    // Common audio source driving both branches in perfect sample sync
    const oscRoot = ctx.createOscillator();
    const oscHarmonic = ctx.createOscillator();
    oscRoot.type = 'sawtooth';
    oscHarmonic.type = 'triangle';
    oscRoot.frequency.setValueAtTime(110, ctx.currentTime); // A2
    oscHarmonic.frequency.setValueAtTime(220, ctx.currentTime); // A3

    const sourceGain = ctx.createGain();
    sourceGain.gain.setValueAtTime(0.35, ctx.currentTime);

    oscRoot.connect(sourceGain);
    oscHarmonic.connect(sourceGain);

    // Send source to BOTH tracks simultaneously
    sourceGain.connect(filterA);
    sourceGain.connect(filterB);

    let isPlaying = false;

    const setCrossfade = (ratio: number) => {
      // ratio: 0.0 (Unmixed) to 1.0 (Mastered)
      const clamped = Math.max(0, Math.min(1, ratio));
      // Equal power crossfade
      const gainValueA = Math.cos(clamped * 0.5 * Math.PI);
      const gainValueB = Math.sin(clamped * 0.5 * Math.PI);
      const now = ctx.currentTime;
      gainA.gain.setTargetAtTime(gainValueA, now, 0.015);
      gainB.gain.setTargetAtTime(gainValueB, now, 0.015);
    };

    const start = () => {
      if (isPlaying) return;
      isPlaying = true;
      oscRoot.start();
      oscHarmonic.start();
    };

    const stop = () => {
      if (!isPlaying) return;
      isPlaying = false;
      try {
        oscRoot.stop();
        oscHarmonic.stop();
        masterOutput.disconnect();
      } catch {
        // ignore
      }
      delete this.activeNodes[id];
    };

    const getAnalyserData = (array: Uint8Array) => {
      analyser.getByteFrequencyData(array as unknown as Uint8Array<ArrayBuffer>);
    };

    this.activeNodes[id] = { stop };

    return {
      start,
      setCrossfade,
      stop,
      getAnalyserData,
    };
  }

  public stop(id?: string) {
    if (id && this.activeNodes[id]) {
      this.activeNodes[id].stop();
      delete this.activeNodes[id];
    } else if (!id) {
      Object.keys(this.activeNodes).forEach((k) => {
        this.activeNodes[k].stop();
        delete this.activeNodes[k];
      });
    }
  }
}

export const audioEngine = typeof window !== 'undefined' ? new AudioEngine() : (null as unknown as AudioEngine);
