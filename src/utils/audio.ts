'use client';

// Simple Web Audio API Synth Generator for Soft Utilitarian UI clicks & glitches
class AudioEngine {
  private ctx: AudioContext | null = null;
  public muted: boolean = false;

  private init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  public playClick(freq = 600, duration = 0.05, type: OscillatorType = 'sine') {
    if (this.muted) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // Ignore audio context autoplay restrictions gracefully
    }
  }

  public playGlitch() {
    if (this.muted) return;
    this.playClick(1200, 0.03, 'sawtooth');
    setTimeout(() => this.playClick(400, 0.04, 'square'), 30);
  }

  public toggleMute(): boolean {
    this.muted = !this.muted;
    return this.muted;
  }
}

export const audioEngine = new AudioEngine();
