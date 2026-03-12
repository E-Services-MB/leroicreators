<script setup>
const cards = useState("cards", () => [
  {
    id: 0,
    name: "Rebecca",
    position: "Droniste",
    bg: "img/teams/rebecca.jpeg",
  },
  {
    id: 1,
    name: "Halvyn",
    position: "Photographe",
    bg: "img/teams/shenzen.jpeg",
  },
  {
    id: 2,
    name: "Rismet",
    position: "Infographe",
    bg: "img/teams/rismet.jpeg",
  },
  { id: 3, name: "Ulrich", position: "Videaste", bg: "img/teams/ulrich.jpeg" },
]);

let init = [];

const indicator = ref(4);
const change = (i) => {
  indicator.value -= 1;
};
const selected = (i) => {
  const direction = indicator.value % 2 == 0 ? "falling-left" : "falling-right";
  return indicator.value == i ? direction : "";
};

const handleAnimationEnd = (e) => {
  const cardEl = e.target;
  const id = parseInt(cardEl.dataset.id, 10);
  if (init.length === 0) {
    init = cards.value;
  }
  cards.value = cards.value.filter((c) => c.id < indicator.value);
};

const refresh = () => {
  indicator.value = 4;
  cards.value = init;
};
</script>

<template>
  <section id="who">
    <div
      class="carousel justify-center items-center"
      @animationend="handleAnimationEnd"
    >
      <div class="card justify-center align-center" id="refresh">
        <div class="card-body">
          <button @click="refresh">recommencer la diapo</button>
        </div>
      </div>
      <div
        v-for="(c, i) of cards"
        :key="i"
        @click="change(i)"
        :data-id="c.id"
        :class="['card', selected(i)]"
      >
        <div class="card-body">
          <div class="box-img">
            <img :src="c.bg" alt="" style="border-radius: 0" />
          </div>
          <h3 class="title">{{ c.name }}</h3>
          <p class="subtitle">{{ c.position }}</p>
        </div>
        <div class="card-side justify-center align-center">
          <h3 class="title">Retouch ? Done</h3>
          <p class="subtitle">
            Passionné par l'art visuel et la création numérique, Rismet est le
            maître du détail au sein de Le Roi Creator'S. Grâce à son expertise
            sur Adobe Photoshop, il transforme des idées brutes en visuels
            percutants, élégants et uniques.
          </p>
          <p class="subtitle">
            Qu'il s'agisse de créer une identité visuelle, des affiches, des
            visuels pour les réseaux sociaux, des covers ou des illustrations
            complexes, Il apporte toujours une touche artistique qui elevate
            chaque projet.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.carousel {
  display: flex;
  width: 100%;
  height: 50vh;
  padding: 5em 0;
  gap: 0.8em;
  position: relative;
}

.card {
  position: absolute;

  .box-img {
    img {
      object-fit: cover;
    }
  }

  .card-body {
    padding: 0;
  }
  .card-side {
    display: none;
  }
  .title {
    font-size: 2.2em;
  }

  .subtitle {
    font-size: 1.8em;
  }
  transition: all 1.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:nth-child(odd) {
  transform: rotateZ(-7deg);
}
.card:nth-child(even) {
  transform: rotateZ(7deg);
}

#refresh {
  height: 650px;
}

@media screen and (340px < width <= 700px) {
  .card {
    width: 75%;
    .box-img {
      height: 20em;
    }
  }
  .card:nth-child(odd) {
    transform: rotateZ(-3deg);
  }
  .card:nth-child(even) {
    transform: rotateZ(3deg);
  }

  #refresh {
    height: 85%;
  }
}
.card:hover {
  transform: rotateZ(0);
  gap: 1em;

  /*.card-side {
    display: flex;
    flex-direction: column;
    padding: 0 1.5em;
    .subtitle {
      text-align: justify;
    }
  }*/
}

#who {
  height: 75vh;
}

.falling-left {
  animation: fallRotateLeft 1.7s;
}
.falling-right {
  animation: fallRotate3D 1.7s;
}
</style>
