<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import Escribano from '@/interfaces/Escribano.interface';
import { columns } from '../helpers/escribanoTableConfig';

import useEscribanos from '../composables/useEscribanos';
import useDeleteEscribano from '../composables/useDeleteEscribano';
import TableComponent from 'src/shared/components/table/TableComponent.vue';
import ConfirmDialog from '@/shared/components/modal/ConfirmDialog.vue'

const router = useRouter();
const { isLoading, escribanos, count, isError,error} = useEscribanos();
const { deleteEscribano } = useDeleteEscribano();

const title = `Escribanos (${count.value})`
const confirmDialogVisible = ref(false);
const idToDelete = ref(null);
const promptDeleteEscribano = (id:any) => {
  idToDelete.value = id; // Guarda el ID del escribano que se quiere eliminar
  confirmDialogVisible.value = true; // Muestra tu diálogo de confirmación Vue
};
// Si es necesario, define aquí cualquier función auxiliar relacionada con la acción de editar.
const editEscribano = (row: Escribano) => router.push({ name: 'edit-escribano', params: { id: row.id } });

onMounted(() => {
  // Aquí puedes cargar tus datos o realizar acciones cuando el componente se monta.
});

// Mueve las funciones auxiliares, como el filtrado, a la carpeta 'helpers' si es reutilizable.
const filter = ref('');

const handleConfirmDelete  = () => {
  if (idToDelete.value !== null) {
    deleteEscribano(idToDelete.value); // Llama al composable para eliminar el escribano
    idToDelete.value = null; // Resetea el ID a null
    confirmDialogVisible.value = false; // Cierra el diálogo de confirmación
  }
};
const handleCancelDelete = () => {
  idToDelete.value = null; // Resetea el ID a null
  confirmDialogVisible.value = false; // Cierra el diálogo de confirmación
};
const updateFilter = (value: any) => {
  filter.value = value;
};
const dialogTitle = ref('Confirmación');
const dialogMessage = ref('¿Estás seguro de que quieres hacer esto?');
const dialogIcon = ref('warning');
const dialogShowing = ref(false);
const handleConfirm = () => {
  // Lógica cuando el usuario confirma la acción
  console.log('Acción confirmada.');
};

const handleCancel = () => {
  // Lógica cuando el usuario cancela la acción
  console.log('Acción cancelada.');
};
</script>

<template>

  <div>
    <div v-if="isLoading">Cargando...</div>
    <div v-else-if="isError">{{ error }}</div>
    
    <TableComponent v-else
      :title="title"
      :rows="escribanos"
      :columns="columns"
      :filter="filter"
      :deleteEntity="promptDeleteEscribano"
      @update:filter="updateFilter"
    >
      <template #actions="{ row }">
        <q-btn flat round icon="edit" @click="editEscribano(row)" />
        <q-btn flat round icon="delete" @click="promptDeleteEscribano(row.id)" /> <!-- Cambiado a promptDeleteEscribano para confirmación -->
      </template>
    </TableComponent> 
    
    <ConfirmDialog 
      title="Confirmar eliminación"
      message="¿Estás seguro de que deseas eliminar este escribano?"
      v-model:showing="confirmDialogVisible"
      @confirm="handleConfirmDelete"
      @cancel="handleCancelDelete"
    />
  </div>

</template>
