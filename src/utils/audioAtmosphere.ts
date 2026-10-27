/**
 * Minimalist Museum Acoustic Atmosphere Generator
 * Synthesizes a subtle, warm ambient acoustic drone using the Web Audio API.
 * Completely offline, zero network requests, ultra-lightweight.
 */

class AudioAtmosphereManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private isPlaying: boolean = false;

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }

  public start(): void {
    if (this.isPlaying) return;

    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master output gain with smooth ramp
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 3);

      // Low-pass filter simulating the sound of high-ceiling stone museum acoustics
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      // Frequencies for a warm, contemplative, meditative minor triad chord
      // Root at 108Hz (A2 harmonic), Fifth at 162Hz, Minor Third at 128Hz, and gentle shimmer at 216Hz
      const freqs = [108, 162, 129.5, 216];

      freqs.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();

        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Subtle detuning for natural room acoustics
        osc.detune.setValueAtTime((idx - 1.5) * 3, this.ctx.currentTime);

        const targetVolume = 0.04 / (idx + 1);
        oscGain.gain.setValueAtTime(targetVolume, this.ctx.currentTime);

        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();
        this.oscillators.push(osc);
      });

      filter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
      this.isPlaying = true;
    } catch {
      this.isPlaying = false;
    }
  }

  public stop(): void {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;

    const stopTime = this.ctx.currentTime + 1.2;
    this.masterGain.gain.exponentialRampToValueAtTime(0.0001, stopTime);

    setTimeout(() => {
      this.oscillators.forEach((osc) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch {
          // Ignore if already stopped
        }
      });
      this.oscillators = [];
      if (this.ctx && this.ctx.state !== 'closed') {
        this.ctx.close().catch(() => {});
      }
      this.ctx = null;
      this.masterGain = null;
      this.isPlaying = false;
    }, 1300);
  }
}

export const audioAtmosphere = new AudioAtmosphereManager();
