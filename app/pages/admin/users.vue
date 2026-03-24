<script setup lang="ts">
import * as bcrypt from "bcryptjs";

const UButton = resolveComponent("UButton");
const UBadge = resolveComponent("UBadge");
const UDropdownMenu = resolveComponent("UDropdownMenu");

const toast = useToast();

const {
  data: users,
  pending: loading,
  error,
  refresh,
} = await useFetch("/api/users");

interface FormState {
  id: number;
  name: string;
  email: string;
  password: string;
}

const state = reactive<FormState>({
  id: 0,
  name: "",
  email: "",
  password: "",
});

const saveUser = async () => {
  if (state.password !== "") {
    state.password = bcrypt.hashSync(state.password);
  }
  if (state.id === 0) {
    const { data: users } = await $fetch("/api/users", {
      method: "POST",
      body: { ...state, avatar: "lrcs" },
    });
  } else {
    const { data: users } = await $fetch(`/api/users/${state.id}`, {
      method: "PATCH",
      body: state,
    });
  }
  await refresh();
  state.id = 0;
  state.name = "";
  state.email = "";
  state.password = "";
  opened();
};

const open = ref(false);

const opened = () => {
  open.value = !open.value;
};

type User = {
  id: number;
  name: string;
  email: string;
  createdAt: string;
};

const columns: TableColumn<User>[] = [
  {
    accessorKey: "name",
    header: "Noms",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    meta: {
      class: {
        th: "text-right",
        td: "text-right font-medium",
      },
    },
    header: "Fait le",
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
      label: "Modifier Utilisateur",
      onSelect() {
        state.id = row.original.id;
        state.email = row.original.email;
        state.name = row.original.name;
        opened();
      },
    },
  ];
}
</script>
<template>
  <NuxtLayout name="admin">
    <div v-if="loading">Loading...</div>
    <AdminTable
      v-else
      :data="users"
      :columns="columns"
      :open="opened"
      :show="true"
    />
    <UModal
      v-model:open="open"
      title="Enregistrer un utilisateur"
      :close="{
        color: 'primary',
        variant: 'outline',
        class: 'rounded-full',
      }"
    >
      <template #body>
        <UForm class="space-y-4 w-full" @submit.prevent="saveUser">
          <UFormField label="Noms ou Prenoms" name="name">
            <UInput
              class="w-full"
              :ui="{ base: 'p-4 mt-2' }"
              v-model="state.name"
            />
          </UFormField>

          <UFormField label="email" name="email">
            <UInput
              class="w-full"
              :ui="{ base: 'p-4 mt-2' }"
              v-model="state.email"
            />
          </UFormField>

          <UFormField label="Mot de passe" name="password">
            <UInput
              class="w-full"
              :ui="{ base: 'p-4 mt-2' }"
              v-model="state.password"
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
