<template>
  <q-form @submit="submitForm">
    <div class="row q-col-gutter-md">
      <div v-for="(field, index) in formConfig.fields" :key="index" :class="`col-${12 / formConfig.columns * field.columnSpan}`">
        <component 
          :is="getDynamicComponent(field.type)" 
          v-bind="getFieldProps(field)" 
          @update:modelValue="value => formData[field.model] = value"
        />
      </div>
    </div>
  </q-form>
</template>
<script setup>

import { getComponent } from '../elements/componentFactory';
import { ref } from 'vue';

// ... tu configuración formConfig y otros datos ...
const formConfig = {
  columns: 4,
  fields: [
    {
      model: 'name',
      label: 'Nombre',
      type: 'input',
      filled: true,
      required: true,
      columnSpan: 1,
    },
    {
      model: 'register_number',
      label: 'Nro.Registro',
      type: 'input',
      filled: true,
      required: true,
      columnSpan: 1,
    },
    {
      model: 'cuil',
      label: 'Cuil',
      type: 'input',
      filled: true,
      required: true,
      columnSpan: 1,
    },
    /* {
      model: 'sexo',
      label: 'Sexo',
      type: 'select',
      options: ['Masculino', 'Femenino'],
      filled: true,
      columnSpan: 1,
    }, */
    {
      model: 'address',
      label: 'Direccion',
      type: 'input',
      filled: true,
      columnSpan: 1,
    },
    {
      model: 'telefono',
      label: 'Telefono',
      type: 'input',
      filled: true,
      columnSpan: 1,
    },
    {
      model: 'email',
      label: 'Email',
      type: 'input',
      inputType: 'email',
      filled: true,
      required: true,
      columnSpan: 1,
    },
  ],
};
const formData = ref({});


const getDynamicComponent = (type) => getComponent(type)

const getFieldProps = (field) => {
  switch(field.type) {
    case 'input':
      return {
        modelValue: formData[field.model],
        label: field.label,
        inputType: field.inputType,
        filled: field.filled,
        required: field.required,
        rules: field.rules
      };
    // Puedes agregar otros tipos y sus props aquí
    default:
      return {};
  }
};

const submitForm = () => {
  console.log(formData.value);
};
</script>