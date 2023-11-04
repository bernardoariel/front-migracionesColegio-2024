<script lang="ts" setup>

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

const editItem = (row: any) => {
  console.log('Editar', row);
  // Aquí puedes añadir la lógica para editar el elemento
};

const deleteItem = (row: any) => {
  console.log('Eliminar', row);
  // Aquí puedes añadir la lógica para eliminar el elemento
};
</script>

<template>
  <q-table
    title="Escribanos"
    :rows="props.rows"
    :columns="props.columns"
    row-key="name"
    :filter="props.filter"
    :rows-per-page-options="[5, 10, 15, 30, 50, 100]"
    rows-per-page-label="Registros por página"
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
    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <!-- Botón para editar -->
        <q-btn flat round icon="las la-edit" @click="editItem(props.row)" />
        <!-- Botón para eliminar -->
        <q-btn flat round icon="las la-trash" @click="deleteItem(props.row)" />
      </q-td>
    </template>
    
  </q-table>
</template>
