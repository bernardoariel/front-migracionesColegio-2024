<script lang="ts" setup>
import TableComponent from 'src/shared/components/table/TableComponent.vue';
import { ref } from 'vue';
import useEscribanos from '../composables/useEscribanos';
import Escribano from '@/interfaces/Escribano.interface';
import useDeleteEscribano from '../composables/useDeleteEscribano';
import { useRouter } from 'vue-router';

const router = useRouter()
const { isLoading, isError, escribanos, error } = useEscribanos();
const { deleteEscribano } = useDeleteEscribano();


const editEscribano = (row: Escribano) => {
  // Lógica para editar un escribano
  // Por ejemplo, navegar a una ruta de edición con el ID del escribano
  router.push({ name: 'edit-escribano', params: { id: row.id } });
};

const handleDeleteEscribano = async (id: number) => {
  // Confirmar antes de eliminar
  if (confirm('¿Estás seguro de que deseas eliminar este escribano?')) {
    await deleteEscribano(id);
    // Asumiendo que tu composable de eliminación maneja la actualización de la lista
    // o maneja aquí la actualización de la lista de escribanos si es necesario
  }
};
type ColumnType = {
  name: string;
  label: string;
  field: string | ((row: any) => any);
  required?: boolean;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  format?: FormatFunction;
};
const filter = ref('')
const rows = ref([]); 
type FormatFunction = (value: any) => string;
const columns:ColumnType[] = [
  {
    name: 'nombre',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: row => `${row.apellido} ${ row.nombre }` ,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'matricula', align: 'center', label: 'Nro.Registro', field: 'matricula', sortable: true },
  { name: 'cuil', label: 'Cuil', field: 'cuil', sortable: true },
  { name: 'sexo', label: 'Sexo', field: 'sexo' },
  { name: 'direccion', label: 'Direccion', field: 'direccion' },
  { name: 'telefono', label: 'Telefono', field: 'telefono' },
  { name: 'email', label: 'Email', field: 'email',sortable: true },
  {
    name: 'actions',
    label: 'Acciones',
    align: 'center',
    field: () => 'actions',  // siempre retorna 'actions' como un placeholder
    sortable: false
  }
]
const handleEscribanoDeleted = (id: number) => {
  // Actualizar la lista local de escribanos eliminando el que coincida con el id
  escribanos.value = escribanos.value.filter(escribano =>(escribano as Escribano).id !== id);
  // Otra lógica como mostrar un mensaje de éxito, etc.
};
const updateFilter = (value: any) => {
  filter.value = value;
  // Aquí puedes implementar la lógica para filtrar los datos localmente o puedes emitir este valor
  // al componente TableComponent para que realice el filtrado internamente
};
</script>

<template>
  <div>
    <div v-if="isLoading">Cargando...</div>
   <!-- En tu componente padre de 'escribanos' -->
    <TableComponent
      :title="'Escribanos'"
      :rows="escribanos"
      :columns="columns"
      :filter="filter"
      :deleteEntity="deleteEscribano"
      @update:filter="updateFilter"
      @entityDeleted="handleEscribanoDeleted"
    >
      <template #actions="{ row }">
        <!-- Aquí pones los botones de editar y eliminar específicos para escribanos -->
        <q-btn flat round icon="edit" @click="editEscribano(row)" />
        <q-btn flat round icon="delete" @click="deleteEscribano(row.id)" />
      </template>
</TableComponent> 

  </div>
</template>
