<script lang="ts" setup>

import TemplateForm from 'src/shared/components/form/TemplateForm.vue';
import { formConfig } from '../helpers/fieldsFormConfig';


</script>
<template>
  <TemplateForm :formConfig="formConfig" />
</template>




  
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