<script lang="ts" setup>
 
import { ref } from 'vue';
import TableComponent from 'src/shared/components/table/TableComponent.vue';

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
    name: 'apellido',
    required: true,
    label: 'Apellido',
    align: 'left',
    field: row => row.apellido,
    format: val => `${val}`,
    sortable: true
  },
  { name: 'segundo_apellido', align: 'center', label: 'Segundo Apellido', field: 'segundo_apellido', sortable: true },
  { name: 'nombre', label: 'Nombre', field: 'nombre', sortable: true },
  { name: 'otros_nombres', label: 'Otros Nombre', field: 'otros_nombres' },
  { name: 'numero_de_documento', label: 'DNI', field: 'numero_de_documento' },
  { name: 'fecha_de_nacimiento', label: 'Fecha de Nacimiento', field: 'fecha_de_nacimiento' },
  { name: 'domicilio', label: 'Domicilio', field: 'domicilio',sortable: true },
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
    apellido: 'González',
    segundo_apellido: 'Pérez',
    nombre: 'Juan',
    otros_nombres: 'Carlos',
    numero_de_documento: '40123456',
    fecha_de_nacimiento: '2010-05-21',
    domicilio: 'Calle Falsa 123'
  },
  {
    apellido: 'Rodríguez',
    segundo_apellido: 'López',
    nombre: 'María',
    otros_nombres: 'Josefina',
    numero_de_documento: '40234567',
    fecha_de_nacimiento: '2009-03-15',
    domicilio: 'Avenida Siempre Viva 789'
  },
  {
    apellido: 'Martínez',
    segundo_apellido: 'García',
    nombre: 'Carlos',
    otros_nombres: 'Alberto',
    numero_de_documento: '40345678',
    fecha_de_nacimiento: '2011-07-30',
    domicilio: 'Bulevar de los Sueños Rotos 101'
  },
  {
    apellido: 'López',
    segundo_apellido: 'Torres',
    nombre: 'Ana',
    otros_nombres: 'Beatriz',
    numero_de_documento: '40456789',
    fecha_de_nacimiento: '2008-01-25',
    domicilio: 'Callejón Sin Salida 404'
  },
  {
    apellido: 'Sánchez',
    segundo_apellido: 'Ramírez',
    nombre: 'Esteban',
    otros_nombres: 'Ricardo',
    numero_de_documento: '40567890',
    fecha_de_nacimiento: '2012-11-11',
    domicilio: 'Ruta Perdida 500'
  },
  // Agrega más registros según la misma estructura hasta llegar a 10.
];


</script>

<template>
    
    <TableComponent title="Menores" :rows="rows" :columns="columns" :filter="filter" @update:filter="filter = $event" /> 
</template>
