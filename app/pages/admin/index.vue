<script setup lang="ts">
const open = ref(false);

const opened = () => {
  open.value = !open.value;
};

type Post = {
  id: string;
  title: string;
  link: string;
  category: string;
  createdAt: number;
};

const {
  data: posts,
  pending: loading,
  error,
  refresh,
} = await useFetch("/api/posts");

const columns: TableColumn<Post>[] = [
  {
    accessorKey: "id",
    header: "#",
    cell: ({ row }) => `#${row.getValue("id")}`,
  },
  {
    accessorKey: "title",
    header: "Titre",
  },
  {
    accessorKey: "link",
    header: "Lien",
  },
  {
    accessorKey: "category",
    header: "Categorie",
  },
  {
    accessorKey: "createdAt",
    meta: {
      class: {
        th: "text-right",
        td: "text-right font-medium",
      },
    },
    header: "Envoye le",
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt") as string).toLocaleString(
        "en-US",
        {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        },
      );
    },
  },
  {
    id: "actions",
    meta: {
      class: {
        td: "text-right",
      },
    },
    cell: ({ row }) => {
      return h(
        UDropdownMenu,
        {
          content: {
            align: "end",
          },
          items: getRowItems(row),
          "aria-label": "Actions dropdown",
        },
        () =>
          h(UButton, {
            icon: "i-lucide-ellipsis-vertical",
            color: "neutral",
            variant: "ghost",
            "aria-label": "Actions dropdown",
          }),
      );
    },
  },
];

function getRowItems(row: Row<User>) {
  return [
    {
      type: "label",
      label: "Actions",
    },
    {
      label: "Modifier Diapo",
      onSelect() {
        id = row.original.id;
        state.title = row.original.title;
        state.link = row.original.link;
        state.category = row.original.category;
        opened();
      },
    },
  ];
}

const items = ref(["Wedding", "Events", "Photo"]);

interface FormState {
  title: string;
  link: string;
  category: string;
}

const state = reactive<FormState>({
  title: "",
  link: "",
  category: "Event",
});

let id = 0;

const saveDiapo = async () => {
  if (id === 0) {
    const { data: posts } = await $fetch("/api/posts", {
      method: "POST",
      body: state,
    });
  } else {
    const { data: posts } = await $fetch(`/api/posts/${id}`, {
      method: "PATCH",
      body: state,
    });
  }
  await refresh();
  state.title = "";
  state.link = "";
  state.category = "Event";
  opened();
};
</script>
<template>
  <NuxtLayout name="admin">
    <div v-if="loading">Loading...</div>
    <AdminTable
      v-else
      :data="posts"
      :columns="columns"
      :show="true"
      :open="opened"
    />
    <UModal
      title="Enregistrer un post"
      v-model:open="open"
      :close="{
        color: 'primary',
        variant: 'outline',
        class: 'rounded-full',
      }"
    >
      <template #body>
        <UForm class="space-y-4 w-full" @submit.prevent="saveDiapo">
          <UFormField label="Titre" name="title">
            <UInput
              class="w-full"
              :ui="{ base: 'p-4 mt-2' }"
              v-model="state.title"
            />
          </UFormField>

          <UFormField label="Lien video ou image" name="link">
            <UInput
              class="w-full"
              :ui="{ base: 'p-4 mt-2' }"
              v-model="state.link"
            />
          </UFormField>
          <UFormField label="Categorie" name="category">
            <USelectMenu
              class="w-full p-6 mt-2"
              v-model="state.category"
              :items="items"
            />
          </UFormField>

          <UButton class="w-full p-6 mt-4 text-center" type="submit">
            Enregistrer
          </UButton>
        </UForm>
      </template>
    </UModal>
  </NuxtLayout>
</template>
<style scoped>
@import "~/assets/css/base.css";
</style>
