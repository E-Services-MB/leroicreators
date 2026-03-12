<script setup>
const show = ref(false);

const toggle = () => {
  show.value = !show.value;
};

const showUp = () => (show.value ? "show" : "");
const handle = (e) => {
  toggle();
};
</script>
<template :animationend="handle">
  <nav>
    <h1>LRC'S</h1>
    <ul id="visible">
      <li><NuxtLink to="/">Home</NuxtLink></li>
      <li>
        <NuxtLink to="/who">Who We Are?</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/services">Services</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/contact">Contact</NuxtLink>
      </li>
    </ul>
    <NuxtImg id="burger" @click="toggle" src="img/burger-menu.svg" />
  </nav>
  <Transition name="swipe" :duration="1300">
    <div v-if="show" id="burger-nav">
      <nav>
        <ul>
          <li><NuxtLink to="/" @click="toggle">Accueil</NuxtLink></li>
          <li>
            <NuxtLink to="/who" @click="toggle">Votre Equipe</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/services" @click="toggle">Services</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/contact" @click="toggle">Contact</NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </Transition>
</template>
<style scoped>
.swipe-enter-active,
.swipe-leave-active {
  right: 0%;
}

.swipe-enter-from,
.swipe-leave-to {
  right: -120%;
}

#burger {
  display: none;
}

@media screen and (340px < width <= 700px) {
  nav {
    padding: 0 0.5em 0;
  }

  #close {
    position: absolute;
    top: 2%;
    right: 3%;
    padding: 1em;
    font-size: 2em;
    width: 5%;
    border: 1px solid white;
    z-index: 999;
  }

  .visible {
    display: block;
  }

  #visible {
    display: none;
  }

  #burger {
    display: block;
    width: 17%;
  }

  #burger-nav {
    background-color: white;
    width: 100vw;
    padding: 0;
    position: absolute;
    z-index: 999;

    nav {
      width: auto;
      ul {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        align-items: end;
      }
    }
  }
}
</style>
