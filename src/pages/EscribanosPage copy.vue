<script lang="ts" setup>
import TableComponent from 'src/shared/components/table/TableComponent.vue';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router'

const route = useRoute()
const activeLink = ref(route.name)
const filter = ref('')
type FormatFunction = (value: any) => string;
type ColumnType = {
  name: string;
  label: string;
  field: string | ((row: any) => any);
  required?: boolean;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  format?: FormatFunction;
};

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

watch(() => route.name, (newVal) => {
  activeLink.value = newVal;
});

</script>

<template>
  <div class="row q-pa-md q-gutter-xl">
    
    <div class="col-12 col-md-2 col-lg-2">
      
      <q-list bordered padding class="rounded-borders text-primary">
        <!-- Enlace a Listado -->
    
        <router-link :to="{ name: 'escribanos-listado' }" class="my-custom-router-link">
          <q-item clickable v-ripple :class="{ 'my-menu-link': activeLink === 'escribanos-listado' }">
            <q-item-section avatar>
              <q-icon name="list" />
            </q-item-section>
            <q-item-section>Listado</q-item-section>
          </q-item>
        </router-link>

        <!-- Enlace a Edición -->
        <router-link :to="{ name: 'escribano-edit', params: { id: 1 } }" class="my-custom-router-link">
          
          <q-item clickable v-ripple :class="{ 'my-menu-link': activeLink === 'escribano-edit' }">

            <q-item-section avatar>
              <q-icon name="edit" class="my-custom-icon" />
            </q-item-section>
            <q-item-section class="my-custom-icon">Edición</q-item-section>
          </q-item>
        </router-link>

        <!-- Enlace a Creación -->
      <router-link :to="{ name: 'escribano-new' }" class="my-custom-router-link">
        <q-item clickable v-ripple :class="{ 'my-menu-link': activeLink === 'escribano-new' }">
        
            <q-item-section avatar>
              <q-icon name="add" />
            </q-item-section>
            <q-item-section>Creación</q-item-section>
          </q-item>
        </router-link>
      </q-list>
    </div>

    <div class="col-12 col-md-9 col-lg-9 q-card q-pa-md">
      <!-- Contenido de la tarjeta -->
      <q-card-section>
        
        <!-- <router-view></router-view> -->      
        <TableComponent :rows="rows" :columns="columns" :filter="filter" @update:filter="filter = $event" />

      </q-card-section>

    </div>
  </div>
</template>

<style scoped>
.my-custom-router-link {
  text-decoration: none;
  color: #2C2C2C; 
  font-weight: 500;
}

.my-menu-link {
  color: #2C2C2C!important;
   background: #F2C037 !important;
}

</style>