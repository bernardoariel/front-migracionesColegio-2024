<script lang="ts" setup>
import TableComponent from 'src/shared/components/table/TableComponent.vue';
import { ref } from 'vue';
import useEscribanos from '../composables/useEscribanos';
import Escribano from '@/interfaces/Escribano.interface';

const { isLoading, isError, escribanos, error } = useEscribanos();

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

</script>

<template>
  <div>
    <div v-if="isLoading">Cargando...</div>
   
    <TableComponent
      v-else
      title="Escribanos"
      :rows="escribanos"
      :columns="columns"
      :filter="filter"
      @update:filter="filter = $event"
      @escribanoDeleted="handleEscribanoDeleted"
    />
    <div v-if="isError">Error: {{ error?.message }}</div>
    <!-- Asegúrate de que escribanos.data exista y sea un array antes de pasarlo al componente de tabla -->
  
  </div>
</template>
