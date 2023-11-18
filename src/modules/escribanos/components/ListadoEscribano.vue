<script lang="ts" setup>
import TableComponent from 'src/shared/components/table/TableComponent.vue';
import { onMounted, ref } from 'vue';
import { api } from 'src/boot/axios';

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


const fetchRows = async () => {
  try {
    const response = await api.get('/escribanos'); // Usa la URL correcta de tu backend
    rows.value = response.data.escribanos; // Asume que el backend devuelve un array de objetos
    
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return { success: false, errors: ['No se pudieron obtener los datos'] };
  }
};
onMounted(fetchRows); 

</script>

<template>
    <TableComponent title="Escribanos" :rows="rows" :columns="columns" :filter="filter" @update:filter="filter = $event" />
</template>
