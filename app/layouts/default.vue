<script setup>
import styleHome from "~/assets/css/reset.css?url";
useHead({
  link: [{ rel: "stylesheet", href: styleHome }],
});
</script>
<template>
  <div>
    <NavBar />
    <slot />
  </div>
</template>
<style scoped>
@import "@/assets/css/reset.css";
</style>
