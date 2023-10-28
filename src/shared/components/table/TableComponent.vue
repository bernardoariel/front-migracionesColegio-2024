<script lang="ts" setup>
import { ref, defineProps, defineEmits } from 'vue';

interface ColumnType {
  name: string;
  label: string;
  field: string | ((row: any) => any);
  required?: boolean;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  // ... otras propiedades que puedas necesitar
}

interface Props {
  rows: any[];
  columns: ColumnType[];
  filter: string;
}

const props = defineProps<Props>();
const emits = defineEmits(["update:filter"]);

const updateFilter = (value: any) => {
  emits('update:filter', value);
};
</script>

<template>
  <q-table
    title="Escribanos"
    :rows="props.rows"
    :columns="props.columns"
    row-key="name"
    :filter="props.filter"
  >
    <template v-slot:top-right>
      <q-input 
    dense 
    debounce="300" 
    :modelValue="props.filter" 
    @update:modelValue="updateFilter" 
    placeholder="Buscar"
>
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
  </q-table>
</template>
