<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import { getPaginationRowModel } from "@tanstack/vue-table";

const table = useTemplateRef("table");

type Post = {
  id: string;
  title: string;
  link: string;
  category: string;
  createdAt: number;
};

const pagination = ref({
  pageIndex: 0,
  pageSize: 10,
});

const globalFilter = ref("");

const props = defineProps<{
  data: AnyRow[];
  columns: TableColumn<AnyRow>[];
  open: Function;
  show?: boolean;
}>();
</script>
<template>
  <div class="w-[85vw] h-[80vh] space-y-4 p-4">
    <div
      class="flex justify-between w-full px-4 py-3.5 border-b border-accented"
    >
      <UInput
        v-model="globalFilter"
        class="max-w-sm"
        :ui="{
          base: 'p-4',
        }"
        placeholder="Filtrer..."
      />

      <UButton
        v-if="show"
        class="p-4 w-50 text-center"
        icon="i-lucide-plus"
        @click="open"
      >
        Ajouter
      </UButton>
    </div>

    <UTable
      ref="table"
      v-model:pagination="pagination"
      v-model:global-filter="globalFilter"
      :data="data"
      :columns="columns"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
      class="w-full"
    />

    <div class="flex justify-end border-t border-default pt-4 px-4">
      <UPagination
        :page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
      />
    </div>
  </div>
</template>
