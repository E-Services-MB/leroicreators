<script setup>
import styleHome from "~/assets/css/base.css?url";
useHead({
  link: [{ rel: "stylesheet", href: styleHome }],
});
</script>

<template>
  <UApp>
    <AdminSidebar>
      <slot />
    </AdminSidebar>
  </UApp>
</template>
<style scoped></style>
