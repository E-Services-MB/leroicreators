<script setup>
// Remove lang="ts" and all type imports/interfaces
// No need for NavigationMenuItem or SidebarProps imports

const props = defineProps({
  variant: null, // optional string - equivalent to ?:
  collapsible: null, // optional boolean/string
  side: null, // optional string
});

const open = ref(true);

const items = [
  // Type inferred as array of objects
  {
    label: "Gallery",
    icon: "i-lucide-house",
    to: "/admin",
  },
  {
    label: "Contacts",
    icon: "i-lucide-contact",
    to: "/admin/contacts",
  },
  {
    label: "Utilisateurs",
    icon: "i-lucide-users",
    to: "/admin/users",
  },
];

const logout = async () => {
  const { clear } = useUserSession();
  await clear();
  await navigateTo("/auth");
};
</script>

<template>
  <div
    class="flex flex-1"
    :class="[
      variant === 'inset' && 'bg-neutral-50 dark:bg-neutral-950',
      side === 'right' && 'flex-row-reverse',
    ]"
  >
    <USidebar
      v-model:open="open"
      class="h-dvh border-r-1 border-primary"
      :variant="variant"
      :collapsible="collapsible"
      :side="side"
      :ui="{
        container: '',
      }"
    >
      <template #header>
        <UIcon name="i-lucide-house" class="size-8" />
      </template>

      <UNavigationMenu
        :items="items"
        orientation="vertical"
        class="p-6"
        :ui="{ link: 'p-4 overflow-hidden' }"
      />
      <UButton
        type="button"
        @click="logout"
        icon="i-lucide-log-out"
        class="p-4 m-4"
        >Deconnexion</UButton
      >
    </USidebar>

    <UMain>
      <slot />
    </UMain>
  </div>
</template>
