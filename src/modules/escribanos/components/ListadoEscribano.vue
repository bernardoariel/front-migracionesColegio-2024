<script lang="ts" setup>
import TableComponent from 'src/shared/components/table/TableComponent.vue';
import { ref } from 'vue';
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
type FormatFunction = (value: any) => string;
const columns:ColumnType[] = [
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: row => row.name,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'register_number', align: 'center', label: 'Nro.Registro', field: 'register_number', sortable: true },
  { name: 'cuil', label: 'Cuil', field: 'cuil', sortable: true },
  { name: 'sexo', label: 'Sexo', field: 'sexo' },
  { name: 'address', label: 'Direccion', field: 'address' },
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

const rows = [
  {
    name: 'Juan Pérez',
    register_number: 'RN123456',
    cuil: '20-12345678-9',
    sexo: 'Masculino',
    address: 'Calle Falsa 123',
    telefono: '+54 9 11 1234-5678',
    email: 'juan.perez@email.com'
  },
  {
    name: 'María Rodríguez',
    register_number: 'RN987654',
    cuil: '27-87654321-9',
    sexo: 'Femenino',
    address: 'Avenida Siempre Viva 789',
    telefono: '+54 9 11 8765-4321',
    email: 'maria.rodriguez@email.com'
  },
  {
    name: 'Carlos López',
    register_number: 'RN555666',
    cuil: '20-55566677-8',
    sexo: 'Masculino',
    address: 'Bulevar de los Sueños Rotos 101',
    telefono: '+54 9 11 5555-6666',
    email: 'carlos.lopez@email.com'
  },
  {
    name: 'Ana García',
    register_number: 'RN444333',
    cuil: '27-44433322-1',
    sexo: 'Femenino',
    address: 'Callejón Sin Salida 404',
    telefono: '+54 9 11 4444-3333',
    email: 'ana.garcia@email.com'
  },
  // ... puedes añadir más datos ficticios si lo necesitas.
];

</script>

<template>
    <TableComponent :rows="rows" :columns="columns" :filter="filter" @update:filter="filter = $event" />
</template>
