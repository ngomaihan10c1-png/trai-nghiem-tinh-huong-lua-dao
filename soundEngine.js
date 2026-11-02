// 8-Bit Retro Chiptune Sound Engine for G7 Cyber Scam Defense Simulator
// Synthesizes retro gaming audio effects using native Web Audio API (Zero external assets needed)

class SoundEngine {
  constructor() {
    this.enabled = true;
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  playTone(freq, type, duration, delay = 0, gainLevel = 0.15) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    setTimeout(() => {
      try {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = type; // 'square' for classic 8-bit, 'triangle', 'sawtooth'
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        console.warn("Audio tone error:", e);
      }
    }, delay * 1000);
  }

  // Retro button click blip
  playClick() {
    this.playTone(650, 'square', 0.06, 0, 0.12);
  }

  // Incoming message notification sound (two-tone retro ping)
  playMessageReceived() {
    this.playTone(784, 'triangle', 0.08, 0, 0.18); // G5
    this.playTone(1046.5, 'triangle', 0.15, 0.06, 0.18); // C6
  }

  // Sent message whoosh / pop sound
  playMessageSent() {
    this.playTone(523.25, 'triangle', 0.05, 0, 0.12);
    this.playTone(659.25, 'triangle', 0.08, 0.04, 0.14);
  }

  // 8-bit Coin / Score up (Super Mario coin style)
  playScoreUp() {
    this.playTone(987.77, 'square', 0.08, 0, 0.15); // B5
    this.playTone(1318.51, 'square', 0.35, 0.08, 0.18); // E6
  }

  // 8-bit Victory / Collect 50M Fanfare
  playVictory() {
    const notes = [
      { f: 523.25, d: 0.1, t: 0 },
      { f: 659.25, d: 0.1, t: 0.1 },
      { f: 783.99, d: 0.1, t: 0.2 },
      { f: 1046.50, d: 0.35, t: 0.3 }
    ];
    notes.forEach(n => this.playTone(n.f, 'square', n.d, n.t, 0.18));
  }

  // Danger warning / Phishing alert buzzer
  playDanger() {
    this.playTone(220, 'sawtooth', 0.18, 0, 0.2);
    this.playTone(180, 'sawtooth', 0.25, 0.12, 0.22);
  }

  // Game over / Bankrupt sound
  playGameOver() {
    const notes = [
      { f: 392.00, d: 0.15, t: 0 },
      { f: 369.99, d: 0.15, t: 0.15 },
      { f: 349.23, d: 0.15, t: 0.30 },
      { f: 311.13, d: 0.45, t: 0.45 }
    ];
    notes.forEach(n => this.playTone(n.f, 'sawtooth', n.d, n.t, 0.2));
  }

  // Melodic incoming phone/Messenger ringtone
  playPhoneRing() {
    if (!this.enabled) return;
    const ringNotes = [
      { f: 587.33, d: 0.10, t: 0 },    // D5
      { f: 880.00, d: 0.12, t: 0.12 }, // A5
      { f: 659.25, d: 0.10, t: 0.26 }, // E5
      { f: 1046.5, d: 0.22, t: 0.38 }  // C6
    ];
    ringNotes.forEach(n => this.playTone(n.f, 'sine', n.d, n.t, 0.22));
  }

  // Call connected chime
  playCallConnected() {
    if (!this.enabled) return;
    this.playTone(523.25, 'sine', 0.08, 0, 0.16);
    this.playTone(783.99, 'sine', 0.16, 0.09, 0.18);
  }

  // Call disconnect tone (standard 425Hz telecom busy beeps)
  playCallHangup() {
    if (!this.enabled) return;
    this.playTone(425, 'sine', 0.10, 0, 0.14);
    this.playTone(425, 'sine', 0.10, 0.18, 0.14);
    this.playTone(425, 'sine', 0.10, 0.36, 0.14);
  }

  // High-tech video call incoming chime
  playVideoCallChime() {
    if (!this.enabled) return;
    const notes = [
      { f: 659.25, d: 0.09, t: 0 },
      { f: 783.99, d: 0.09, t: 0.11 },
      { f: 1046.5, d: 0.12, t: 0.22 },
      { f: 1318.5, d: 0.25, t: 0.35 }
    ];
    notes.forEach(n => this.playTone(n.f, 'triangle', n.d, n.t, 0.2));
  }
}

window.soundEngine = new SoundEngine();
