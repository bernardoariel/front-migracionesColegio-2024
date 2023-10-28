<template>
    <q-page padding>
      <q-card>
        <q-card-section>
          <q-form @submit="submitForm">
            <q-input
              v-model="formData.nombre"
              label="Nombre"
              filled
              required
            />
  
            <q-input
              v-model="formData.apellido"
              label="Apellido"
              filled
              required
            />
  
            <q-input
              v-model="formData.email"
              label="Email"
              type="email"
              filled
              required
            />
  
            <q-input
              v-model="formData.telefono"
              label="Teléfono"
              filled
            />
  
            <div class="q-mt-lg">
              <q-btn
                type="submit"
                color="primary"
                label="Registrar"
              />
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-page>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const formData = ref({
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  });
  
  const submitForm = () => {
    console.log('Datos del formulario:', formData.value);
    // Aquí puedes enviar los datos a una API, o procesarlos como necesites
  };
  </script>
  
  <style scoped>
  /* Aquí puedes añadir estilos específicos para este componente */
  </style>
  