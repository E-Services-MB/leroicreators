<template>
  <section id="album">
    <div class="album relative justify-center align-center">
      <div class="category relative">
        <div class="box-img absolute">
          <img src="~/assets/img/resef.png" alt="" />
        </div>
        <div class="title absolute">
          <p>Mariages</p>
        </div>
      </div>
      <div class="category relative">
        <div class="box-img absolute">
          <img src="~/assets/img/resef.png" alt="" />
        </div>
        <div class="subtitle absolute">
          <p>Evenements</p>
        </div>
      </div>
      <div class="category relative">
        <div class="box-img absolute">
          <img src="~/assets/img/resef.png" alt="" />
        </div>
        <div class="title absolute">
          <p>Anniversaires</p>
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
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
      height: 18vh;
      img {
        height: 100%;
        border-radius: 0;
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
      bottom: 9.6%;
    }
  }

  .category:nth-child(1) {
    top: -5%;
  }

  .category:nth-child(2) {
    top: 12%;
  }
}
</style>
