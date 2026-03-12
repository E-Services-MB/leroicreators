<template>
  <div :class="['carousel-wrapper']">
        <button id="close" @click="$emit('toggle')">X</button>
    <div
      class="scene"
      :class="{ dragging }"
      @mousedown="onMouseDown"
      @touchstart.passive="onTouchStart"
    >
      <div
        v-for="(card, i) in cards"
        :key="i"
        class="card-gallery"
        :class="{ 'is-front': getDepth(i) === 0 }"
        :style="getCardStyle(i)"
      >
        <!-- ── Video area ── -->
        <div class="card-media">
          <video
            :ref="el => { if (el) videoRefs[i] = el }"
            :src="card.src"
            :poster="card.poster"
            class="card-video"
            loop
            muted
            playsinline
            preload="metadata"
          />

          <!-- Gradient overlay so text below stays legible -->
          <div class="card-media-overlay" />

          <!-- Play / pause indicator (shown briefly on toggle) -->
          <Transition name="pip">
            <div v-if="pipVisible === i" class="card-pip">
              <svg v-if="playing === i" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
              <svg v-else viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l10-6.86a1 1 0 0 0 0-1.72l-10-6.86A1 1 0 0 0 8 5.14z"/></svg>
            </div>
          </Transition>

          <!-- Duration badge -->
          <span class="card-duration">{{ card.duration }}</span>

          <!-- Mute toggle -->
          <button
            class="card-mute"
            :style="getAccentStyle(i, 'mute')"
            @click.stop="toggleMute(i)"
            :aria-label="muted ? 'Unmute' : 'Mute'"
          >
            <svg v-if="muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>
            <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 5L6 9H2v6h4l5 4V5z"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
          </button>

          <!-- Play / pause tap zone (full media area) -->
          <button class="card-play-zone" @click.stop="togglePlay(i)" aria-label="Play / Pause" />
        </div>

        <!-- ── Info strip ── -->
        <div class="card-info">
          <div class="card-info-left">
            <span class="card-index">{{ String(i + 1).padStart(2, '0') }} / {{ String(cards.length).padStart(2, '0') }}</span>
          </div>
        </div>

        <!-- Top accent line (active card only) -->
        <div class="card-top-line" :style="getAccentStyle(i, 'line')" />
      </div>
    </div>

    <!-- Progress dots -->
    <div class="progress">
      <div
        v-for="(_, i) in cards"
        :key="i"
        class="progress-dot"
        :class="{ active: i === current }"
        :style="i === current ? { background: accents[i % accents.length].color } : {}"
        @click="jumpTo(i)"
      />
    </div>

    <div class="hint"><span />&nbsp;Glisser · Tapper pour jouer&nbsp;<span /></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'

// ─────────────────────────────────────────────────────────────────────────────
// Props — parent can pass in a custom card list
// ─────────────────────────────────────────────────────────────────────────────
const props = defineProps({
  items: {
    type: Array,
    default: null,
  },
    show : Boolean,
})

const top = () => {
    return props.show ? "top" : "none"
}

// ─────────────────────────────────────────────────────────────────────────────
// Default gallery data  (replace src / poster with your real assets)
// ─────────────────────────────────────────────────────────────────────────────
const defaultCards = [
  {
    tag: 'Short Film',
    title: 'Neon Solitude',
    desc: 'A lone figure walks through rain-slicked streets.',
    meta: '2049',
    duration: '2:34',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=70',
  },
  {
    tag: 'Documentary',
    title: 'Signal Drift',
    desc: 'Lost transmissions from the outer network.',
    meta: '2049',
    duration: '4:12',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    poster: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=70',
  },
  {
    tag: 'Motion',
    title: 'Void Protocol',
    desc: 'Abstract forms emerge from total darkness.',
    meta: '2049',
    duration: '1:58',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    poster: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=70',
  },
  {
    tag: 'Visual Essay',
    title: 'Chrome City',
    desc: 'Architecture as mirror — the city reflects itself.',
    meta: '2049',
    duration: '3:07',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    poster: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=600&q=70',
  },
  {
    tag: 'Experimental',
    title: 'Pulse Engine',
    desc: 'Sound becomes structure. Structure becomes light.',
    meta: '2049',
    duration: '5:20',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
    poster: 'https://images.unsplash.com/photo-1484557052118-f32bd25b45b5?w=600&q=70',
  },
]

const cards = props.items ?? defaultCards

const accents = [
  { color: '#00f0c0' },
  { color: '#c084fc' },
  { color: '#ff3c6e' },
  { color: '#f59e0b' },
  { color: '#38bdf8' },
]

// ─────────────────────────────────────────────────────────────────────────────
// State
// ─────────────────────────────────────────────────────────────────────────────
const current    = ref(0)
const dragDelta  = ref(0)
const dragging   = ref(false)
const eased      = ref(true)
const playing    = ref(-1)   // index of currently playing card (-1 = none)
const muted      = ref(true) // global mute state
const pipVisible = ref(-1)   // play/pause pip flash index

const videoRefs  = ref([])   // array of <video> elements

let startX   = 0
let hasMoved = false

const N         = cards.length
const THRESHOLD = 60
const STACK_Y   = -14
const STACK_Z   = -30
const STACK_S   = 0.04
const STACK_ROT = 1.5

// ─────────────────────────────────────────────────────────────────────────────
// Video control
// ─────────────────────────────────────────────────────────────────────────────
function playVideo(i) {
  const el = videoRefs.value[i]
  if (!el) return
  el.muted = muted.value
  el.play().catch(() => {})
  playing.value = i
}

function pauseAll(except = -1) {
  videoRefs.value.forEach((el, i) => {
    if (el && i !== except) {
      el.pause()
    }
  })
  if (playing.value !== except) playing.value = -1
}

function togglePlay(i) {
  if (getDepth(i) !== 0) return // only front card is interactive
  const el = videoRefs.value[i]
  if (!el) return

  if (playing.value === i && !el.paused) {
    el.pause()
    playing.value = -1
  } else {
    pauseAll(i)
    playVideo(i)
  }

  // Show pip flash
  pipVisible.value = i
  setTimeout(() => { pipVisible.value = -1 }, 700)
}

function toggleMute(i) {
  if (getDepth(i) !== 0) return
  muted.value = !muted.value
  videoRefs.value.forEach(el => { if (el) el.muted = muted.value })
}

// Auto-play the front card when current changes; pause others
watch(current, (newVal) => {
  pauseAll()
  // Small delay so card transition finishes first
  setTimeout(() => playVideo(newVal), 300)
})

// ─────────────────────────────────────────────────────────────────────────────
// Layout helpers
// ─────────────────────────────────────────────────────────────────────────────
function getDepth(i) {
  return ((i - current.value) % N + N) % N
}

function getCardStyle(i) {
  const behind = getDepth(i)
  const transition = eased.value
    ? 'transform .55s cubic-bezier(.4,0,.2,1), box-shadow .3s, opacity .55s'
    : 'none'

  const base = { zIndex: N - behind, transition }

  if (behind === 0) {
    const tx = dragDelta.value * 0.6
    const ry = dragDelta.value * 0.06
    const rz = dragDelta.value * 0.025
    return { ...base, transform: `translateX(${tx}px) rotateY(${ry}deg) rotateZ(${rz}deg)`, opacity: '1', boxShadow: '0 32px 80px rgba(0,0,0,.75)' }
  }

  if (behind <= 3) {
    const dir   = behind % 2 === 0 ? 1 : -1
    const scale = 1 - behind * STACK_S
    const rz    = dir * behind * STACK_ROT
    return {
      ...base,
      transform: `translateY(${behind * STACK_Y}px) translateZ(${behind * STACK_Z}px) scale(${scale}) rotateZ(${rz}deg)`,
      opacity: String(1 - behind * 0.18),
      boxShadow: 'none',
    }
  }

  return {
    ...base,
    transform: `translateY(${3 * STACK_Y}px) translateZ(${3 * STACK_Z}px) scale(${1 - 3 * STACK_S})`,
    opacity: '0',
    boxShadow: 'none',
  }
}

function getAccentStyle(i, type) {
  const color = accents[i % accents.length].color
  const alpha = color + '40'
  switch (type) {
    case 'sep':   return { background: color }
    case 'tag':   return { color, borderColor: alpha }
    case 'arrow': return { color }
    case 'mute':  return { color }
    case 'line':  return {
      background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
      opacity: getDepth(i) === 0 ? '1' : '0',
    }
    default: return {}
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Navigation
// ─────────────────────────────────────────────────────────────────────────────
function advance(dir) {
  current.value = ((current.value + dir) % N + N) % N
  dragDelta.value = 0
  eased.value = true
}

function jumpTo(i) {
  current.value = i
  dragDelta.value = 0
  eased.value = true
}

// ─────────────────────────────────────────────────────────────────────────────
// Drag
// ─────────────────────────────────────────────────────────────────────────────
function onStart(x) {
  startX = x
  hasMoved = false
  dragging.value = true
  eased.value = false
}

function onMove(x) {
  if (!dragging.value) return
  const dx = x - startX
  if (Math.abs(dx) > 4) hasMoved = true
  dragDelta.value = dx
}

function onEnd(x) {
  if (!dragging.value) return
  dragging.value = false
  eased.value = true
  const dx = x - startX
  if (Math.abs(dx) > THRESHOLD) {
    advance(dx < 0 ? 1 : -1)
  } else {
    dragDelta.value = 0
  }
}

function onMouseDown(e) { onStart(e.clientX) }
function onMouseMove(e) { onMove(e.clientX) }
function onMouseUp(e)   { onEnd(e.clientX) }

function onTouchStart(e) { onStart(e.touches[0].clientX) }
function onTouchMove(e)  { onMove(e.touches[0].clientX) }
function onTouchEnd(e)   { onEnd(e.changedTouches[0].clientX) }

function onKeyDown(e) {
  if (['ArrowRight', 'ArrowDown'].includes(e.key)) advance(1)
  if (['ArrowLeft',  'ArrowUp'  ].includes(e.key)) advance(-1)
  if (e.key === ' ') togglePlay(current.value)
}

onMounted(() => {
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup',   onMouseUp)
  window.addEventListener('touchmove', onTouchMove, { passive: true })
  window.addEventListener('touchend',  onTouchEnd)
  window.addEventListener('keydown',   onKeyDown)
  // Auto-play first card
  setTimeout(() => playVideo(0), 400)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup',   onMouseUp)
  window.removeEventListener('touchmove', onTouchMove)
  window.removeEventListener('touchend',  onTouchEnd)
  window.removeEventListener('keydown',   onKeyDown)
  pauseAll()
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@300;400&display=swap');

.carousel-wrapper {
  --bg: #080a0f;
  --card-bg: #0d1017;
  --text: #e8eaf0;
  --muted-c: rgba(232, 234, 240, 0.35);
  --border: rgba(255, 255, 255, 0.07);
  --w: 80vw;
  --h: 72vh;
  --media-h: 90%;

  width: 100%;
  min-height: 100vh;
  background: var(--bg);
  flex-direction: column;
  align-items: center;
    display:flex;
  justify-content: center;
  font-family: 'DM Mono', monospace;
  color: var(--text);
  user-select: none;
  position: absolute;
  overflow: hidden;
    top:0%;
}

.none{
    display:none;
}

#close{
    position:absolute;
    top: 2%; 
    right:3%;
    padding:1em;
    font-size:2em;
    width:5%;
    border: 1px solid white;
    z-index:999;
}

@media screen and (340px < width <= 700px) {
    #close{
        width:auto;
        right:5%;
        padding:1.2em;
        font-size:1.5em;
    }
}
.carousel-wrapper::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px);
  background-size: 48px 48px;
  pointer-events: none;
}

.carousel-wrapper::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 72% 72% at 50% 50%, transparent 38%, var(--bg) 100%);
  pointer-events: none;
}

/* ── Scene ── */
.scene {
  position: relative;
  width: var(--w);
  height: var(--h);
  perspective: 1000px;
  cursor: grab;
  z-index: 2;
}
.scene.dragging { cursor: grabbing; }

/* ── Card ── */
.card-gallery {
  position: absolute;
  inset: 0;
  width: var(--w);
  height: var(--h);
  border-radius: 20px;
  background: var(--card-bg);
  border: 1px solid var(--border);
  overflow: hidden;
  transform-origin: center bottom;
  will-change: transform;
  display: flex;
  flex-direction: column;
}

/* Top accent line */
.card-top-line {
  position: absolute;
  top: 0; left: 28px; right: 28px;
  height: 1px;
  transition: opacity 0.5s;
  pointer-events: none;
  z-index: 10;
}

/* ── Media ── */
.card-media {
  position: relative;
  width: 100%;
  height: var(--media-h);
  flex-shrink: 0;
  background: #000;
  overflow: hidden;
}

.card-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  pointer-events: none;
}

/* Dark gradient at bottom of media so info text reads cleanly */
.card-media-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 55%,
    rgba(8, 10, 15, 0.55) 80%,
    rgba(8, 10, 15, 0.9) 100%
  );
  pointer-events: none;
}

/* Play / pause pip flash */
.card-pip {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 52px; height: 52px;
  border-radius: 50%;
  background: rgba(8,10,15,.65);
  backdrop-filter: blur(6px);
  display: flex; align-items: center; justify-content: center;
  color: #fff;
  pointer-events: none;
  z-index: 8;
}

.card-pip svg { width: 22px; height: 22px; }

.pip-enter-active, .pip-leave-active { transition: opacity .25s, transform .25s; }
.pip-enter-from  { opacity: 0; transform: translate(-50%,-50%) scale(.7); }
.pip-leave-to    { opacity: 0; transform: translate(-50%,-50%) scale(1.15); }

/* Duration badge */
.card-duration {
  position: absolute;
  bottom: 10px; left: 14px;
  font-size: .6rem;
  letter-spacing: .12em;
  color: rgba(255,255,255,.55);
  z-index: 6;
  pointer-events: none;
}

/* Mute button */
.card-mute {
  position: absolute;
  bottom: 6px; right: 10px;
  width: 28px; height: 28px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,.12);
  background: rgba(8,10,15,.5);
  backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  z-index: 7;
  transition: border-color .2s, background .2s;
}
.card-mute:hover { background: rgba(8,10,15,.75); }
.card-mute svg { width: 13px; height: 13px; }

/* Full-media tap zone */
.card-play-zone {
  position: absolute;
  inset: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 5;
}

/* ── Info strip ── */
.card-info {
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 18px 22px 20px;
  gap: 12px;
}

.card-info-left { flex: 1; min-width: 0; }
.card-info-right { display: flex; flex-direction: column; align-items: flex-end; gap: 12px; flex-shrink: 0; }

.card-index {
  display: block;
  font-size: .58rem;
  letter-spacing: .2em;
  color: var(--muted-c);
  margin-bottom: 8px;
}

.card-sep {
  width: 24px; height: 1px;
  border-radius: 1px;
  margin-bottom: 8px;
}

.card-title {
  font-family: 'Syne', sans-serif;
  font-size: 1.1rem;
  font-weight: 800;
  line-height: 1.2;
  color: var(--text);
  margin-bottom: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.card-desc {
  font-size: .65rem;
  line-height: 1.6;
  color: var(--muted-c);
  letter-spacing: .02em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-tag {
  font-size: .58rem;
  letter-spacing: .15em;
  text-transform: uppercase;
  border: 1px solid;
  padding: 3px 9px;
  border-radius: 20px;
  white-space: nowrap;
}

.card-arrow {
  width: 30px; height: 30px;
  border-radius: 50%;
  border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  font-size: .8rem;
}

/* ── Progress ── */
.progress {
  display: flex;
  gap: 6px;
  margin-top: 32px;
  z-index: 10;
}

.progress-dot {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: rgba(255,255,255,.15);
  transition: background .3s, transform .3s;
  cursor: pointer;
}
.progress-dot.active { transform: scale(1.5); }

/* ── Hint ── */
.hint {
  margin-top: 16px;
  font-size: .6rem;
  letter-spacing: .2em;
  color: var(--muted-c);
  text-transform: uppercase;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 8px;
}
.hint span { display: block; width: 24px; height: 1px; background: currentColor; }
</style>
