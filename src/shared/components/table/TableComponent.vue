<script lang="ts" setup>
import { useRouter } from 'vue-router';
import useDeleteEscribano from '../../../modules/escribanos/composables/useDeleteEscribano';


const router = useRouter();
const { deleteEscribano, error } = useDeleteEscribano();

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
  title:string;
  rows: any[];
  columns: ColumnType[];
  filter: string;
}

const props = defineProps<Props>();
const emits = defineEmits(["update:filter","escribanoDeleted"]);

const updateFilter = (value: any) => {
  emits('update:filter', value);
};

const editItem = (row: any) => {
  router.push({ name: 'escribano-edit',   params: { id: row.id } });
  
};

const deleteItem = async (row: any) => {
  // Confirmar antes de eliminar
  if (confirm(`¿Estás seguro de que deseas eliminar el escribano con el ID ${row.id}?`)) {
    await deleteEscribano(row.id);
    if (error.value) {
      // Manejo de errores, por ejemplo, mostrar un mensaje de error
      console.error('Error al eliminar el escribano:', error.value);
    } else {
      // Actualiza la lista de escribanos aquí, si es necesario
      // Por ejemplo, puedes emitir un evento para actualizar la lista en el componente padre
      emits('escribanoDeleted', row.id);
    }
  }
};
</script>

<template>
  <q-table
    :title="props.title"
    :rows="props.rows"
    :columns="props.columns"
    row-key="name"
    :filter="props.filter"
    :rows-per-page-options="[10, 5, 15, 30, 50, 100]"
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
