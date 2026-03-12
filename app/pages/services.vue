<script setup>
const services = useState("services", () => [
  { id: 0, title: "Drone", price: 450000, bg: "img/drone.png" },
  {
    id: 1,
    title: "Photographie",
    price: 400000,
    bg: "img/photo-removebg.png",
  },
  { id: 2, title: "Videographie", price: 450000, bg: "img/video.png" },
  {
    id: 3,
    title: "Retouche Photo",
    price: 450000,
    bg: "img/image.jpg",
  },
]);

const getImageUrl = (name) => {
  // Use import.meta.url for correct path resolution with Vite
  return new URL(name, import.meta.url).href;
};

const screenWidth = ref(0);

// Only access window on client side
if (process.client) {
  screenWidth.value = window.innerWidth;

  // Add resize listener for reactivity
  window.addEventListener("resize", () => {
    screenWidth.value = window.innerWidth;
  });

  // Cleanup on unmount
  onUnmounted(() => {
    window.removeEventListener("resize", () => {});
  });
}

const isMobile = () => {
  return screenWidth.value < 768 ? 375 : 140;
};

console.log(isMobile);

const currentIndex = ref(0);
const dragOffset = ref(0);
const isDragging = ref(false);
const startX = ref(0);

const slideWidth = 140; // width of each card including gap (px)
const cardWidth = 200;
const gap = 16;

const currentOffset = computed(() => -currentIndex.value * isMobile());
const parallaxOffset = computed(() => -currentIndex.value * 50); // gentle parallax

function goNext() {
  const len = services.value.length;
  currentIndex.value = (currentIndex.value + 1) % len;
}

function goPrev() {
  const len = services.value.length;
  currentIndex.value = (currentIndex.value - 1 + len) % len;
}

function startDrag(e) {
  isDragging.value = true;
  startX.value = e.clientX;
}

function drag(e) {
  if (!isDragging.value) return;
  const deltaX = e.clientX - startX.value;
  dragOffset.value = deltaX;
}

function endDrag(e) {
  if (!isDragging.value) return;

  const deltaX = e.clientX - startX.value;

  if (deltaX < -50) {
    goNext();
  } else if (deltaX > 50) {
    goPrev();
  }

  isDragging.value = false;
  dragOffset.value = 0;
}
</script>
<template>
  <section id="services">
    <div
      class="carousel"
      @mousedown="startDrag"
      @mousemove="drag"
      @mouseup="endDrag"
      @mouseleave="endDrag"
    >
      <div
        v-for="s of services"
        :key="s.id"
        class="card"
        :style="{
          transform: `translateX(${currentOffset + dragOffset}px)`,
        }"
      >
        <div class="card-img">
          <NuxtImg :src="s.bg" />
        </div>
        <div class="card-body">
          <h3>{{ s.title }}</h3>
          <p>{{ s.price }} FCFA</p>
          <button>Ajouter au devis</button>
        </div>
      </div>
    </div>
    <div class="controls">
      <button @click="goPrev">←</button>
      <button @click="goNext">→</button>
    </div>
  </section>
</template>
<style scoped>
.card {
  flex: 0 0 auto;
  .card-img {
    height: 25em;
  }
}
.card:hover {
  box-shadow: 0 3em 7em #efefef;
}

.carousel {
  display: flex;
  gap: 1em;
  position: relative;
  overflow-x: visible;
  width: 100%;
  height: 77vh;
  contain: layout style paint;
  cursor: grab;
  white-space: nowrap;
}

.slide {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fg {
  position: relative;
  z-index: 1;
  color: white;
  padding: 2rem;
}

@media screen and (340px < width <= 700px) {
  .carousel {
    height: 75vh;
  }

  .card {
    width: 21em;
    .card-img {
      height: 20em;
    }
    gap: 1em;
  }
}
</style>
