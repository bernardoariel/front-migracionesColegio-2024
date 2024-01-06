<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import useDeleteEscribano from 'src/modules/escribanos/composables/useDeleteEscribano';

const router = useRouter();
const { deleteEscribano, error } = useDeleteEscribano();

interface ColumnType {
  name: string;
  label: string;
  field: string | ((row: any) => any);
  required?: boolean;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  format?: (val: any) => string;
}

interface Props {
  title: string;
  rows: any[];
  columns: ColumnType[];
  filter: string;
  deleteEntity: (id: number) => void; // Función para eliminar, pasada como prop
}

const props = defineProps<Props>();
const emits = defineEmits(["update:filter", "escribanoDeleted"]);

// Asumiendo que cada fila tiene una propiedad 'nombre' para el filtrado
const filteredRows = computed(() => {
  return props.rows.filter(row => row.nombre.toLowerCase().includes(props.filter.toLowerCase()));
});

const updateFilter = (value: any) => {
  emits('update:filter', value);
};

const handleDelete = async (id: number) => {
  // Confirmación de la acción
  if (confirm(`¿Estás seguro de que deseas eliminar el escribano con ID ${id}?`)) {
    await deleteEscribano(id);
    if (error.value) {
      alert('Hubo un error al eliminar el escribano.');
    } else {
      emits('escribanoDeleted', id);
      // Opcional: actualizar la lista de escribanos en el padre o manejarlo a través de un watcher en el padre
    }
  }
};

// Función para manejar la edición de un escribano
const handleEdit = (id: number) => {
  router.push({ name: 'escribano-edit', params: { id } });
};
</script>

<template>
 <q-table
    :title="props.title"
    :rows="filteredRows"
    :columns="props.columns"
    row-key="name"
    :filter="props.filter"
    :rows-per-page-options="[10, 5, 15, 30, 50, 100]"
    rows-per-page-label="Registros por página"
  >
    <template v-slot:top-right>
      <q-input 
        dense 
        v-model="props.filter"
        @update:modelValue="updateFilter"
        placeholder="Buscar"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    <template v-slot:body-cell-actions="cellProps">
      <q-td :props="cellProps">
        <q-btn flat round icon="edit" @click="handleEdit(cellProps.row.id)" />
        <q-btn flat round icon="delete" @click="handleDelete(cellProps.row.id)" />
      </q-td>
    </template>
  </q-table>
</template>
