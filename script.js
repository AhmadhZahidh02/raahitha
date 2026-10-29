/**
 * ============================================================================
 * PROJECT: RAAHITHA — FOREVER IN MY HEART ❤️
 * Hasban Zahidh → Raahitha
 * Production-Quality Romantic Cinematic Experience Engine
 * ============================================================================
 */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     1. CONSTANTS & CONFIGURATION
     -------------------------------------------------------------------------- */
  const SENDER_NAME = 'Hasban Zahidh';
  const RECIPIENT_NAME = 'Raahitha';
  const REAL_AUDIO_PATH = 'assets/hasban-love-message.mp3';

  // Spoken sentences with tailored romantic pacing pauses (in milliseconds)
  const SPOKEN_SCRIPT = [
    { text: 'Raahitha...', pauseAfter: 850, cardLineIndex: -1 },
    { text: 'Sometimes, words cannot explain what a heart feels.', pauseAfter: 650, cardLineIndex: 0 },
    { text: 'My heart may break into a thousand pieces, but every piece will still belong to you.', pauseAfter: 750, cardLineIndex: 1 },
    { text: 'I am Hasban Zahidh.', pauseAfter: 600, cardLineIndex: -1 },
    { text: 'You are always in my thoughts, always in my heart, and always a special part of my life.', pauseAfter: 700, cardLineIndex: 0 },
    { text: 'No matter how difficult life becomes, my feelings for you are real, and I will always wish happiness for you.', pauseAfter: 750, cardLineIndex: 2 },
    { text: 'Raahitha, I love you always.', pauseAfter: 800, cardLineIndex: 1 },
    { text: 'Forever yours, Hasban Zahidh.', pauseAfter: 500, cardLineIndex: 3 }
  ];

  /* --------------------------------------------------------------------------
     2. DOM ELEMENTS
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');
  const exportCanvas = document.getElementById('exportCanvas');

  const introScreen = document.getElementById('introScreen');
  const interludeScreen = document.getElementById('interludeScreen');
  const letterScreen = document.getElementById('letterScreen');
  const ambientGlow = document.querySelector('.ambient-glow');

  const mainHeartBtn = document.getElementById('mainHeartBtn');
  const letterLines = document.querySelectorAll('.letter-line');

  const voiceStatusBar = document.getElementById('voiceStatusBar');
  const voiceSubtitleText = document.getElementById('voiceSubtitleText');
  const voiceWaveIcon = document.getElementById('voiceWaveIcon');

  const voicePlayBtn = document.getElementById('voicePlayBtn');
  const voiceReplayBtn = document.getElementById('voiceReplayBtn');
  const voiceMuteBtn = document.getElementById('voiceMuteBtn');
  const muteIcon = document.getElementById('muteIcon');
  const muteLabel = document.getElementById('muteLabel');
  const saveCardBtn = document.getElementById('saveCardBtn');
  const replayAllBtn = document.getElementById('replayAllBtn');

  /* --------------------------------------------------------------------------
     3. STATE MANAGEMENT
     -------------------------------------------------------------------------- */
  const STATE = {
    currentPhase: 'INTRO', // 'INTRO' | 'HEARTBEAT' | 'BURST' | 'SPLIT' | 'CONSTELLATION' | 'LETTER'
    isAnimating: false,
    isVoicePlaying: false,
    isMuted: false,
    speechIndex: 0,
    hasRealAudio: false,
    audioContext: null,
    rafId: null,
    isTabVisible: true
  };

  /* --------------------------------------------------------------------------
     4. NATIVE WEB AUDIO SYNTHESIZER (Pure zero-dependency cinematic sound)
     -------------------------------------------------------------------------- */
  class RomanticAudioEngine {
    constructor() {
      this.ctx = null;
      this.isInitialized = false;
    }

    init() {
      if (this.isInitialized) return;
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
          if (this.ctx.state === 'suspended') {
            this.ctx.resume();
          }
          this.isInitialized = true;
        }
      } catch (err) {
        console.warn('Web Audio not supported or blocked:', err);
      }
    }

    // Gentle sub-bass heartbeat thump
    playHeartbeatThump(intensity = 1.0) {
      if (!this.ctx || STATE.isMuted) return;
      try {
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(60, now);
        osc.frequency.exponentialRampToValueAtTime(28, now + 0.18);

        gain.gain.setValueAtTime(0.35 * intensity, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.25);
      } catch (e) {
        // Safe fallback
      }
    }

    // Ethereal romantic chime chord
    playRomanticChord() {
      if (!this.ctx || STATE.isMuted) return;
      try {
        const now = this.ctx.currentTime;
        const frequencies = [349.23, 440.00, 523.25, 659.25, 698.46]; // F Maj9 dreamy chord

        frequencies.forEach((freq, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.04);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(1400, now);

          const peakTime = now + idx * 0.04 + 0.08;
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.08, peakTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.2);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now + idx * 0.04);
          osc.stop(now + 3.5);
        });
      } catch (e) {}
    }

    // Sparkle chime cascade
    playSparkleChime() {
      if (!this.ctx || STATE.isMuted) return;
      try {
        const now = this.ctx.currentTime;
        const notes = [880, 1046.5, 1174.66, 1318.51, 1567.98, 1760];
        notes.forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.06);

          gain.gain.setValueAtTime(0.04, now + i * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.6);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start(now + i * 0.06);
          osc.stop(now + i * 0.06 + 0.65);
        });
      } catch (e) {}
    }
  }

  const romanticAudio = new RomanticAudioEngine();

  /* --------------------------------------------------------------------------
     5. SPOKEN NARRATION ENGINE (SpeechSynthesis + Real Voice Recording option)
     -------------------------------------------------------------------------- */
  class RomanticNarrationEngine {
    constructor() {
      this.realAudioPlayer = null;
      this.activeUtterance = null;
      this.timeoutId = null;
      this.voices = [];
      this.selectedVoice = null;
      this.supportsSpeech = 'speechSynthesis' in window;
      this.isSpeaking = false;

      this.checkRealAudio();
      this.initSpeechVoices();
    }

    // Detect if an authentic recording by Hasban Zahidh is located in assets/
    checkRealAudio() {
      try {
        const audio = new Audio();
        audio.src = REAL_AUDIO_PATH;
        audio.preload = 'metadata';
        audio.addEventListener('canplaythrough', () => {
          this.realAudioPlayer = audio;
          STATE.hasRealAudio = true;
          console.info('Authentic voice file detected at assets/hasban-love-message.mp3');
        });
        audio.addEventListener('error', () => {
          this.realAudioPlayer = null;
          STATE.hasRealAudio = false;
        });
      } catch (e) {
        this.realAudioPlayer = null;
      }
    }

    initSpeechVoices() {
      if (!this.supportsSpeech) return;

      const loadVoices = () => {
        this.voices = window.speechSynthesis.getVoices();
        this.selectedVoice = this.pickWarmestVoice();
      };

      loadVoices();
      if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }
    }

    // Select the warmest, most natural-sounding English voice available
    pickWarmestVoice() {
      if (!this.voices || this.voices.length === 0) return null;

      // Priority list of high quality romantic/natural voices
      const voicePreferences = [
        /Google US English/i,
        /Samantha/i,
        /Victoria/i,
        /Serena/i,
        /Karen/i,
        /Daniel/i,
        /Moira/i,
        /Tessa/i,
        /Natural/i,
        /Neural/i,
        /en-US/i,
        /en-GB/i,
        /en/i
      ];

      for (const regex of voicePreferences) {
        const found = this.voices.find(v => regex.test(v.name) || regex.test(v.lang));
        if (found) return found;
      }

      return this.voices[0];
    }

    startNarration() {
      if (STATE.isMuted) return;

      this.stopNarration();
      this.isSpeaking = true;
      STATE.isVoicePlaying = true;
      STATE.speechIndex = 0;

      this.updateUIStatus(true, 'Starting spoken message...');

      // Priority 1: Real audio file if supplied
      if (STATE.hasRealAudio && this.realAudioPlayer) {
        this.playRealVoice();
        return;
      }

      // Priority 2: Web Speech Synthesis
      if (this.supportsSpeech) {
        this.speakNextSentence();
      } else {
        // Fallback: visual subtitle only
        this.displayVisualNarration();
      }
    }

    speakNextSentence() {
      if (!this.isSpeaking || STATE.isMuted) return;

      if (STATE.speechIndex >= SPOKEN_SCRIPT.length) {
        this.onNarrationComplete();
        return;
      }

      const current = SPOKEN_SCRIPT[STATE.speechIndex];
      this.highlightCardLine(current.cardLineIndex);
      this.updateSubtitle(current.text);

      try {
        window.speechSynthesis.cancel(); // clean up previous

        const utterance = new SpeechSynthesisUtterance(current.text);
        if (!this.selectedVoice) {
          this.selectedVoice = this.pickWarmestVoice();
        }
        if (this.selectedVoice) {
          utterance.voice = this.selectedVoice;
        }

        // Pacing adjustments for gentle, romantic tone
        utterance.rate = 0.88;
        utterance.pitch = 1.0;
        utterance.lang = 'en-US';

        utterance.onend = () => {
          this.timeoutId = setTimeout(() => {
            STATE.speechIndex++;
            this.speakNextSentence();
          }, current.pauseAfter || 600);
        };

        utterance.onerror = (e) => {
          console.warn('Speech error or cancelled:', e);
          // If browser blocked autoplay speech, show the manual hear button
          if (e.error === 'not-allowed' || e.error === 'audio-busy') {
            this.showManualPlayPrompt();
          } else {
            // Advance anyway
            STATE.speechIndex++;
            this.speakNextSentence();
          }
        };

        this.activeUtterance = utterance;
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis call failed:', err);
        this.showManualPlayPrompt();
      }
    }

    playRealVoice() {
      this.realAudioPlayer.currentTime = 0;
      this.realAudioPlayer.play().then(() => {
        this.updateSubtitle('Playing Hasban’s voice recording...');
        this.realAudioPlayer.onended = () => this.onNarrationComplete();
      }).catch(err => {
        console.warn('Autoplay of real audio blocked, falling back:', err);
        this.showManualPlayPrompt();
      });
    }

    displayVisualNarration() {
      let idx = 0;
      const step = () => {
        if (idx >= SPOKEN_SCRIPT.length || !this.isSpeaking) {
          this.onNarrationComplete();
          return;
        }
        const item = SPOKEN_SCRIPT[idx];
        this.highlightCardLine(item.cardLineIndex);
        this.updateSubtitle(item.text);
        idx++;
        this.timeoutId = setTimeout(step, 3200);
      };
      step();
    }

    stopNarration() {
      this.isSpeaking = false;
      STATE.isVoicePlaying = false;
      clearTimeout(this.timeoutId);

      if (this.supportsSpeech) {
        window.speechSynthesis.cancel();
      }

      if (this.realAudioPlayer) {
        this.realAudioPlayer.pause();
        this.realAudioPlayer.currentTime = 0;
      }

      this.highlightCardLine(-1);
      this.updateUIStatus(false, 'Voice stopped');
    }

    onNarrationComplete() {
      this.isSpeaking = false;
      STATE.isVoicePlaying = false;
      this.highlightCardLine(-1);
      this.updateUIStatus(false, 'Forever in my heart ❤️');
    }

    highlightCardLine(lineIndex) {
      letterLines.forEach((el, i) => {
        if (i === lineIndex) {
          el.classList.add('spoken-highlight');
        } else {
          el.classList.remove('spoken-highlight');
        }
      });
    }

    updateSubtitle(text) {
      if (voiceSubtitleText) {
        voiceSubtitleText.textContent = text;
      }
    }

    updateUIStatus(isActive, message) {
      if (voiceWaveIcon) {
        if (isActive) {
          voiceWaveIcon.classList.remove('paused');
        } else {
          voiceWaveIcon.classList.add('paused');
        }
      }
      if (voiceSubtitleText && message) {
        voiceSubtitleText.textContent = message;
      }
    }

    showManualPlayPrompt() {
      if (voicePlayBtn) {
        voicePlayBtn.style.display = 'inline-flex';
      }
      this.updateSubtitle('Tap "Hear My Message" to start voice narration');
    }
  }

  const narrationEngine = new RomanticNarrationEngine();

  /* --------------------------------------------------------------------------
     6. HIGH-PERFORMANCE 2D PARTICLE ENGINE
     -------------------------------------------------------------------------- */
  class ParticleEngine {
    constructor(canvas, ctx) {
      this.canvas = canvas;
      this.ctx = ctx;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = window.innerWidth;
      this.height = window.innerHeight;

      this.particles = [];
      this.burstParticles = [];
      this.constellationParticles = [];
      this.constellationActive = false;

      // Performance cap based on device screen size
      this.maxAmbient = this.width < 600 ? 55 : 100;

      this.initCanvasSize();
      this.seedAmbientUniverse();
      this.bindEvents();
    }

    initCanvasSize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = Math.floor(this.width * this.dpr);
      this.canvas.height = Math.floor(this.height * this.dpr);
      this.ctx.setTransform(1, 0, 0, 1, 0, 0); // reset
      this.ctx.scale(this.dpr, this.dpr);
    }

    bindEvents() {
      window.addEventListener('resize', () => {
        this.initCanvasSize();
      });

      document.addEventListener('visibilitychange', () => {
        STATE.isTabVisible = !document.hidden;
      });
    }

    // Seed ambient particles (mini floating hearts, sparkling stars, bokeh, petals)
    seedAmbientUniverse() {
      this.particles = [];
      for (let i = 0; i < this.maxAmbient; i++) {
        this.particles.push(this.createAmbientParticle(true));
      }
    }

    createAmbientParticle(randomY = false) {
      const types = ['heart', 'star', 'bokeh', 'petal'];
      const typeWeights = [0.35, 0.3, 0.2, 0.15];
      const r = Math.random();
      let type = 'heart';
      let acc = 0;
      for (let i = 0; i < typeWeights.length; i++) {
        acc += typeWeights[i];
        if (r <= acc) {
          type = types[i];
          break;
        }
      }

      const colors = ['#FF91C8', '#FF174F', '#FFFFFF', '#FFD2E7', '#A30826'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      return {
        type: type,
        x: Math.random() * this.width,
        y: randomY ? Math.random() * this.height : this.height + 20,
        size: Math.random() * (type === 'heart' ? 12 : 7) + 3,
        speedY: -(Math.random() * 0.55 + 0.25),
        speedX: (Math.random() - 0.5) * 0.45,
        alpha: Math.random() * 0.65 + 0.25,
        maxAlpha: Math.random() * 0.65 + 0.25,
        color: color,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        swayOffset: Math.random() * 100,
        swaySpeed: Math.random() * 0.015 + 0.005
      };
    }

    // Create explosion burst from center heart position (Phase B)
    triggerHeartBurst(originX, originY, count = 160) {
      const colors = ['#FFFFFF', '#FF91C8', '#FF174F', '#FFD2E7', '#FFE4B5'];
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 9 + 2.5;
        this.burstParticles.push({
          x: originX,
          y: originY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          drag: 0.94,
          gravity: 0.04,
          size: Math.random() * 9 + 3,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: Math.random() * 0.018 + 0.008,
          isHeart: Math.random() > 0.4,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.1
        });
      }
    }

    // Shard particles floating from the broken heart (Phase C)
    triggerBrokenShards(originX, originY, count = 40) {
      for (let i = 0; i < count; i++) {
        const angle = (Math.random() > 0.5 ? 0 : Math.PI) + (Math.random() - 0.5) * 1.2;
        const speed = Math.random() * 3.5 + 1.2;
        this.burstParticles.push({
          x: originX + (Math.random() - 0.5) * 30,
          y: originY + (Math.random() - 0.5) * 30,
          vx: Math.cos(angle) * speed,
          vy: (Math.random() - 0.7) * 2,
          drag: 0.97,
          gravity: -0.015, // float gently upward
          size: Math.random() * 6 + 2,
          color: '#FF174F',
          alpha: 0.9,
          decay: 0.006,
          isHeart: false,
          isCrystal: true,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.05
        });
      }
    }

    // Phase D: Build Constellation Heart outline
    buildHeartConstellation(centerX, centerY) {
      this.constellationActive = true;
      this.constellationParticles = [];
      const numPoints = this.width < 600 ? 36 : 52;
      const scale = Math.min(this.width, this.height) * 0.22;

      for (let i = 0; i < numPoints; i++) {
        const t = (i / numPoints) * Math.PI * 2;
        // Parametric heart formula
        const hx = 16 * Math.pow(Math.sin(t), 3);
        const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

        const targetX = centerX + (hx * scale) / 16;
        const targetY = centerY + (hy * scale) / 16;

        this.constellationParticles.push({
          targetX: targetX,
          targetY: targetY,
          x: targetX + (Math.random() - 0.5) * 350,
          y: targetY + (Math.random() - 0.5) * 350,
          size: Math.random() * 3 + 2.5,
          alpha: 0,
          targetAlpha: Math.random() * 0.5 + 0.5,
          pulse: Math.random() * Math.PI
        });
      }
    }

    clearConstellation() {
      this.constellationActive = false;
      this.constellationParticles = [];
    }

    drawHeartShape(cx, cy, size, color, alpha, rotation = 0) {
      this.ctx.save();
      this.ctx.translate(cx, cy);
      if (rotation !== 0) this.ctx.rotate(rotation);
      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = color;

      const s = size / 16;
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.bezierCurveTo(-8 * s, -10 * s, -16 * s, 0, 0, 14 * s);
      this.ctx.bezierCurveTo(16 * s, 0, 8 * s, -10 * s, 0, 0);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.restore();
    }

    drawSparkleStar(cx, cy, size, color, alpha) {
      this.ctx.save();
      this.ctx.translate(cx, cy);
      this.ctx.globalAlpha = alpha;
      this.ctx.fillStyle = color;

      this.ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        this.ctx.lineTo(Math.cos((i * Math.PI) / 2) * size, Math.sin((i * Math.PI) / 2) * size);
        this.ctx.lineTo(
          Math.cos(((i + 0.5) * Math.PI) / 2) * (size * 0.22),
          Math.sin(((i + 0.5) * Math.PI) / 2) * (size * 0.22)
        );
      }
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.restore();
    }

    updateAndRender() {
      if (!STATE.isTabVisible) {
        return;
      }

      this.ctx.clearRect(0, 0, this.width, this.height);

      // 1. Render Ambient Universe
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];

        // Horizontal sway
        p.swayOffset += p.swaySpeed;
        p.x += p.speedX + Math.sin(p.swayOffset) * 0.4;
        p.y += p.speedY;
        p.rotation += p.rotSpeed;

        // Reset if drifted beyond top
        if (p.y < -30 || p.x < -30 || p.x > this.width + 30) {
          this.particles[i] = this.createAmbientParticle(false);
          continue;
        }

        // Draw by type
        if (p.type === 'heart') {
          this.drawHeartShape(p.x, p.y, p.size, p.color, p.alpha, p.rotation);
        } else if (p.type === 'star') {
          this.drawSparkleStar(p.x, p.y, p.size, p.color, p.alpha);
        } else if (p.type === 'bokeh') {
          this.ctx.save();
          this.ctx.globalAlpha = p.alpha * 0.4;
          this.ctx.fillStyle = p.color;
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.restore();
        } else if (p.type === 'petal') {
          this.ctx.save();
          this.ctx.translate(p.x, p.y);
          this.ctx.rotate(p.rotation);
          this.ctx.globalAlpha = p.alpha * 0.75;
          this.ctx.fillStyle = '#FF91C8';
          this.ctx.beginPath();
          this.ctx.ellipse(0, 0, p.size, p.size * 0.45, Math.PI / 4, 0, Math.PI * 2);
          this.ctx.fill();
          this.ctx.restore();
        }
      }

      // 2. Render Burst & Shard Particles
      for (let i = this.burstParticles.length - 1; i >= 0; i--) {
        const bp = this.burstParticles[i];
        bp.x += bp.vx;
        bp.y += bp.vy;
        bp.vx *= bp.drag;
        bp.vy = bp.vy * bp.drag + bp.gravity;
        bp.alpha -= bp.decay;
        bp.rotation += bp.rotSpeed;

        if (bp.alpha <= 0) {
          this.burstParticles.splice(i, 1);
          continue;
        }

        if (bp.isHeart) {
          this.drawHeartShape(bp.x, bp.y, bp.size, bp.color, bp.alpha, bp.rotation);
        } else if (bp.isCrystal) {
          // Sharp ruby shards
          this.ctx.save();
          this.ctx.translate(bp.x, bp.y);
          this.ctx.rotate(bp.rotation);
          this.ctx.globalAlpha = bp.alpha;
          this.ctx.fillStyle = '#FF174F';
          this.ctx.beginPath();
          this.ctx.moveTo(0, -bp.size);
          this.ctx.lineTo(bp.size * 0.5, bp.size);
          this.ctx.lineTo(-bp.size * 0.5, bp.size * 0.8);
          this.ctx.closePath();
          this.ctx.fill();
          this.ctx.restore();
        } else {
          this.drawSparkleStar(bp.x, bp.y, bp.size, bp.color, bp.alpha);
        }
      }

      // 3. Render Constellation Heart (Phase D)
      if (this.constellationActive && this.constellationParticles.length > 0) {
        // Draw connecting ethereal lines between consecutive stars
        this.ctx.save();
        this.ctx.strokeStyle = 'rgba(255, 145, 200, 0.35)';
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();

        for (let i = 0; i < this.constellationParticles.length; i++) {
          const cp = this.constellationParticles[i];
          // Ease toward target
          cp.x += (cp.targetX - cp.x) * 0.055;
          cp.y += (cp.targetY - cp.y) * 0.055;
          cp.alpha += (cp.targetAlpha - cp.alpha) * 0.04;
          cp.pulse += 0.04;

          if (i === 0) {
            this.ctx.moveTo(cp.x, cp.y);
          } else {
            this.ctx.lineTo(cp.x, cp.y);
          }
        }
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.restore();

        // Draw star nodes
        for (let i = 0; i < this.constellationParticles.length; i++) {
          const cp = this.constellationParticles[i];
          const pulsingSize = cp.size + Math.sin(cp.pulse) * 1.2;
          this.drawSparkleStar(cp.x, cp.y, pulsingSize, '#FFFFFF', cp.alpha);
        }
      }
    }
  }

  const particleEngine = new ParticleEngine(canvas, ctx);

  function mainLoop() {
    particleEngine.updateAndRender();
    STATE.rafId = requestAnimationFrame(mainLoop);
  }
  STATE.rafId = requestAnimationFrame(mainLoop);

  /* --------------------------------------------------------------------------
     7. CHOREOGRAPHED CINEMATIC ANIMATION TIMELINE
     -------------------------------------------------------------------------- */
  function getHeartCenterCoordinates() {
    const rect = mainHeartBtn.getBoundingClientRect();
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  }

  function launchCinematicSequence() {
    if (STATE.isAnimating || STATE.currentPhase !== 'INTRO') return;
    STATE.isAnimating = true;

    // Wake up Web Audio API from user touch gesture
    romanticAudio.init();

    const center = getHeartCenterCoordinates();

    // ----------------------------------------------------
    // PHASE A: THE HEARTBEAT (~0s - 2.5s)
    // ----------------------------------------------------
    STATE.currentPhase = 'HEARTBEAT';
    mainHeartBtn.classList.add('beating-rapid');
    if (ambientGlow) ambientGlow.classList.add('heartbeat-active');

    // Play heartbeat rhythmic pulses
    romanticAudio.playHeartbeatThump(0.8);
    setTimeout(() => romanticAudio.playHeartbeatThump(1.0), 300);
    setTimeout(() => romanticAudio.playHeartbeatThump(0.9), 700);
    setTimeout(() => romanticAudio.playHeartbeatThump(1.2), 1000);
    setTimeout(() => romanticAudio.playHeartbeatThump(1.3), 1400);
    setTimeout(() => romanticAudio.playHeartbeatThump(1.4), 1800);

    // ----------------------------------------------------
    // PHASE B: THE MAGICAL BURST (~2.2s - 4.5s)
    // ----------------------------------------------------
    setTimeout(() => {
      STATE.currentPhase = 'BURST';
      romanticAudio.playRomanticChord();
      romanticAudio.playSparkleChime();
      particleEngine.triggerHeartBurst(center.x, center.y, 180);
    }, 2200);

    // ----------------------------------------------------
    // PHASE C: THE BROKEN HEART (~4.5s - 7.5s)
    // ----------------------------------------------------
    setTimeout(() => {
      STATE.currentPhase = 'SPLIT';
      mainHeartBtn.classList.remove('beating-rapid');
      mainHeartBtn.classList.add('is-broken');
      if (ambientGlow) {
        ambientGlow.classList.remove('heartbeat-active');
        ambientGlow.classList.add('split-glow');
      }

      romanticAudio.playHeartbeatThump(0.7);
      particleEngine.triggerBrokenShards(center.x, center.y, 45);
    }, 4500);

    // ----------------------------------------------------
    // PHASE D: LOVE SURVIVES (~7.5s - 11.0s)
    // ----------------------------------------------------
    setTimeout(() => {
      STATE.currentPhase = 'CONSTELLATION';
      mainHeartBtn.classList.add('dissolving');

      // Hide intro screen, show emotional interlude
      introScreen.classList.remove('active');
      interludeScreen.classList.add('active');

      romanticAudio.playRomanticChord();
      particleEngine.buildHeartConstellation(window.innerWidth / 2, window.innerHeight * 0.38);
    }, 7600);

    // ----------------------------------------------------
    // TRANSITION TO FINAL LOVE LETTER SCREEN (~11.5s)
    // ----------------------------------------------------
    setTimeout(() => {
      STATE.currentPhase = 'LETTER';
      interludeScreen.classList.remove('active');
      letterScreen.classList.add('active');

      particleEngine.clearConstellation();
      STATE.isAnimating = false;

      // Start Spoken Love Message automatically (handles browser block gracefully)
      setTimeout(() => {
        narrationEngine.startNarration();
      }, 800);
    }, 11500);
  }

  /* --------------------------------------------------------------------------
     8. SAVE LOVE CARD FEATURE (High-Resolution Mobile Wallpaper Generator)
     -------------------------------------------------------------------------- */
  function generateAndDownloadLoveCard() {
    try {
      const expCanvas = exportCanvas;
      const expCtx = expCanvas.getContext('2d');
      const w = 1080;
      const h = 1920;

      // 1. Deep romantic cinematic gradient background
      const bgGrad = expCtx.createRadialGradient(w / 2, h * 0.35, 100, w / 2, h / 2, h * 0.7);
      bgGrad.addColorStop(0, '#40000C');
      bgGrad.addColorStop(0.5, '#200006');
      bgGrad.addColorStop(1, '#09030A');
      expCtx.fillStyle = bgGrad;
      expCtx.fillRect(0, 0, w, h);

      // 2. Ambient sparkles & stars on card
      expCtx.fillStyle = 'rgba(255, 145, 200, 0.4)';
      for (let i = 0; i < 75; i++) {
        const sx = Math.random() * w;
        const sy = Math.random() * h;
        const sr = Math.random() * 2.5 + 1;
        expCtx.beginPath();
        expCtx.arc(sx, sy, sr, 0, Math.PI * 2);
        expCtx.fill();
      }

      // 3. Luxurious border & corner ornaments
      expCtx.strokeStyle = 'rgba(255, 145, 200, 0.45)';
      expCtx.lineWidth = 3;
      expCtx.strokeRect(60, 60, w - 120, h - 120);

      expCtx.strokeStyle = 'rgba(255, 23, 79, 0.6)';
      expCtx.lineWidth = 1;
      expCtx.strokeRect(75, 75, w - 150, h - 150);

      // 4. Luminous heart header icon
      const heartX = w / 2;
      const heartY = 320;
      const heartSize = 70;
      expCtx.save();
      expCtx.translate(heartX, heartY);
      expCtx.fillStyle = '#FF174F';
      expCtx.shadowColor = 'rgba(255, 23, 79, 0.9)';
      expCtx.shadowBlur = 45;
      const s = heartSize / 16;
      expCtx.beginPath();
      expCtx.moveTo(0, 0);
      expCtx.bezierCurveTo(-8 * s, -10 * s, -16 * s, 0, 0, 14 * s);
      expCtx.bezierCurveTo(16 * s, 0, 8 * s, -10 * s, 0, 0);
      expCtx.closePath();
      expCtx.fill();
      expCtx.restore();

      // 5. Letter Header Texts
      expCtx.textAlign = 'center';
      expCtx.fillStyle = '#FFFFFF';
      expCtx.shadowColor = 'rgba(255, 23, 79, 0.7)';
      expCtx.shadowBlur = 25;
      expCtx.font = '600 68px "Georgia", serif';
      expCtx.fillText(`${RECIPIENT_NAME}, My Love ❤️`, w / 2, 480);

      expCtx.fillStyle = '#FF91C8';
      expCtx.font = 'italic 44px "Georgia", serif';
      expCtx.fillText('I Love You Always.', w / 2, 555);

      // Decorative divider
      expCtx.strokeStyle = 'rgba(255, 145, 200, 0.5)';
      expCtx.lineWidth = 2;
      expCtx.beginPath();
      expCtx.moveTo(w / 2 - 180, 615);
      expCtx.lineTo(w / 2 + 180, 615);
      expCtx.stroke();

      // 6. Letter Body
      expCtx.shadowBlur = 10;
      expCtx.fillStyle = '#FFD2E7';
      expCtx.font = '36px "Georgia", serif';
      const lines = [
        'You Are Always In My Mind,',
        'In My Heart, And In My Life.',
        '',
        'My Heart May Break,',
        'But My Love For You Will Never Fade.',
        '',
        'No Matter The Distance,',
        'No Matter The Time,',
        'My Heart Will Always Choose You.',
        '',
        'You Are My Happiness, My Precious Memory,',
        'And Someone Truly Special To Me.'
      ];

      let currentY = 730;
      lines.forEach((line) => {
        if (line === '') {
          currentY += 28;
        } else {
          expCtx.fillText(line, w / 2, currentY);
          currentY += 58;
        }
      });

      // 7. Signature
      currentY += 50;
      expCtx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      expCtx.font = 'italic 34px "Georgia", serif';
      expCtx.fillText('With All My Love,', w / 2, currentY);

      currentY += 65;
      expCtx.fillStyle = '#FFFFFF';
      expCtx.shadowColor = 'rgba(255, 23, 79, 0.85)';
      expCtx.shadowBlur = 30;
      expCtx.font = '600 56px "Georgia", serif';
      expCtx.fillText(`${SENDER_NAME} ❤️`, w / 2, currentY);

      // 8. Footer Dedication Stamp
      expCtx.shadowBlur = 0;
      expCtx.fillStyle = 'rgba(255, 145, 200, 0.5)';
      expCtx.font = '24px sans-serif';
      expCtx.fillText(`Forever in My Heart — Dedicated to ${RECIPIENT_NAME}`, w / 2, h - 110);

      // 9. Prompt Download
      const dataUrl = expCanvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `Hasban-Raahitha-Forever.png`;
      downloadLink.href = dataUrl;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      if (voiceSubtitleText) {
        voiceSubtitleText.textContent = 'Love Card saved to your photos! ❤️';
      }
    } catch (err) {
      console.error('Error generating card image:', err);
      alert('Could not export image directly in this browser. Please take a screenshot to keep this card forever ❤️');
    }
  }

  /* --------------------------------------------------------------------------
     9. RESET & REPLAY EXPERIENCE ENGINE
     -------------------------------------------------------------------------- */
  function replayEntireExperience() {
    narrationEngine.stopNarration();
    particleEngine.clearConstellation();

    letterScreen.classList.remove('active');
    interludeScreen.classList.remove('active');
    introScreen.classList.add('active');

    mainHeartBtn.classList.remove('beating-rapid', 'is-broken', 'dissolving');
    if (ambientGlow) {
      ambientGlow.classList.remove('heartbeat-active', 'split-glow');
    }

    if (voicePlayBtn) {
      voicePlayBtn.style.display = 'none';
    }

    STATE.currentPhase = 'INTRO';
    STATE.isAnimating = false;
    STATE.speechIndex = 0;

    if (voiceSubtitleText) {
      voiceSubtitleText.textContent = 'Listening to my heart...';
    }
  }

  /* --------------------------------------------------------------------------
     10. EVENT LISTENERS & INITIALIZATION
     -------------------------------------------------------------------------- */
  // Main Heart Button: Click, Touch & Keyboard Accessibility
  mainHeartBtn.addEventListener('click', (e) => {
    e.preventDefault();
    launchCinematicSequence();
  });

  mainHeartBtn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      launchCinematicSequence();
    }
  });

  // Toolbar Actions
  if (voicePlayBtn) {
    voicePlayBtn.addEventListener('click', () => {
      voicePlayBtn.style.display = 'none';
      narrationEngine.startNarration();
    });
  }

  if (voiceReplayBtn) {
    voiceReplayBtn.addEventListener('click', () => {
      narrationEngine.startNarration();
    });
  }

  if (voiceMuteBtn) {
    voiceMuteBtn.addEventListener('click', () => {
      if (STATE.isMuted) {
        STATE.isMuted = false;
        muteIcon.textContent = '🔇';
        muteLabel.textContent = 'Stop Voice';
        narrationEngine.startNarration();
      } else {
        STATE.isMuted = true;
        muteIcon.textContent = '🔊';
        muteLabel.textContent = 'Play Voice';
        narrationEngine.stopNarration();
      }
    });
  }

  if (saveCardBtn) {
    saveCardBtn.addEventListener('click', () => {
      generateAndDownloadLoveCard();
    });
  }

  if (replayAllBtn) {
    replayAllBtn.addEventListener('click', () => {
      replayEntireExperience();
    });
  }

  // Window unload cleanup
  window.addEventListener('beforeunload', () => {
    narrationEngine.stopNarration();
    if (STATE.rafId) {
      cancelAnimationFrame(STATE.rafId);
    }
  });

  console.info(`Raahitha — Forever In My Heart initialized with love from ${SENDER_NAME}`);
})();
