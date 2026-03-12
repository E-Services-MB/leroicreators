<script setup>
const show = ref(false);
const toggle = () => {
  show.value = !show.value;
};
const handleAnimationStart = (e) => {};
const handleAnimationEnd = (e) => {
  toggle();
};
</script>
<template>
  <section id="album" :animationend="handleAnimationEnd">
    <div class="album relative justify-center align-center">
      <div class="category relative" @click="toggle">
        <div class="box-img absolute">
          <img src="~/assets/img/resef.png" alt="" />
        </div>
        <div class="title absolute">
          <p>Mariages</p>
        </div>
      </div>
      <div class="category relative" @click="toggle">
        <div class="box-img absolute">
          <img src="~/assets/img/resef.png" alt="" />
        </div>
        <div class="subtitle absolute">
          <p>Evenements</p>
        </div>
      </div>
      <div class="category relative" @click="toggle">
        <div class="box-img absolute">
          <img src="~/assets/img/resef.png" alt="" />
        </div>
        <div class="title absolute">
          <p>Photographie</p>
        </div>
      </div>
    </div>
    <Transition name="swipe" :duration="1000">
      <StackedGallery v-if="show" @toggle="toggle" />
    </Transition>
  </section>
</template>
<style scoped>
@keyframes swipeUp {
  0% {
    top: 100%;
  }
  100% {
    top: 0%;
  }
}

@keyframes swipeDown {
  0% {
    top: 0%;
  }
  100% {
    top: 100%;
  }
}

.swipe-enter-active,
.swipe-leave-active {
  top: 0%;
}

.swipe-enter-from,
.swipe-leave-to {
  top: 120%;
}

.album {
  width: 100%;
  height: 75vh;
  display: flex;

  .first {
    background-color: black;
  }

  .page {
    width: 35%;
    height: 100%;
    right: 15%;

    .front,
    .back {
      backface-visibility: hidden;
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .back {
      background-color: black;
      transform: rotateY(180deg);
    }
  }

  .page:hover {
    transform-origin: left;
    transform-style: preserve-3d;
    transform: rotate3d(0, 1, 0, 180deg);
    transition: all 3.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .category {
    width: 30%;

    .box-img {
      height: 68vh;
      img {
        height: 100%;
        border-radius: 0;
        filter: grayscale(100%);
        /* For cross-browser compatibility */
        -webkit-filter: grayscale(100%);
      }
    }

    .box-img:hover {
      cursor: pointer;
      img {
        filter: grayscale(0%);
        /* For cross-browser compatibility */
        -webkit-filter: grayscale(0%);
      }
    }

    .title,
    .subtitle {
      padding: 0.5em;
      right: 10%;
      background-color: black;
      color: white;
      width: 30%;
      height: 10%;
      text-align: center;
      font-size: 1.4em;
    }
    .title {
      top: 0;
      right: 0;
    }
    .subtitle {
      bottom: 6.7%;
    }
  }

  .category:nth-child(1) {
    top: -5%;
  }

  .category:nth-child(2) {
    top: 12%;
  }
}

@media screen and (340px < width <= 700px) {
  .album {
    flex-direction: column;
    height: 100%;

    .category {
      width: 100%;
      height: 15.5em;

      .box-img {
        width: 100%;
        height: 100%;

        img {
          width: 100%;
          object-fit: cover;
        }
      }

      .title,
      .subtitle {
        height: 35%;
      }
      .subtitle {
        left: 0;
        bottom: 0;
      }
    }
    .category:nth-child(1),
    .category:nth-child(2) {
      top: 0;
    }
  }
}
</style>
