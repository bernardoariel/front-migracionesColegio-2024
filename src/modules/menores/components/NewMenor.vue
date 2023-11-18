
<template>
  <TemplateForm :formConfig="formConfig"/>
</template>

<script setup>

import TemplateForm from 'src/shared/components/form/TemplateForm.vue';

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
      rules: [
        function(val) {
          return !!val || `Este campo es requerido`;
        },
        (val) => val.length > 3 || 'Por favor, ingresa como minimo 3 caracteres'
      ]
    },
    {
      model: 'register_number',
      label: 'Nro.Registro',
      type: 'input',
      filled: true,
      required: true,
      columnSpan: 1,
      rules: [
        function(val) {
          return !!val || `Este campo es requerido`;
        },
        (val) => !isNaN(val) || 'Este campo debe ser numérico'
      ]
    },
    {
      model: 'cuil',
      label: 'Cuil',
      type: 'input',
      filled: true,
      required: true,
      columnSpan: 1,
      rules: [
        function(val) {
          return !!val || `Este campo es requerido`;
        },
        (val) => val.length > 10 &&  val.length < 12 || 'Por favor, ingresa un cuit-cuil valido'
      ]
    },
    {
      model: 'sexo',
      label: 'Sexo',
      type: 'select',
      options: ['Masculino', 'Femenino'],
      required: true,
      filled: true,
      columnSpan: 1,
      rules: [
        function(val) {
          return !!val || `Este campo es requerido. Elija una opcion`;
        },
        
      ]
    },
    {
      model: 'direccion',
      label: 'Direccion',
      type: 'input',
      filled: true,
      required: true,
      columnSpan: 1,
      rules: [
        function(val) {
          return !!val || `Este campo es requerido`;
        },
        (val) => val.length > 3 || 'Por favor, ingresa como minimo 3 caracteres'
      ]
    },
    {
      model: 'telefono',
      label: 'Telefono',
      type: 'input',
      filled: true,
      required: true,
      columnSpan: 1,
      rules: [
        function(val) {
          return !!val || `Este campo es requerido`;
        },
        (val) => !isNaN(val) || 'Este campo debe ser numérico'
      ]
    },
    {
      model: 'email',
      label: 'Email',
      type: 'input',
      inputType: 'email',
      filled: true,
      required: true,
      columnSpan: 1,
      rules: [
        function(val) {
          return !!val || `Este campo es requerido`;
        },
        (val, rules) => rules.email(val) || 'Por favor, introduce una dirección de email válida'
      ]
    },
  ],
  buttons: [
   
    {
      label: 'Cancelar',
      type: 'button',
      color: 'negative',
      action: 'cancel'
    },
    {
      label: 'Guardar',
      type: 'submit',
      color: 'primary',
      action: 'submit'
    },
  ]
};

</script>


  
  <style scoped>
  .q-card--dark .q-field.q-input {
    background-color: #333;
    color: #eee;
    border: 1px solid #666;
  }
  
  .q-card--dark .q-field.q-input:hover {
    background-color: #444; 
  }
  
  .q-card--dark .q-field.q-input .q-field__native:focus {
    border-color: #F2C037;
    outline: none;
  }
  
  .q-card--dark .q-field.q-input::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  
  .q-card--dark .q-field.q-input .q-field__label {
    color: #ddd;
  }
  
  .q-card--dark .q-icon {
    color: #fff;
  }
  </style>