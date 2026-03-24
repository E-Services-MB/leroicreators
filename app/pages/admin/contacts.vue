<script setup lang="ts">
type Contact = {
  name: string;
  subject: string;
  contact: string;
  message: string;
  createdAt: string;
};

const {
  data: contacts,
  pending: loading,
  error,
  refresh,
} = await useFetch("/api/contacts");

const columns: TableColumn<Contact>[] = [
  {
    accessorKey: "name",
    header: "Noms",
  },
  {
    accessorKey: "contact",
    header: "Contact",
  },
  {
    accessorKey: "subject",
    header: "Sujet",
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
];
</script>
<template>
  <NuxtLayout name="admin">
    <div v-if="loading">Loading...</div>
    <AdminTable v-else :data="contacts" :columns="columns" />
  </NuxtLayout>
</template>
